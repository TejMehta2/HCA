# 1. Component scaffold

Date: 2023/10/05

## Status

Proposed

## Context

We want to keep our components consistent and maintainable.

We achieve will this by using an agreed folder structure, where the component and it's tests, styles, stories and types are in separate files within a folder. The files and folder are named following a convention.

We need a way to make this process accessible to developers, without having them copy/paste and rename lots of files when adding a feature.

## Decision

We will use a scaffold script to scaffold new components.

The format of the scaffold templates will define the conventions for file names and folder structure.

## Consequences

If a developer wants to create a new component, they can call the scaffold script and enter the component name when prompted.

The script will create the necessary files to start working.
