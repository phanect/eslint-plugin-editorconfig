#!/usr/bin/env bash

set -eu

TEST_PKG_DIR="$(realpath "$(dirname "${BASH_SOURCE[0]}")")"
PROJECT_ROOT="$(realpath "${TEST_PKG_DIR}/../..")"
TMP="$(mktemp --directory)"

cd "${PROJECT_ROOT}"
PACKAGE="$(npm pack .)"

# If you test without copying, test package is affected by node_modules in the project root
cp --recursive "${TEST_PKG_DIR}" "${TMP}/"
cd "${TMP}/package/"
npm install "${PROJECT_ROOT}/${PACKAGE}"

npm run lint
