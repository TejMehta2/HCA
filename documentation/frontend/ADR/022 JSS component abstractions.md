# JSS component abstractions

Date: 2024/01/19

## Status

Approved

## Context

During development we noticed there are some patterns emerging in the way we consume JSS components. E.g. rendering icons in links always uses the same HTML structure, or dates always need to be formatted.

## Decision

We store these abstractions in the `hcamain/src/jss-abstractions directory` as re-usable React components.

## Consequences

When integrating components into hcamain, we can import these abstractions.

Integrated components will have smaller more readable file sizes.

The way we consume JSS components will be centralized, which is more maintainable, e.g. for framework updates.