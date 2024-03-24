# SCSS Imports

Date: 2023/10/10

## Status

Proposed

## Context

@import tag within SCSS has been deprecated and the recommended approach is now to use @forward and @use

We need a consistent file convention for scss files.

## Decision

@forward will be used within index SCSS files so that they can be grouped together and distrubuted to other files

@use will be used within component SCSS files and will be bringing in the index file from the FOUNDATION directory. These will be assigned 'as \*' in order to avoid using namespaces.

scss files in the FOUNDATION directory will be prefixed with an underscore, to signify that they are imported via the Index.module.scss file, and not directly into site components.

## Consequences

Some variable names may clash and the namespaces may need to be brought back in at a later date
