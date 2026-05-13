export const SITECORE_TEMPLATE_IDS = {
  BlogPage: '{A8381A60-0F5C-4A6C-B267-AC53C2E85070}',
  CampaignPage: '{A2890888-BEF4-4309-B88B-9CB23C89F1EC}',
  ConditionPage: '{9B38CF34-6E17-48B6-B487-81931A90AA8A}',
  ContentPage: '{0B18DB9E-ACEC-4F9E-99C0-61A20535AF37}',
  DiagnosisPage: '{9069A668-FC8D-4FCF-902C-55C18743AA88}',
  LocationPage: '{CE35B67F-8AFB-461A-8ED3-1B9DA4167731}',
  PatientStoryPage: '{8475FA0B-1D8B-4363-A26D-30E9AFDC63E3}',
  SpecialtyPage: '{44EC72D6-A82E-4F4B-848E-BC20A7361204}',
  SubspecialtyPage: '{8D06F1CE-8E64-491C-B9FE-449437B0880E}',
  SupportServicePage: '{FD826C1B-5B95-47F0-B336-93E7BADD8DBE}',
  TreatmentPage: '{B63580C4-4E8A-49E4-A7C8-0E09552FCFBC}',
} as const;

export type TemplateName = keyof typeof SITECORE_TEMPLATE_IDS;
export type TemplateId = (typeof SITECORE_TEMPLATE_IDS)[TemplateName];

export const templateIdEqualTo = (
  id: string | undefined,
  template: TemplateId
): boolean => idEqualTo(id, template);

/**
 * Normalize Sitecore ID:
 * - lowercase
 * - remove dashes
 * - remove brackets
 */
export const normalizeId = (id?: string | undefined): string =>
  id?.toLowerCase().replace(/[-{}]/g, '') ?? '';

/**
 * Compare any two IDs safely
 */
export const idEqualTo = (
  idA?: string | undefined,
  idB?: string | undefined
): boolean => normalizeId(idA) === normalizeId(idB);
