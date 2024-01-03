# SVG import library

Date: 2023/10/26

## Status

Proposed

## Context

SVG files cannot be directly imported into React components.
SVG files in img tags and CSS url() values cannot be styled i.e. stroke and fill colors.

## Decision

We will import SVG files as React components to allow for styling from parent elements. E.g. buttons which change fill/stroke of icon on hover.

## Consequences

The Icons component will render an SVG tag.