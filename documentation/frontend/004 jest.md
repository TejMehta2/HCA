# Jest

Date: 2023/10/04

## Status

Proposed

## Context

We need to unit test and integration test our React components to ensure they behave as expected.

## Decision

We will use (Testing library)[https://testing-library.com/] with (Jest)[https://jestjs.io/].

## Consequences

We will be able to create `*.spec.tsx` files to accompany each React component in the component library.

These test files will be picked up by the test runner which will report any failures in the tests.
