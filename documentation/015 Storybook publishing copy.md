# 1. Storybook hosting - Chromatic

Date: 2023/10/13

## Status

Agreed

## Context

In order to get the most out of using storybook to showcase the design library, we need to publish it somewhere for all stakeholders to review and provide feedback.

## Decision

(Chromatic)[https://www.chromatic.com/] is the company behind Storybook who maintain it, they provide a publishing option that provides free hosting and 5000 free snapshots (comparisons) of components.

This is the simplest and quickest way to publish storybook for now and is good enough for the beginning of the project. This decision might be reviewed in future.

## Consequences

There is a chromatic account that has access to the Github repo, a Github Action workflow that publishes storybook to Chromatic upon a git tag prefixed with `storybook-v`, and we need to ensure all design library stakeholders have accounts set up to access the published Storybook instance.

More details and process documented here: https://equator.atlassian.net/wiki/spaces/HCA/pages/2875686913/Storybook+publishing
