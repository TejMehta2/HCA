# Button Theme Reliance

Date: 2023/12/21

## Status

Proposed

## Context

The button hover animation for 'full' buttons shows the current button colour being pushed to the right by the colour of the background behind the button. A solution was needed so the background colour for the hover would match the background colour of where the buttons have been placed.

## Decision

(https://github.com/HCA-Eqtr/HCA-XMCloud/pull/131#pullrequestreview-1792862362)

Most buttons will be used in parent components which utilise Themes. Therefore, the most straightforward way to pick up the background dynamically was to set the button hover background to use the --background variable which corresponds to the theme background colour. It was considered that not all buttons may be nested inside a component using a Theme, in this scenario the suggestion is that just the Button could be wrapped in the appropriate theme.

Another way attempted to resolve the issue was to try use the 'inherit' CSS property on the button and button hover background. However, this became unwieldy with inherit needing to be added to multiple elements on a parent component too if a button was heavily nested.

## Consequences

When implementing the Button component devs now need to be conscious of whether they are using a Theme and to wrap the Button if the parent component is not using a Theme.
