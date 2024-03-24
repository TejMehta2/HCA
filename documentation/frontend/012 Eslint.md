# ESLint

Date: 2023/10/12

## Status

Approved

## Context

By using ESLint, you can ensure that your code follows the same format, structure, and logic across your files, modules, and components.

This can make your code easier to share, reuse, and extend. It can also prevent some of the conflicts and issues that can arise from different coding styles and approaches.

## Decision

We have an ESLint config at the root of the repo.

We have a "lint" script in the root package.json to enable automatic linting.

All pull requests must not throw linting error.

We encourage contributors to use an ESLint IDE extension such the one for vs-code.

We discourage contributors from ignoring ESLint rules for specific lines or files.

We will check for linting errors as part of the pipeline.

## Consequences

Contributors are expected to only commit changes to .ts and .tsx files which do not throw linting errors.

Pull requests should not be merged if they have linting errors.
