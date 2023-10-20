# CSS modules

Date 2023/09/27

## Status

Accepted

## Context

We need to style the NextJS solution to match the supplied Figma designs.

The framework needs to be portable, so it can be applied similarly to future solutions.

We cannot not use Tailwind, or any 3rd party frameworks.

The client has requested that we create a bespoke CSS framework to style the HCA site.

## Decision

We have decided to use CSS modules to apply styles to the components of the site.

## Consequences

Re-usable blocks of CSS code will need to be applied via a re-usable React components instead of a CSS selectors.

CSS classes in CSS module files are locally scoped, so there is no need to use BEM, or unique names.