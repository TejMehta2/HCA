// Returns the next heading tag in the hierarchy, based on the provided parent tag.
// This is useful for page components where CMS content can determine the parent heading tag, and we need the child heading tags to correspond for correct SEO
const getSubheadingTag = (
  parentTag: keyof JSX.IntrinsicElements,
  fallback: keyof JSX.IntrinsicElements
) => {
  switch (parentTag) {
    case 'h1':
      return 'h2';
    case 'h2':
      return 'h3';
    case 'h3':
      return 'h4';
    case 'h4':
      return 'h5';
    case 'h5':
      return 'h6';
    default:
      return fallback;
  }
};
export default getSubheadingTag;
