# 1. JSS component dependency

Date: 2023/10/04

## Status

Proposed

## Context

We need make the components in our component library suitably portable and re-usable. 

The JSS components included with Sitecore JSS library are not designed to work in isolation i.e. they cannot be used in components which exist outside of the root directory of each NextJS solution.

JSS components are required in order to enable various CMS content population features.

## Decision

We will not attempt to consume JSS components as a dependency in the component library.

## Consequences

JSS components will consume the field and parameter data in the component files in the "data mapping" components found in the `components/`` directory of each NextJS solution.

The "data mapping" components will pass the consumed JSS components as a ReactNode as a prop.