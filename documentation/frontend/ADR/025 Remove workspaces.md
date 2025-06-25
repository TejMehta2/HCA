# Workspaces

Date: 2025/06/17

## Status

Accepted

## Context

THe XMCloud deployment process is not fully compatible with NPM workspaces.
## Decision

We will remove NPM workspaces and duplicate the component-library code within the repo.

## Consequences

We can control the changes to the component-library that are deployed to hcamain and any future microsites.
Changes to the project level version of component-library (e.g. src/hcamain/src/component-library) may be overwritten by the copy script.

XMCLoud deployments should succeed more frequently.