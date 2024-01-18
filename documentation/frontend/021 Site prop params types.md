# Button Theme Reliance

Date: 2024/01/11

## Status

Approved

## Context

Sitecore components provide props which contain params and fields. Params are CMSable fields where the user can select from a discreet set of options e.g. for HeadingSize, Theme, HeadingTag.

Integrated components consume these params and pass them as props to imported React components from the component library.

The NextJs application hcamain has no ability to determine the types of params provided via Sitecore.

Component-library components are typed. 

Ideally we would maintain some level of type-safety between the CMSable params options and what is expected to be received by component-library components.

## Decision

Component integrations will import the type for the params prop from an application-wide types file in `/src/types/params.ts`.

Back end developers will ensure that this type file corresponds with the actual data in the CMS, and adjust the type in the template where needed (e.g. in case there is a limited set of Theme options for a given component)

## Consequences

If there is a mismatch between the CMS data provided to components via the params prop, we will get a compiler error from Typescript informing us that the imported component-library component does not accept this type of data.