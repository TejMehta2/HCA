# Button Theme Reliance

Date: 2024/01/04

## Status

Proposed

## Context

The component library houses several types of components: foundation-components (e.g. typography, colors), core-components (e.g. buttons) and components (everything else). However, there is a notable distinction between components which are intended to be integrated into hcamain, and those which are intended to be consumed in other components which is not clear in the current system.

## Decision

We will define "site-components" as a new category of components which are intended to be integrated with hcamain and beyond.

We will move these site-components into their own folder in the component-library.

We will move the site-components into a new category in storybook

## Consequences

Developers and testers will be easily able to identify integrated site components as a distinct category