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
import { ContentCardsProps } from 'components/ContentCards/ContentCards';
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
      | 'Hospital/Facility'
      | 'Generic';

    // Unpack values from layoutData etc.
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

    const reviewComponent = components?.find(({ componentName }) =>
      ['IntroBlock'].includes(componentName)
    );
    const heroComponent = components?.find(({ componentName }) =>
      ['HeaderWithImage', 'HeroBannerWithSearch'].includes(componentName)
    ) as HeaderWithImageProps | HeroBannerWithSearchProps;
    const locationHeroComponent = components?.find(({ componentName }) =>
      ['HeroLocationDetails'].includes(componentName)
    ) as HeroLocationDetailsProps;

    const templateId = route?.templateId
      ?.replaceAll(/[{\-}]/g, '')
      .toLowerCase();
    const getPageType = (templateId?: string): SchemaPageType => {
      switch (templateId) {
        case '0b18db9eacec4f9e99c061a20535af37':
          return 'Homepage';
        case 'b63580c44e8a49e4a7c80e09552fcfbc':
          return 'Treatment';
        case '9069a668fc8d4fcf902c55c18743aa88':
          return 'Test';
        case '9b38cf346e1748b6b48781931a90aa8a':
          return 'Condition';
        case 'ce35b67f8afb461a8ed31b9da4167731':
          return 'Hospital/Facility';
        default:
          return 'Generic';
      }
    };
    const pageType = getPageType(templateId);

    const reviewFields = (reviewComponent as IntroBlockProps)?.fields;
    const reviewFieldsFooter = (footer as FooterProps)?.fields;
    const heroFields = heroComponent?.fields;
    const locationHeroFields = locationHeroComponent?.fields?.data?.contextItem;
    const name =
      heroFields?.data?.contextItem?.title?.jsonValue?.value ||
      meta?.MetaTitle?.value ||
      meta?.Title.value;
    const description = meta?.MetaDescription?.value || meta?.Text?.value;

    const conditionDescription = meta?.Text?.value;

    const reviewCountIntroBlock = reviewFields?.data?.item?.doctifyReviews
      ?.targetItem?.reviews?.value
      ? reviewFields?.data?.item?.doctifyReviews?.targetItem?.reviews?.value.replace(
          /[+,]/g,
          ''
        )
      : null;

    const reviewCountFooter = reviewFieldsFooter?.data?.item?.doctifyReviews
      ?.targetItem?.reviews?.value
      ? reviewFieldsFooter?.data?.item?.doctifyReviews?.targetItem?.reviews?.value.replace(
          /[+,]/g,
          ''
        )
      : null;

    const ratingValueIntroBlock =
      reviewFields?.data?.item?.doctifyReviews?.targetItem?.stars?.value ||
      null;

    const ratingValueFooter =
      reviewFieldsFooter?.data?.item?.doctifyReviews?.targetItem?.stars
        ?.value || null;

    const ratingValue = ratingValueIntroBlock || ratingValueFooter || '';
    const reviewCount = reviewCountIntroBlock || reviewCountFooter || '';

    // Construct aggregateRating only if ratingValue or reviewCount has a value
    const aggregateRating = (ratingValue || reviewCount) && {
      '@type': 'AggregateRating',
      ...(ratingValue && { ratingValue }), // Include ratingValue only if it's not empty
      ...(reviewCount && { reviewCount }), // Include reviewCount only if it's not empty
    };

    // Hospital details
    let locationSpecialties;
    let departmentSchema;
    if (pageType === 'Hospital/Facility') {
      const contentCards = components?.find(({ componentName }) =>
        ['ContentCards'].includes(componentName)
      ) as ContentCardsProps;

      if (contentCards?.dataSource?.includes('services')) {
        locationSpecialties =
          contentCards?.fields?.data?.item?.pages?.PagesList;
      }

      // Try target specific page specialties or use specialties from meta
      if (locationSpecialties) {
        departmentSchema = locationSpecialties?.map((department) => ({
          '@type': 'Organization',
          name: department.title?.value,
          url: department.url?.path,
          image: department.image?.jsonValue?.value?.src,
        }));
      } else if (meta?.Specialties) {
        departmentSchema = meta?.Specialties.map((department) => ({
          '@type': 'Organization',
          name: department.name,
          url: department.url,
          image: department?.fields?.Image?.value?.src,
        }));
      } else {
        departmentSchema = '';
      }
    }

    const hospitalTelephone =
      locationHeroFields?.contactUnits?.contactUnitList?.[0]?.telephoneNumber
        ?.telephoneNumberList?.[0]?.phoneNumber.value;

    const locationInfo =
      locationHeroFields?.contactUnits?.contactUnitList?.[0]?.children
        ?.results?.[0]?.children?.results?.[0];

    const days = locationInfo?.dayOfWeek.dayOfWeekList.map(
      (day) => day.dayName.value
    );
    const openingTime = locationInfo?.opens?.value;
    const closingTime = locationInfo?.closes?.value;
    const openingHours = `${days}, ${openingTime} - ${closingTime}`;

    const schema: { [key: string]: unknown } = {
      '@context': 'https://schema.org',
      url: url,
    };

    // Reviews Schema
    const reviewsSchema = {
      ...schema,
      '@type': 'MedicalOrganization',
      name: name,
      ...(aggregateRating && { aggregateRating }), // Only include aggregateRating if not null
    };

    const schemas = [];

    const curatedJsonLdSchema = meta?.JsonLdSchema;

    // Adjust schema based on page type
    let noSchema: boolean = false;
    switch (pageType) {
      case 'Homepage':
        const organizationSchema = {
          ...schema,
          name,
          '@type': 'Organization',
          ...(aggregateRating && { aggregateRating }), // Only include aggregateRating if not null
        };

        schemas.push(organizationSchema, reviewsSchema);

        break;
      case 'Condition':
        // MedicalCondition schema to be added manually
        // const medicalConditionSchema = {
        //   ...schema,
        //   name,
        //   '@type': 'MedicalCondition',
        //   conditionDescription,
        // };

        schemas.push(reviewsSchema);

        break;
      case 'Treatment':
        const MedicalTherapySchema = {
          ...schema,
          '@type': 'MedicalTherapy',
          name,
          description,
        };

        schemas.push(MedicalTherapySchema, reviewsSchema);

        break;
      case 'Test':
        const MedicalTestSchema = {
          ...schema,
          '@type': 'MedicalTest',
          name,
          conditionDescription,
          ...(aggregateRating && { aggregateRating }), // Only include aggregateRating if not null
        };
        schemas.push(MedicalTestSchema, reviewsSchema);
        break;
      case 'Hospital/Facility':
        const facilitySchema = {
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
          openingHours: openingHours,
          telephone: hospitalTelephone,
          image:
            meta?.AbstractImage?.value?.src ||
            meta?.MetaImage?.value?.src ||
            meta?.Image?.value?.src,
          department: departmentSchema,
          ...(aggregateRating && { aggregateRating }), // Only include aggregateRating if not null
        };
        schemas.push(facilitySchema, reviewsSchema);
        break;
      default:
        noSchema = true;
        break;
    }

    // Pass the JSON LD Schema field from the CMS to the parse function
    const curatedLdJsonScripts = curatedJsonLdSchema?.value
      ? parse(curatedJsonLdSchema.value).getElementsByTagName('script')
      : [];

    return (
      <Head>
        {!noSchema &&
          schemas.length &&
          schemas.map((schema, index) => {
            return (
              <script
                id={`ldjson-schema-${index}`}
                type="application/ld+json"
                key={`${index}-schema`}
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(schema),
                }}
              />
            );
          })}

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
