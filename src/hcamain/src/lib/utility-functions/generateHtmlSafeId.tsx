/**
 * Generates a safe ID string for use as an HTML id attribute.
 * The last non-empty parameter takes precedence over all others.
 * @param args - A list of string parameters.
 * @returns A string that is safe to use as an HTML id attribute.
 */
export const generateHtmlSafeId = (title: string | undefined) => {
  const source = title?.trim();

  if (!source) {
    return ''; // Fallback if no valid parameter is provided.
  }

  // Replace spaces with hyphens, remove non-alphanumeric characters (except hyphens),
  // and ensure it starts with a letter or underscore for valid HTML id.
  const safeId = source
    .trim()
    .toLowerCase()
    .replace(/^\d+/, '')         // REMOVE numbers from the very start
    .replace(/[^a-z0-9\s-]/g, '') // Remove invalid characters.
    .replace(/\s+/g, '-') // Replace spaces with hyphens.
    .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens.

  return safeId || ''; // Fallback if the result is empty.
};
