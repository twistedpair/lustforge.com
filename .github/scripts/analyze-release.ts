import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const MAX_DIFF_SIZE = 100_000;

// XSS prevention utilities
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidFilePath(path: string): boolean {
  // Only allow alphanumeric, underscores, hyphens, dots, slashes, and colons (for line numbers)
  // Reject path traversal attempts and suspicious patterns
  if (!path || path.length > 500) return false;
  if (path.length < 5) return false; // Too short to be a real path
  if (path.includes("..")) return false;
  if (/[<>"'`|;&$(){}[\]\\]/.test(path)) return false;
  if (path.toLowerCase().startsWith("javascript:")) return false;
  if (path.toLowerCase().startsWith("data:")) return false;
  // Reject placeholder values
  if (/^n\/?a$/i.test(path)) return false;
  if (/^(none|null|undefined|unknown)$/i.test(path)) return false;
  return /^[\w\-./:#]+$/.test(path);
}

function sanitizeFilePath(path: string | undefined): string | null {
  if (!path) return null;
  const trimmed = path.trim();
  return isValidFilePath(trimmed) ? trimmed : null;
}

interface Args {
  version: string;
  outputDir: string;
  repoPath: string;
}

function parseArgs(): Args {
  const args = process.argv.slice(2);
  let version = process.env.GITHUB_REF_NAME || "";
  let outputDir = process.env.OUTPUT_DIR || "content/gcloud";
  let repoPath = ".";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--repo" && args[i + 1]) {
      repoPath = args[++i];
    } else if (args[i] === "--output" && args[i + 1]) {
      outputDir = args[++i];
    } else if (!args[i].startsWith("-")) {
      version = args[i];
    }
  }

  return { version, outputDir, repoPath: resolve(repoPath) };
}

const PRIORITY_PATHS = [
  "google-cloud-sdk/lib/googlecloudsdk/command_lib/",
  "google-cloud-sdk/lib/googlecloudsdk/api_lib/",
  "google-cloud-sdk/lib/googlecloudsdk/core/",
  "google-cloud-sdk/lib/googlecloudsdk/calliope/",
];

const AnalysisSchema = z.object({
  breakingChanges: z.array(
    z.object({
      description: z.string(),
      filePath: z.string().nullish(),
    })
  ),
  securityUpdates: z.array(
    z.object({
      description: z.string(),
      filePath: z.string().nullish(),
      severity: z.enum(["low", "medium", "high"]).nullish(),
    })
  ),
  newFeatures: z.array(
    z.object({
      service: z.string(),
      description: z.string(),
      flags: z.array(z.string()).nullish(),
      filePath: z.string().nullish(),
    })
  ),
  credentialChanges: z.array(
    z.object({
      description: z.string(),
      filePath: z.string().nullish(),
    })
  ),
  apiChanges: z.array(
    z.object({
      service: z.string(),
      description: z.string(),
      filePath: z.string().nullish(),
    })
  ),
  unannouncedChanges: z.array(
    z.object({
      description: z.string(),
      category: z.string().nullish(),
      filePath: z.string().nullish(),
    })
  ),
  summary: z.string(),
});

type Analysis = z.infer<typeof AnalysisSchema>;

function git(repoPath: string, command: string): string {
  return execSync(`git -C "${repoPath}" ${command}`, {
    encoding: "utf-8",
    maxBuffer: 50 * 1024 * 1024,
  });
}

function getPreviousTag(repoPath: string, currentTag: string): string | null {
  const tags = git(repoPath, "tag --sort=-version:refname")
    .trim()
    .split("\n")
    .filter((t) => /^\d+\.\d+\.\d+/.test(t));

  const currentIndex = tags.indexOf(currentTag);
  if (currentIndex === -1 || currentIndex === tags.length - 1) {
    return null;
  }

  return tags[currentIndex + 1];
}

function getTagDiff(repoPath: string, previousTag: string, currentTag: string): string {
  const fullDiff = git(repoPath, `diff ${previousTag}..${currentTag}`);

  if (fullDiff.length <= MAX_DIFF_SIZE) {
    return fullDiff;
  }

  console.error(
    `Diff too large (${fullDiff.length} bytes), prioritizing important paths...`
  );

  // Get priority paths first
  let priorityDiff = "";
  for (const path of PRIORITY_PATHS) {
    const pathDiff = git(
      repoPath,
      `diff ${previousTag}..${currentTag} -- "${path}"`
    );
    if (priorityDiff.length + pathDiff.length < MAX_DIFF_SIZE) {
      priorityDiff += pathDiff;
    }
  }

  console.error(`Diff size: ${priorityDiff.length} bytes`);
  return priorityDiff;
}

interface ReleaseNotesResult {
  content: string;
  date: string;
}

function extractReleaseNotes(repoPath: string, version: string): ReleaseNotesResult {
  const releaseNotesPath = join(repoPath, "google-cloud-sdk/RELEASE_NOTES");

  try {
    const content = readFileSync(releaseNotesPath, "utf-8");
    const versionPattern = new RegExp(
      `## ${version.replace(/\./g, "\\.")} \\((\\d{4}-\\d{2}-\\d{2})\\)([\\s\\S]*?)(?=## \\d+\\.\\d+\\.\\d+|$)`
    );

    const match = content.match(versionPattern);
    if (match) {
      return {
        content: match[0].trim(),
        date: match[1],
      };
    }
  } catch {
    console.error(`Could not read release notes from ${releaseNotesPath}`);
  }

  return { content: "", date: new Date().toISOString().split("T")[0] };
}

function getDiffStats(
  repoPath: string,
  previousTag: string,
  currentTag: string
): { filesChanged: number; insertions: number; deletions: number } {
  const statLine = git(
    repoPath,
    `diff ${previousTag}..${currentTag} --shortstat`
  ).trim();

  const filesMatch = statLine.match(/(\d+) files? changed/);
  const insertionsMatch = statLine.match(/(\d+) insertions?/);
  const deletionsMatch = statLine.match(/(\d+) deletions?/);

  return {
    filesChanged: filesMatch ? parseInt(filesMatch[1], 10) : 0,
    insertions: insertionsMatch ? parseInt(insertionsMatch[1], 10) : 0,
    deletions: deletionsMatch ? parseInt(deletionsMatch[1], 10) : 0,
  };
}

async function analyzeWithGemini(
  diff: string,
  releaseNotes: string,
  version: string
): Promise<Analysis> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is required");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `You are analyzing changes in Google Cloud SDK version ${version}.

## Official Release Notes
${releaseNotes || "No official release notes available."}

## Git Diff
${diff}

Analyze these changes and provide a structured JSON response with the following schema:

{
  "breakingChanges": [{ "description": "...", "filePath": "..." }],
  "securityUpdates": [{ "description": "...", "filePath": "...", "severity": "low|medium|high" }],
  "newFeatures": [{ "service": "...", "description": "...", "flags": ["--flag-name"], "filePath": "..." }],
  "credentialChanges": [{ "description": "...", "filePath": "..." }],
  "apiChanges": [{ "service": "...", "description": "...", "filePath": "..." }],
  "unannouncedChanges": [{ "description": "...", "category": "feature_flag|groundwork|refactoring|hidden_feature", "filePath": "..." }],
  "summary": "A 2-3 sentence high-level summary of the most important changes"
}

Guidelines:
- For filePath, use the format: lib/googlecloudsdk/path/to/file.py:lineNumber
- Group new features by GCP service (e.g., "Kubernetes Engine", "Cloud Run", "Cloud Storage")
- Identify any security-relevant changes (path traversal fixes, auth changes, etc.)
- Note any removed functionality or deprecated features as breaking changes
- For credential/auth changes, focus on changes to authentication flow or credential handling
- Be concise but specific
- IMPORTANT: In descriptions, always use backticks (\`) around flags (e.g., \`--flag-name\`), filenames, function names, and other code elements for consistent formatting

CRITICAL - unannouncedChanges section:
You MUST carefully compare the git diff against the official release notes and identify ALL changes in the code that are NOT mentioned in the release notes. This is the most important part of the analysis. Look for:
- feature_flag: Flags with hidden=True, feature gates, or experimental markers
- groundwork: New API clients, message types, resource definitions not exposed yet
- refactoring: Internal restructuring, module reorganization, deprecation prep
- hidden_feature: New functionality (flags, commands, options) not in release notes

Scan the diff thoroughly for AddArgument calls with hidden=True, new *_client.py files, new command groups, and infrastructure changes. There are almost always unannounced changes in every release.

Respond with ONLY valid JSON, no markdown code blocks.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const responseText = response.text;
  if (!responseText) {
    throw new Error("No response text from Gemini");
  }

  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to parse JSON from Gemini response");
  }

  const parsed = JSON.parse(jsonMatch[0]);
  return AnalysisSchema.parse(parsed);
}

interface HugoPost {
  filename: string;
  content: string;
}

const GITHUB_REPO = "twistedpair/google-cloud-sdk";

function normalizeSdkPath(path: string): string {
  // Normalize various path formats Gemini might return to the correct repo structure:
  // google-cloud-sdk/lib/googlecloudsdk/...

  // Already fully correct
  if (path.startsWith("google-cloud-sdk/lib/")) {
    return path;
  }

  // Has google-cloud-sdk/ but missing lib/ (e.g., google-cloud-sdk/googlecloudsdk/...)
  if (path.startsWith("google-cloud-sdk/googlecloudsdk/")) {
    return path.replace("google-cloud-sdk/googlecloudsdk/", "google-cloud-sdk/lib/googlecloudsdk/");
  }

  // Has google-cloud-sdk/ prefix but path continues differently
  if (path.startsWith("google-cloud-sdk/")) {
    return path;
  }

  // Starts with lib/ - just prepend google-cloud-sdk/
  if (path.startsWith("lib/")) {
    return `google-cloud-sdk/${path}`;
  }

  // Starts with googlecloudsdk/ - prepend google-cloud-sdk/lib/
  if (path.startsWith("googlecloudsdk/")) {
    return `google-cloud-sdk/lib/${path}`;
  }

  // Starts with generated_clients/ - prepend full path
  if (path.startsWith("generated_clients/")) {
    return `google-cloud-sdk/lib/googlecloudsdk/${path}`;
  }

  // Default: assume it's under lib/ and prepend
  return `google-cloud-sdk/${path}`;
}

function formatFileLink(filePath: string, version: string): string | null {
  // Validate file path to prevent XSS
  const sanitized = sanitizeFilePath(filePath);
  if (!sanitized) return null;

  // Parse path and optional line number (e.g., "lib/foo/bar.py:123")
  const match = sanitized.match(/^(.+?)(?::(\d+))?$/);
  if (!match) return null;

  const [, path, lineNum] = match;

  const normalizedPath = normalizeSdkPath(path);
  const lineAnchor = lineNum ? `#L${lineNum}` : "";
  const url = `https://github.com/${GITHUB_REPO}/blob/${version}/${normalizedPath}${lineAnchor}`;

  // Display just the filename and line for brevity
  const displayName = escapeHtml(path.split("/").pop() + (lineNum ? `:${lineNum}` : ""));

  return `[${displayName}](${url})`;
}

function formatHugoPost(
  analysis: Analysis,
  version: string,
  releaseDate: string,
  stats: { filesChanged: number; insertions: number; deletions: number },
  previousTag: string | null
): HugoPost {
  const slug = `gcloud-sdk-${version.replace(/\./g, "-")}-release-analysis`;
  const filename = `${releaseDate}-${slug}.md`;

  // Sanitize service names for tags (only allow alphanumeric and hyphens)
  const services = [...new Set(analysis.newFeatures.map((f) => f.service))];
  const sanitizeTag = (s: string) => s.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");
  const tags = [
    "gcloud",
    "google-cloud-platform",
    "release-analysis",
    "gcp",
    ...services.map(sanitizeTag).filter((t) => t.length > 0),
  ];

  // Escape summary for front matter (YAML) and HTML
  const safeSummary = escapeHtml(analysis.summary).replace(/"/g, '\\"');

  const frontMatter = `---
draft: false
title: "gcloud SDK ${version} Release Analysis"
author: Joe Lust
layout: post
date: ${releaseDate}
url: /gcloud/${slug}/
summary: "${safeSummary}"
tags:
${tags.map((t) => `  - ${t}`).join("\n")}
---`;

  const sections: string[] = [frontMatter, ""];

  // Make version bold in summary
  const summaryWithBoldVersion = escapeHtml(analysis.summary).replace(
    new RegExp(version.replace(/\./g, "\\."), "g"),
    `**${version}**`
  );
  sections.push(`${summaryWithBoldVersion}\n`);

  sections.push(`**Release date:** ${releaseDate}\n`);

  const jumpLinks = ["[Annotated Release Notes](#breaking-changes)"];
  if (analysis.unannouncedChanges.length > 0) {
    jumpLinks.push("[Unannounced Changes 🕵️](#unannounced-changes)");
  }
  jumpLinks.push("[Stats 📊](#stats)");
  sections.push(`**Jump to:** ${jumpLinks.join(" | ")}\n`);

  sections.push("<!--more-->\n");

  if (analysis.breakingChanges.length > 0) {
    sections.push("## Breaking Changes\n");
    for (const change of analysis.breakingChanges) {
      sections.push(`- ${escapeHtml(change.description)}`);
      const fileLink = formatFileLink(change.filePath || "", version);
      if (fileLink) {
        sections.push(`  - File: ${fileLink}`);
      }
    }
    sections.push("");
  }

  if (analysis.securityUpdates.length > 0) {
    sections.push("## Security Updates\n");
    for (const update of analysis.securityUpdates) {
      const severity = update.severity ? ` [${escapeHtml(update.severity.toUpperCase())}]` : "";
      sections.push(`- ${escapeHtml(update.description)}${severity}`);
      const fileLink = formatFileLink(update.filePath || "", version);
      if (fileLink) {
        sections.push(`  - File: ${fileLink}`);
      }
    }
    sections.push("");
  }

  if (analysis.newFeatures.length > 0) {
    sections.push("## New Features by Service\n");

    const byService = new Map<string, typeof analysis.newFeatures>();
    for (const feature of analysis.newFeatures) {
      const existing = byService.get(feature.service) || [];
      existing.push(feature);
      byService.set(feature.service, existing);
    }

    for (const [service, features] of byService) {
      sections.push(`### ${escapeHtml(service)}\n`);
      for (const feature of features) {
        sections.push(`- ${escapeHtml(feature.description)}`);
        if (feature.flags && feature.flags.length > 0) {
          sections.push(`  - Flags: \`${feature.flags.map(escapeHtml).join("`, `")}\``);
        }
        const fileLink = formatFileLink(feature.filePath || "", version);
        if (fileLink) {
          sections.push(`  - File: ${fileLink}`);
        }
      }
      sections.push("");
    }
  }

  if (analysis.credentialChanges.length > 0) {
    sections.push("## Credential & Auth Changes\n");
    for (const change of analysis.credentialChanges) {
      sections.push(`- ${escapeHtml(change.description)}`);
      const fileLink = formatFileLink(change.filePath || "", version);
      if (fileLink) {
        sections.push(`  - File: ${fileLink}`);
      }
    }
    sections.push("");
  }

  if (analysis.apiChanges.length > 0) {
    sections.push("## API Changes\n");

    const byService = new Map<string, typeof analysis.apiChanges>();
    for (const change of analysis.apiChanges) {
      const existing = byService.get(change.service) || [];
      existing.push(change);
      byService.set(change.service, existing);
    }

    for (const [service, changes] of byService) {
      sections.push(`### ${escapeHtml(service)}\n`);
      for (const change of changes) {
        sections.push(`- ${escapeHtml(change.description)}`);
        const fileLink = formatFileLink(change.filePath || "", version);
        if (fileLink) {
          sections.push(`  - File: ${fileLink}`);
        }
      }
      sections.push("");
    }
  }

  if (analysis.unannouncedChanges.length > 0) {
    sections.push("## Unannounced Changes\n");
    sections.push("*Changes found in code but not mentioned in official release notes:* 🕵️\n");

    const categoryLabels: Record<string, string> = {
      feature_flag: "Feature Flag",
      groundwork: "Groundwork",
      refactoring: "Refactoring",
      hidden_feature: "Hidden Feature",
    };

    const byCategory = new Map<string, typeof analysis.unannouncedChanges>();
    for (const change of analysis.unannouncedChanges) {
      const cat = change.category || "other";
      const existing = byCategory.get(cat) || [];
      existing.push(change);
      byCategory.set(cat, existing);
    }

    for (const [category, changes] of byCategory) {
      const label = categoryLabels[category] || "Other";
      sections.push(`### ${escapeHtml(label)}\n`);
      for (const change of changes) {
        sections.push(`- ${escapeHtml(change.description)}`);
        const fileLink = formatFileLink(change.filePath || "", version);
        if (fileLink) {
          sections.push(`  - File: ${fileLink}`);
        }
      }
      sections.push("");
    }
  }

  sections.push("## Stats\n");
  sections.push(`- Files changed: {{< color "#fff" "#b45309" >}}${stats.filesChanged.toLocaleString()}{{< /color >}}`);
  sections.push(`- Inserted lines: {{< color "#fff" "#166534" >}}+${stats.insertions.toLocaleString()}{{< /color >}}`);
  sections.push(`- Deleted lines: {{< color "#fff" "#991b1b" >}}-${stats.deletions.toLocaleString()}{{< /color >}}`);
  sections.push("");

  sections.push("---");
  sections.push("*Generated by [Gemini](https://ai.google.dev/)*");
  if (previousTag) {
    sections.push(
      `*- [View full diff](https://github.com/twistedpair/google-cloud-sdk/compare/${previousTag}...${version})*`
    );
  }
  sections.push("");
  sections.push("*Google, Google Cloud, and gcloud are trademarks of Google LLC. This analysis was automatically generated by an AI agent examining only public release artifacts, without access to internal or non-public information from Google Cloud.*");

  return {
    filename,
    content: sections.join("\n"),
  };
}

async function main(): Promise<void> {
  console.time("Total runtime");
  const { version, outputDir, repoPath } = parseArgs();

  if (!version) {
    console.error("Usage: tsx analyze-release.ts <version> [--repo <path>] [--output <dir>]");
    console.error("Or set GITHUB_REF_NAME and OUTPUT_DIR environment variables");
    process.exit(1);
  }

  console.error(`Analyzing release ${version}...`);
  console.error(`Repo path: ${repoPath}`);

  const previousTag = getPreviousTag(repoPath, version);
  if (!previousTag) {
    console.error(`No previous tag found for ${version}, skipping analysis`);
    process.exit(0);
  }

  console.error(`Comparing ${previousTag} -> ${version}`);

  const diff = getTagDiff(repoPath, previousTag, version);
  const releaseNotes = extractReleaseNotes(repoPath, version);
  const stats = getDiffStats(repoPath, previousTag, version);

  console.error(`Diff size: ${diff.length} bytes`);
  console.error(`Release notes: ${releaseNotes.content.length} bytes`);
  console.error(`Release date: ${releaseNotes.date}`);
  console.error(
    `Stats: ${stats.filesChanged} files, +${stats.insertions}/-${stats.deletions}`
  );

  const analysis = await analyzeWithGemini(diff, releaseNotes.content, version);
  const hugoPost = formatHugoPost(analysis, version, releaseNotes.date, stats, previousTag);

  const outputPath = join(outputDir, hugoPost.filename);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, hugoPost.content);

  console.log(outputPath);
  console.timeEnd("Total runtime");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
