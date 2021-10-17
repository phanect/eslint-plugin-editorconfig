#!/usr/bin/env bash

set -eux

TEST_PKGS_DIR="$(realpath "$(dirname "${BASH_SOURCE[0]}")")"
PROJECT_ROOT="$(realpath "${TEST_PKGS_DIR}/..")"
TMP="$(mktemp --directory)"

cd "${PROJECT_ROOT}"
PACKAGE="$(npm pack .)"

cd "${TEST_PKGS_DIR}"
git clean -Xd --force

# If you test without copying, test package is affected by node_modules in the project root
cp --recursive "${TEST_PKGS_DIR}" "${TMP}/"

for ESLINT_VERSION in "7" "8"; do
  for PKGDIR in $(find "${TMP}/test-packages/" -maxdepth 1 -type d ! -path "${TMP}/test-packages/"); do
    cd "${PKGDIR}"
    npm install
    npm install --save-dev "eslint@${ESLINT_VERSION}" "${PROJECT_ROOT}/${PACKAGE}"
    npm run lint
  done
done
