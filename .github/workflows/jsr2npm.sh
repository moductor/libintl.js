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

NPM_PACKAGE_KEYS=( $(cat package.json | jq -r keys[]) )
IGNORED_KEYS=( "type" "version" "dependencies" "exports" )

for KEY in ${NPM_PACKAGE_KEYS[@]}; do
  if [[ ! $(echo ${IGNORED_KEYS[@]} | grep -Fw $KEY) ]]; then
    VAL=$(cat package.json | jq ".$KEY")
    RES=$(cat "$DIST_DIR_EXT/package.json" | jq --argjson val "$VAL" ". + { \"$KEY\": \$val }" --indent 2)
    echo $RES | jq . > "$DIST_DIR_EXT/package.json"
  fi
done

npm publish "./$DIST_DIR_EXT" $NPM_PUBLISH_ARGS
