# Prettier code formatter

Date: 2023/10/12

## Status

Approved

## Context

Automatic code formatting is great for developer experience and improves developer efficiency.

We need to keep a consistent code format to allow developers to use automatic code formatter tools, while avoiding unneeded file changes from clouding the purpose of commits when a file is formatted differently.

## Decision

We have a prettier config at the root of the repo.

We have a "format" script in the root package.json to enable automatic code formatting.

We encourage contributors to use a format-on-save tool such the one built into vs-code.

Our linter flags format discrepancies as errors.

Prettier targets .ts, .tsx and .scss files.

## Consequences

Contributors are expected to only commit changes to .ts, .tsx and .scss files which have been formatted via Prettier using the config at the root of the repo.
