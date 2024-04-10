#!/usr/bin/env bash

set -eux

# Until this plugin supports flat config, test with legacy .eslintrc.*
export ESLINT_USE_FLAT_CONFIG=false

TEST_PKGS_DIR="$(realpath "$(dirname "${BASH_SOURCE[0]}")")"
PROJECT_ROOT="$(realpath "${TEST_PKGS_DIR}/..")"
TMP="$(mktemp --directory)"

# To run tests on local machine
if [[ -z "${ESLINT_VERSION:-}" ]]; then
  ESLINT_VERSION=9
fi

cd "${PROJECT_ROOT}"
PACKAGE="$(npm pack .)"

cd "${TEST_PKGS_DIR}"
git clean -Xd --force

# If you test without copying, test package is affected by node_modules in the project root
cp --recursive "${TEST_PKGS_DIR}" "${TMP}/"

for PKGDIR in $(find "${TMP}/test-packages/success/" -maxdepth 1 -type d ! -path "${TMP}/test-packages/success/"); do
  cd "${PKGDIR}"
  npm install
  npm install --save-dev "eslint@${ESLINT_VERSION}" "${PROJECT_ROOT}/${PACKAGE}"
  npm run lint
done

for PKGDIR in $(find "${TMP}/test-packages/failure/" -maxdepth 1 -type d ! -path "${TMP}/test-packages/failure/"); do
  cd "${PKGDIR}"
  npm install
  npm install --save-dev "eslint@${ESLINT_VERSION}" "${PROJECT_ROOT}/${PACKAGE}"

  if \
    [[ "${PKGDIR}" = "${TMP}/test-packages/failure/missing-ts-eslint" ]] && \
    [[ -z "$((npm run lint 2>&1) | grep "eslint-plugin-editorconfig requires typescript and @typescript-eslint/eslint-plugin to lint \*.ts files. Run \`npm install typescript @typescript-eslint/eslint-plugin\`.")" ]]
  then
    echo "Error message is not shown properly when @typescript-eslint/eslint-plugin is missing" >&2
    echo "ESLint's error message:"
    npm run lint
    exit 1
  fi
done
