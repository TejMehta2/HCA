# 1. Storybook Accessibility

Date: 2023/10/12

## Status

Proposed

## Context

Storybook’s Accessibility addon runs Axe on the active story. It visualizes the test results in a panel and outlines all DOM nodes that have a violation.

By running these checks throughout the development process, we shorten the feedback loop and fix accessibility issues faster.

## Decision

We use the Storybook Accessibility addon in our Storybook implementation.

## Consequences

Developers using Storybook will be able to catch some accessibility issues early while working on components.

Some accessibility issues may still be present on the NextJS site pages, depending on content and component composition.