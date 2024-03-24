# JSS component abstractions

Date: 2024/02/05

## Status

Proposed

## Context

The designs for the homepage when scrolling though the page (see Homepage animation in Figma) display a transition in the background colour between one component to the next as you scroll through the page. This is a feature currently only included on the homepage designs.

## Decision

We have built a component which will wrap around the main body of components on the homepage. For all the children nested in this component, their theme background will be set to transparent. Then using the intersection observer, the theme will be set on the wrapper component and this will set the background colour which can then transition when the colour is changed and the wrapper theme is updated between components. The ScrollWrapper component is conditionally added in src\hcamain\src\Layout.tsx.

## Consequences

The scrolling transition effect can be acheived on the homepage, however this will not interfere the component themeing elsewhere and there is a possibility to extend this functionality if there was a dersire to use it elsewhere.
