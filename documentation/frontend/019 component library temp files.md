# component library temp files

Date: 2023/12/11

## Status

Proposed

## Context

Back end developers have reported that workspace imports into React components ( e.g. in  src/hcamain) from the component-library are not working in Docker.

We need a solution which allows front end developers and the vercel deployment pipeline to benefit from workspaces, while not blocking back end developers using Docker.

We also need to be able to watch for changes, in case we need to perform full-stack debugging which includes changing component-library files while observing changes in the site while using a Docker container.

## Decision

We will copy the necessary files from the component-library into the gitignored src/temp folder of hcamain.

We will reference imports into hcamain React components from the component library using the alias `@component-library/``.

We will start watching for file changes in component-library and perform a new copy when files change (debounced to one copy per 500ms)

The copy script will run with the Dockerfile ENTRYPOINT script.

## Consequences

Back end developers are able to start the NextJS solution at hcamain in Docker, without relying on symlink imports from workspace code.

As long as the import lias is used, the ts-config will first look for temp files, then fall back to the external component library when they are not present.

Front end developers and the deployment pipeline in vercel will continue to reference the external component library via the alias fallback.