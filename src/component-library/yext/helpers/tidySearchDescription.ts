export function tidySearchDescription(raw?: string | null): string {
  if (!raw) return '';

  return (
    raw
      // Turn escaped line breaks into spaces
      .replace(/\\r\\n|\\n|\\r|\\t/g, ' ')

      // Remove markdown emphasis markers
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      .replace(/_(.*?)_/g, '$1')

      // Unescape punctuation like \&, \-, \*, \_
      .replace(/\\([&\-*_#[\](){}.!+\\])/g, '$1')

      // Replace bullets with commas
      .replace(/\s*[•·]\s*/g, ', ')

      // Collapse whitespace
      .replace(/\s{2,}/g, ' ')
      .trim()
  );
}
