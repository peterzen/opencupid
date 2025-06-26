#!/bin/bash
set -euo pipefail

if [ -z "${CONFIG_REPO:-}" ]; then
  echo "❌ CONFIG_REPO is not set. Please export CONFIG_REPO=git@github.com:... before running."
  exit 1
fi

WORKDIR="$(pwd)"
TMPDIR=".config-cache"

echo "→ Fetching config from $CONFIG_REPO into $WORKDIR"

mkdir -p "$TMPDIR"
git clone --depth 1 --bare "$CONFIG_REPO" "$TMPDIR/config.git"

git --git-dir="$TMPDIR/config.git" --work-tree="$WORKDIR" checkout -f

rm -rf "$TMPDIR"
echo "✅ Config applied to project root."
