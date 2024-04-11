#!/bin/bash

set -euo pipefail

DIST_TAR_FILE=${DIST_TAR_FILE:-"dist.tgz"}
DIST_DIR=${DIST_DIR:-"dist"}

NPM_PACKAGE=${NPM_PACKAGE:-$(cat package.json | jq -r .name)}
JSR_PACKAGE=${JSR_PACKAGE:-$(cat jsr.json | jq -r .name)}

VERSION=${VERSION:-$(cat jsr.json | jq -r .version)}

NPM_PUBLISH_ARGS=${NPM_PUBLISH_ARGS:-""}

CURRENT_VERSION=$(npm view "$NPM_PACKAGE" version)

if [[ "$CURRENT_VERSION" == "$VERSION" ]]; then
  echo "Version $VERSION was already published!"
  exit 0
fi

JSR_ID=$(echo $JSR_PACKAGE | sed 's/@//g')
JSR_ID=$(echo $JSR_ID | sed 's/\//__/g')
JSR_URL="https://npm.jsr.io/@jsr/$JSR_ID"

JSR_DATA=$(curl -s "$JSR_URL")
TAR_URL=$(echo $JSR_DATA | jq -r .versions[\"$VERSION\"].dist.tarball)

curl -s -o "$DIST_TAR_FILE" "$TAR_URL"

mkdir -p "$DIST_DIR"
tar -xzf "$DIST_TAR_FILE" -C "$DIST_DIR"

DIST_DIR_EXT_NAME=$(ls "$DIST_DIR" | head -n 1)
DIST_DIR_EXT="$DIST_DIR/$DIST_DIR_EXT_NAME"

tmp=$(mktemp)
jq ".name = \"$NPM_PACKAGE\"" "$DIST_DIR_EXT/package.json" > "$tmp" && mv "$tmp" "$DIST_DIR_EXT/package.json"

tmp=$(mktemp)
REPOSITORY=$(cat package.json | jq -r .repository)
jq ".repository = \"$REPOSITORY\"" "$DIST_DIR_EXT/package.json" > "$tmp" && mv "$tmp" "$DIST_DIR_EXT/package.json"

npm publish "./$DIST_DIR_EXT" $NPM_PUBLISH_ARGS
