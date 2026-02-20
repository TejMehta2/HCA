import { TemplateId, templateIdEqualTo } from 'lib/sitecore/templateIds';
import { DoctifyMappedSitecoreItemWithAncestors } from 'src/types/doctify/doctifyMappingTypes';

export function firstSelfOrAncestorByTemplate(
  template: TemplateId,
  contextItem: DoctifyMappedSitecoreItemWithAncestors | undefined
) {
  if (!contextItem) return undefined;

  const isLocationPageOrSubPage = templateIdEqualTo(
    contextItem.template.id,
    template
  );

  if (isLocationPageOrSubPage) return contextItem;

  for (const a of contextItem.ancestors ?? []) {
    if (templateIdEqualTo(a.template.id, template)) {
      return a;
    }
  }
  return undefined;
}
