# 1. NextJS Pages router

Date: 2023/10/04

## Status

Accepted

## Context

We need to share React components from our component library to multiple NextJS solutions.

Multiple Sitecore websites can exist using the same repo, which can contain multiple NextJS solutions.


## Decision

We will use NPM workspaces to allow our NextJS solutions to import React components from our component library.

## Consequences

If we want to use a different repo for a future NextJS solution but we still want to import from the component library, then we will need to migrate the component library to an NPM package.
