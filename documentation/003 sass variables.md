# Sass variables

Date 2023/09/27

## Status

Accepted

## Context

We need to share a variety of style variables throughout the CSS modules of the NextJS solution.

The client has requested that we do not use a utility library such as Tailwind.

## Decision

We have decided to share re-usable CSS properties to or CSS module files by import Sass variables form a global directory of Sass variables.

The variables will correspond as closely as possible with the structure used in the Figma design library.

## Consequences

If the Figma properties are updated in the future, we will have a single source of truth in the component library which can be updated.

Front end developers will not need regularly cross reference variables from the components in the Figma design library, because the variable name will be shown on the component in Figma, and will be ready to be imported into any CSS module file.