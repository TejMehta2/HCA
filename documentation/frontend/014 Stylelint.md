# Stylelint

Date: 2023/10/13

## Status

Proposed

## Context

Stylelint is a CSS linter that helps you avoid errors and enforce conventions.

This can make your code easier to share, reuse, and extend. It can also prevent some of the conflicts and issues that can arise from different coding styles and approaches.

## Decision

We have an Stylelint config at the root of the repo.

We have a "lint" script in the root package.json to enable automatic linting.

All pull requests must not throw linting error.

We encourage contributors to use a Stylelint IDE extension such the one for vs-code.

We discourage contributors from ignoring Stylelint rules for specific lines or files although there may be some cases where exeptions are acceptable e.g. to use em units for breakpoints.

We will check for linting errors as part of the pipeline.

## Consequences

Contributors are expected to only commit changes to .scss files which do not throw linting errors.

Pull requests should not be merged if they have linting errors.
