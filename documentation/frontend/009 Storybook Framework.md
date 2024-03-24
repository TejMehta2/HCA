# Storybook framework

Date: 2023/10/09

## Status

Proposed

## Context

Storybook is installed within component-library directory, but this is set up in React and not NextJs. There is a potential issue that any NextJs-specific features will not work correctly within storybook

## Decision

NextJs-specific features will be passed in to components via props and will likely not be needed within Storybook.

## Consequences

There may be an instance in the future where a NextJs feature cannot be passed through props, but at the moment it is not necessary.
