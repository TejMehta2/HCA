// Check if the element or its ancestors posses an attribute, then return the value
// Don't return it no ancestor is a CTA (button or anchor)
const findClosestAttribute = (
  attribute: string,
  element: HTMLElement
): string | null | undefined => {
  if (!element.matches('a *, button *, a, button')) return;
  return element.closest(`[${attribute}]`)?.getAttribute(attribute);
};
export default findClosestAttribute;
