export type JsonLdData =
  | Record<string, unknown>
  | readonly Record<string, unknown>[];

/**
 * Replaces `<` to avoid ending the script tag early (e.g. `</script>` injection).
 * https://nextjs.org/docs/app/guides/json-ld
 */
export function toJsonLdString(value: JsonLdData): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
