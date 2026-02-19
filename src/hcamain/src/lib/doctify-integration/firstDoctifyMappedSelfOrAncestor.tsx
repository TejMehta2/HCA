import {
  DoctifyMappedSitecoreItem,
  DoctifyMappedSitecoreItemWithAncestors,
} from 'src/types/doctify/doctifyMappingTypes';

export const DOCTIFY_FIELDS = {
  Practice: 'doctifyPractice',
  KeywordId: 'doctifyKeywordId',
} as const;

export type DoctifyHit = {
  type: (typeof DOCTIFY_FIELDS)[keyof typeof DOCTIFY_FIELDS];
  value: string;
  item: DoctifyMappedSitecoreItem | DoctifyMappedSitecoreItemWithAncestors;
};

/**
 * Looks at the context item first, then walks ancestors in order,
 * and returns the first non-empty doctifyPractice OR doctifyKeywordId.
 */
export function firstDoctifyMappedSelfOrAncestor(
  contextItem: DoctifyMappedSitecoreItemWithAncestors | undefined
): DoctifyHit | null {
  const isNonEmpty = (v?: string | null) => (v ?? '').trim().length > 0;

  const check = (
    item: DoctifyMappedSitecoreItem | DoctifyMappedSitecoreItemWithAncestors
  ): DoctifyHit | null => {
    const practice = item.doctifyPractice?.value;
    if (isNonEmpty(practice)) {
      return { type: DOCTIFY_FIELDS.Practice, value: practice!.trim(), item };
    }

    const keywordId = item.doctifyKeywordId?.value;
    if (isNonEmpty(keywordId)) {
      return { type: DOCTIFY_FIELDS.KeywordId, value: keywordId!.trim(), item };
    }

    return null;
  };

  if (!contextItem) return null;

  // 1) context item
  const fromContext = check(contextItem);
  if (fromContext) return fromContext;

  // 2) ancestors
  for (const a of contextItem.ancestors ?? []) {
    const hit = check(a);
    if (hit) return hit;
  }

  return null;
}
