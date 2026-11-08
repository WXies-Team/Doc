#!/usr/bin/env bash
# Manifest-managed deploy: push only the files this run deploys, and delete
# only files that an earlier run deployed and this one no longer includes.
# Server-side data that never entered the manifest (uploads, panels, certs,
# runtime state) is never touched. The manifest lives in the remote user's
# home, never inside the web root, so no VCS metadata reaches production.
#
# Usage:
#   ci/deploy-managed.sh <source-dir> <exclude-file> [extra rsync flags...]
#
# Required env:
#   DEPLOY_HOST        user@host
#   DEPLOY_DEST        absolute remote web root
#   DEPLOY_SSH_KEY     private key path
# Optional env:
#   DEPLOY_TRACKED=1   list files with `git ls-files` instead of walking the tree
#   DEPLOY_PORT        SSH port (default 22)
set -Eeuo pipefail
shopt -s inherit_errexit

SRC=${1:?source dir is required}
EXCL=${2:?exclude file is required}
shift 2
EXTRA=("$@")

: "${DEPLOY_HOST:?DEPLOY_HOST is required}"
: "${DEPLOY_DEST:?DEPLOY_DEST is required}"
: "${DEPLOY_SSH_KEY:?DEPLOY_SSH_KEY is required}"

PORT=${DEPLOY_PORT:-22}
STRICT=${DEPLOY_SSH_STRICT:-accept-new}
SSH=(ssh -i "$DEPLOY_SSH_KEY" -p "$PORT" -o StrictHostKeyChecking="$STRICT" -o BatchMode=yes)
SSH_STR="ssh -i $DEPLOY_SSH_KEY -p $PORT -o StrictHostKeyChecking=$STRICT -o BatchMode=yes"

SRC=$(cd "$SRC" && pwd)
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

NEW="$TMP/new"
OLD="$TMP/old"
DEL="$TMP/deleted"

# Shell-glob exclude patterns, one per line; `#` starts a comment.
# A directory entry needs a trailing `/*` (e.g. `.git/*`).
mapfile -t PATTERNS < <(sed -e 's/[[:space:]]*#.*$//' -e '/^[[:space:]]*$/d' "$EXCL")

is_excluded() {
  local path=$1 pattern
  for pattern in "${PATTERNS[@]}"; do
    # shellcheck disable=SC2254
    case "$path" in $pattern) return 0 ;; esac
  done
  return 1
}

if [ "${DEPLOY_TRACKED:-0}" = "1" ]; then
  mapfile -d '' -t FILES < <(git -C "$SRC" ls-files -z)
else
  mapfile -d '' -t FILES < <(cd "$SRC" && find . -type f -print0 | sed -z 's|^\./||')
fi

: > "$NEW"
for f in "${FILES[@]}"; do
  is_excluded "$f" || printf '%s\n' "$f" >> "$NEW"
done

KEY=$(printf '%s' "$DEPLOY_DEST" | sha256sum | cut -c1-16)
REMOTE_MANIFEST="\$HOME/.deploy-manifests/$KEY.files"

"${SSH[@]}" "$DEPLOY_HOST" "cat \"$REMOTE_MANIFEST\" 2>/dev/null || true" > "$OLD"

LC_ALL=C sort -o "$OLD" "$OLD"
LC_ALL=C sort -o "$NEW" "$NEW"
comm -23 "$OLD" "$NEW" > "$DEL"

if [ -s "$DEL" ]; then
  echo "Removing $(wc -l < "$DEL") file(s) that are no longer deployed"
  DELETE_REMOTE="cd $(printf '%q' "$DEPLOY_DEST") && while IFS= read -r p; do case \"\$p\" in /*|*..*) continue ;; esac; rm -f -- \"\$p\"; done"
  "${SSH[@]}" "$DEPLOY_HOST" "$DELETE_REMOTE" < "$DEL"
fi

if [ -s "$NEW" ]; then
  rsync -a -s "${EXTRA[@]}" --files-from="$NEW" -e "$SSH_STR" "$SRC/" "$DEPLOY_HOST:$DEPLOY_DEST/"
else
  echo "No deployable files; nothing to upload"
fi

"${SSH[@]}" "$DEPLOY_HOST" "mkdir -p \"\$HOME/.deploy-manifests\" && cat > \"$REMOTE_MANIFEST\"" < "$NEW"
echo "Deployed $(wc -l < "$NEW") file(s) to $DEPLOY_DEST"
