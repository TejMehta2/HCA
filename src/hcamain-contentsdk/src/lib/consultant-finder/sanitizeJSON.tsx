export function sanitizeJSON(unsanitized: string) {
  return filterString(
    unsanitized,
    'abcdefghijklmnopqrstuvwxyz .ABCDEFGHIJKLMNOPQRSTUVWXYZ\r\n$£()*?1234567890&'
  ); // don't add [] to the list it breaks RegEx
}

export function filterString(input: string, allowedChars: string) {
  // Create a regular expression that matches any character not in the allowedChars string
  const regex = new RegExp(`[^${allowedChars}]`, 'g');
  // Replace all characters not in the allowedChars string with an empty string
  return input.replace(regex, '?');
}
