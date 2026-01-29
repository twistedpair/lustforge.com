---
draft: false
title: "Claude Code Custom Spinner Verbs"
author: Joe Lust
layout: post
date: 2026-01-28
url: /2026/01/28/claude-code-custom-spinner-verbs/
summary: "Claude Code now lets you customize the spinner verbs shown while the agent works. Here's how to configure them."
image: /img/bacon_spot.png
tags:
  - claude-code
  - cli
  - claude.ai
---

Who doesn't love burnishing their diction with Claude Code gems like `bloviating...` and `cogitating...`? But what if you could use even more esoteric (or explicit 🤫) gerundives as you wait for Claude to burn your cash? Your boredom is over!

On 28 Jan 2026, Claude Code [v2.1.23](https://github.com/anthropics/claude-code/releases/tag/v2.1.23) introduced the ability to customize the spinner verbs displayed while the agent is working. While this feature remains undocumented, we figured it out through trial and error (and just asking Claude to guess).

## Configuration
Add the `spinnerVerbs` configuration to your `~/.claude/settings.json`:

```json
{
  "spinnerVerbs": {
    "mode": "replace|append",
    "verbs": []
  }
}
```

### Schema Fields

| Field | Type | Description |
|-------|------|-------------|
| `mode` | `"replace"` or `"append"` | Whether to replace the default verbs entirely or add to them |
| `verbs` | `string[]` | Array of verb strings to use (without the trailing "...") |

## Examples

### Replace Mode

Replace the default spinner verbs entirely with your own set:

```json
{
  "spinnerVerbs": {
    "mode": "replace",
    "verbs": [
      "WTFing",
      "Hallucinating",
      "Cursing",
      "Bankrupting"
    ]
  }
}
```

With this configuration, Claude Code will only cycle through your custom verbs, showing messages like "WTFing...", "Cursing...", etc.

### Append Mode

Keep the defaults and add your own verbs to the rotation:

```json
{
  "spinnerVerbs": {
    "mode": "append",
    "verbs": [
      "Obviating",
      "Tokenburning",
      "Reverting"
    ]
  }
}
```

This preserves the built-in verbs while mixing in your additions. Useful if you like the defaults but want to sprinkle in some team inside jokes or domain-specific terminology.

Now go make up some verbs... or just have Claude Code do it for you 😁.
