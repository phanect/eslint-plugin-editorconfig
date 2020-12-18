#!/usr/bin/env bash

set -eu

DIRNAME="$(dirname "${BASH_SOURCE[0]}")"

cd "${DIRNAME}/../../"
PACKAGE="$(npm pack .)"

cd "${DIRNAME}"
npm install "../../${PACKAGE}"

npm run lint
