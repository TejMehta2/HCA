import type { VacancyResponse } from 'components/Careers/JobDetailsHeader/JobDetailsHeader.types';

type VacancySchemaProps = {
  vacancy?: VacancyResponse | null;
};

const stripHtml = (value?: string) =>
  value
    ?.replace(/<\/?[^>]+(>|$)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const getDatePosted = (vacancy: VacancyResponse) =>
  vacancy.datePosted || vacancy.startDate || vacancy.createdDateTimeISO;

const getDescription = (vacancy: VacancyResponse) =>
  stripHtml(vacancy.bodyPlain) || stripHtml(vacancy.richDescription?.html);

const compactObject = <T extends Record<string, unknown>>(value: T) =>
  Object.fromEntries(
    Object.entries(value).filter(([, item]) => {
      if (Array.isArray(item)) {
        return item.length > 0;
      }

      return item !== undefined && item !== null && item !== '';
    })
  );

export default function VacancySchema({ vacancy }: VacancySchemaProps) {
  if (!vacancy) {
    return null;
  }

  const schema = compactObject({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: vacancy.name,
    description: getDescription(vacancy),
    identifier: compactObject({
      '@type': 'PropertyValue',
      name: 'HCA Healthcare UK',
      value: vacancy.id,
    }),
    datePosted: getDatePosted(vacancy),
    employmentType: vacancy.employmentType,
    industry: vacancy.jobAreas,
    occupationalCategory:
      vacancy.jobFamilyNameforJobProfile ||
      vacancy.jobFamily ||
      vacancy.jobFamilyGroup ||
      vacancy.jobFunction,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'HCA Healthcare UK',
    },
    jobLocation: {
      '@type': 'Place',
      name: vacancy.jobLocation,
      address: compactObject({
        '@type': 'PostalAddress',
        addressLocality: vacancy.jobCity,
        addressCountry: 'GB',
      }),
    },
    url: vacancy.landingPageUrl,
    directApply: false,
  });

  return (
    <script
      id={`ldjson-vacancy-${vacancy.id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
