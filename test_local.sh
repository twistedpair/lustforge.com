#!/usr/bin/env bash
# SCRIPT FOR TESTING RELEASE ANALYSIS LOCALLY
set -euo pipefail

# Source credentials
if [[ -f ~/.env ]]; then
  set -a
  source ~/.env
  set +a
else
  echo "Error: ~/.env not found. Please create it with GEMINI_API_KEY=your-key"
  exit 1
fi

if [[ -z "${GEMINI_API_KEY:-}" ]]; then
  echo "Error: GEMINI_API_KEY not set in ~/.env"
  exit 1
fi

export GEMINI_API_KEY

VERSION="${1:-551.0.0}"
REPO_PATH="${2:-$HOME/src/google-cloud-sdk}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Analyzing gcloud SDK version: $VERSION"
echo "Repo path: $REPO_PATH"
echo "Output dir: $SCRIPT_DIR/content/gcloud"

cd "$SCRIPT_DIR/.github/scripts"
pnpm tsx analyze-release.ts "$VERSION" \
  --repo "$REPO_PATH" \
  --output "$SCRIPT_DIR/content/gcloud"
