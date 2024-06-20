import Head from 'next/head';
import {
  ComponentRendering,
  LayoutServiceData,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { FooterProps } from 'components/Footer/Footer.types';
import { HeaderWithImageProps } from 'components/HeaderWithImage/HeaderWithImage';
import { HeroBannerWithSearchProps } from 'components/HeroBannerWithSearch/HeroBannerWithSearch';
import { HeroLocationDetailsProps } from 'components/HeroLocationDetails/HeroLocationDetails';
import { IntroBlockProps } from 'components/IntroBlock/IntroBlock';
import { PageRouteMetadata } from 'components/Metadata/Metadata';
import { BASE_URL } from 'lib/constants';
import { parse } from 'node-html-parser';

// This component should be nested inside the NextJS <Head> in the layout, so it can consume layoutData
// It renders a script tag containing SEO data in the ld/json schema format

interface SchemaProps {
  layoutData: LayoutServiceData;
}

const Schema = (props: SchemaProps) => {
  try {
    const { layoutData } = props;
    type SchemaPageType =
      | 'Homepage'
      | 'Condition'
      | 'Treatment'
      | 'Test'
      | 'Find a Doctor'
      | 'Hospital/Facility'
      | 'Generic';

    // Unpack values from layoutdata etc.
    const path = layoutData?.sitecore?.context?.itemPath as string;
    const url = `${BASE_URL}${path}`;
    const components = layoutData?.sitecore.route?.placeholders?.[
      'headless-main'
    ] as ComponentRendering[];
    const footerComponent = layoutData?.sitecore.route?.placeholders?.[
      'headless-footer'
    ]?.[0] as ComponentRendering;
    const footer = footerComponent?.placeholders?.['sxa-footer']?.[0];
    const route = layoutData?.sitecore?.route;
    const meta = route?.fields as PageRouteMetadata['fields'];

    const reviewComponent = components?.find(
      ({ componentName }) => ['IntroBlock'].includes(componentName) // TODO - potentially extend to CQCRating etc.
    );
    const heroComponent = components?.find(
      ({ componentName }) =>
        ['HeaderWithImage', 'HeroBannerWithSearch'].includes(componentName) // TODO - potentially extend to CQCRating etc.
    ) as HeaderWithImageProps | HeroBannerWithSearchProps;
    const locationHeroComponent = components?.find(
      ({ componentName }) => ['HeroLocationDetails'].includes(componentName) // TODO - potentially extend to CQCRating etc.
    ) as HeroLocationDetailsProps;

    // Keeping this here incase URL method doesn't work well
    // const templateId = route?.templateId
    //   ?.replaceAll(/[{\-}]/g, '')
    //   .toLowerCase();
    // const getPageType = (templateId?: string): SchemaPageType => {
    //   switch (templateId) {
    //     case '0b18db9eacec4f9e99c061a20535af37':
    //       return 'Homepage';
    //     case 'b63580c44e8a49e4a7c80e09552fcfbc':
    //       return 'Treatment';
    //     case '9069a668fc8d4fcf902c55c18743aa88':
    //       return 'Test';
    //     case '':
    //       return 'Condition';
    //     case '':
    //       return 'Find a Doctor';
    //     case 'ce35b67f8afb461a8ed31b9da4167731':
    //       return 'Hospital/Facility';
    //     default:
    //       return 'Generic';
    //   }
    // };
    // const pageType = getPageType(templateId);

    const getPageType = (path?: string): SchemaPageType => {
      if (!path) return 'Generic';
      const pathname = path?.toLocaleLowerCase();
      const includes = (substring: string) => pathname.includes(substring);
      if (pathname === '/' || pathname === '') return 'Homepage';
      if (includes('/services-and-treatments/treatments/')) return 'Treatment';
      if (includes('/tests-and-scans/')) return 'Test';
      if (includes('/conditions/')) return 'Condition';
      if (includes('/find-a-doctor')) return 'Find a Doctor';
      if (includes('/facilities/')) return 'Hospital/Facility';

      return 'Generic';
    };

    const pageType = getPageType(path);

    const reviewFields =
      (reviewComponent as IntroBlockProps)?.fields ||
      (footer as FooterProps)?.fields;
    const heroFields = heroComponent?.fields;
    const locationHeroFields = locationHeroComponent?.fields?.data?.contextItem;
    const name =
      heroFields?.data?.contextItem?.title?.jsonValue?.value ||
      meta?.MetaTitle?.value ||
      meta?.Title.value;
    const description = meta?.MetaDescription?.value || meta?.Text?.value;
    const aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: reviewFields?.DoctifyReviews?.fields?.Stars?.value || '',
      reviewCount: reviewFields?.DoctifyReviews?.fields?.Reviews?.value || '',
    };

    let schema: { [key: string]: unknown } = {
      '@context': 'https://schema.org',
      url: url,
    };

    const curatedJsonLdSchema = meta?.JsonLdSchema;

    // Adjust schema based on page type
    let noSchema: boolean = false;
    switch (pageType) {
      case 'Homepage':
        schema = {
          ...schema,
          name,
          '@type': 'Organization',
          aggregateRating,
        };
        break;
      case 'Condition':
        // TODO - implement once schema available
        break;
      case 'Treatment':
        schema = {
          ...schema,
          '@type': 'MedicalTherapy',
          name,
          description,
          aggregateRating,
        };
        break;
      case 'Test':
        schema = {
          ...schema,
          '@type': 'MedicalTest',
          name,
          description,
          aggregateRating,
        };
        break;
      case 'Hospital/Facility':
        schema = {
          ...schema,
          '@type': 'Hospital',
          name,
          description,
          address: {
            '@type': 'PostalAddress',
            streetAddress: locationHeroFields?.addressLine1?.jsonValue?.value,
            addressLocality: locationHeroFields?.city?.jsonValue?.value,
            postalCode: locationHeroFields?.postCode?.jsonValue?.value,
            addressCountry: 'United Kingdom',
          },
          // telephone: '020 3733 5344', // TODO replace with value when available
          image:
            meta?.AbstractImage?.value?.src ||
            meta?.MetaImage?.value?.src ||
            meta?.Image?.value?.src,
          department: locationHeroFields?.contactUnits?.contactUnitList?.map(
            (department) => ({
              '@type': 'Organization',
              name: department.contactUnitName.value,
              telephone:
                department.telephoneNumber.telephoneNumberList?.[0]?.phoneNumber
                  .value ||
                department.telephoneNumber.telephoneNumberList?.[0]
                  ?.phoneNumberLabel.value ||
                department.telephoneNumber.telephoneNumberList?.[0]
                  ?.internationPhoneNumber.value ||
                '',
              openingHoursSpecification:
                department.children.results?.[0].children.results.map(
                  (openingHours) => ({
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: openingHours.dayOfWeek.dayOfWeekList.map(
                      (day) => day.dayName.value
                    ),
                    opens: openingHours.opens.value,
                    closes: openingHours.closes.value,
                  })
                ),
            })
          ),
          aggregateRating,
        };
        break;
      default:
        noSchema = true;
        break;
    }

    // //don't render if there's no schema - schema data can be set in the component e.g. consultant finder profiles
    // if (noSchema && !curatedJsonLdSchema) {
    //   return <></>;
    // }

    // Pass the JSON LD Schema field from the CMS to the parse function
    const curatedLdJsonScripts = curatedJsonLdSchema?.value
      ? parse(curatedJsonLdSchema.value).getElementsByTagName('script')
      : [];

    return (
      <Head>
        {!noSchema && (
          <script
            type="application/ld+json"
            key="schema"
            data-test="schema-schema"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema),
            }}
          />
        )}

        {curatedLdJsonScripts.map((i, x) => (
          <script
            id={`ldjson-${x}`}
            key={`ldjson-${x}`}
            type={i.getAttribute('type')}
            dangerouslySetInnerHTML={{
              __html: i.innerHTML,
            }}
          />
        ))}
      </Head>
    );
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log(err);
    }

    return <></>;
  }
};

export default Schema;
