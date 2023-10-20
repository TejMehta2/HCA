# 1. NextJS Pages router

Date: 2023/10/04

## Status

Proposed

## Context

React server components are a promising new React feature which is supported by NextJS in the newly released App router.

The App router is designed to replaces the NextJS Pages router.

The App router is production ready for NextJS.

App router is not supported by the JSS templates available at time of writing.

There is no progress reported from JSS developers on implementing the NextJS App router in their Sitecore template, and no sign it will be made available any time soon. See [comment from JSS repo maintainer on 2023/09/08 ](https://github.com/Sitecore/jss/discussions/1498).

This makes it impossible to use React server components as implemented in the app router, unless we were to re-write all the utilities which fetch and unpack CMS data which would be a significant work.

[NextJS documentation](https://nextjs.org/docs/pages) comments on the issue:

> The Pages Router is still supported in newer versions of Next.js, but we recommend migrating to the new App Router to leverage React's latest features.

## Decision

We will use NextJS Pages router for the HCA site re-platform.

## Consequences

We will not use NextJS App router.

We cannot React server components for the HCA site re-platform.

The component library will still be compatible with NextJS App router. If the JSS maintainers adopt the App router in a template, we could re-use the component library on an App router NextJS solution, or potentially migrate the HCA site re-platform at that time.
