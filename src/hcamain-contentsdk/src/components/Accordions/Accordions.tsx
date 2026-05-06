'use client'
import type React from 'react';
import {
  Field,
  LinkField,
  Text as JssText,
  Link as JssLink,
  Item,
  RichText as JssRichText,
  useSitecore,  
} from '@sitecore-content-sdk/nextjs';
import Accordions from 'temp/component-library/components/Accordions/Accordions';
import Params from 'src/types/params';
import { AccordionsProps } from 'temp/component-library/components/Accordions/Accordions.types';
//import Head from 'next/head';
import RichText from 'temp/component-library/core-components/RichText/RichText';
import Themes from 'temp/component-library/foundation/Themes/Themes';
import Button from 'temp/component-library/core-components/Button/Button';

type CTAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
  };
};

type QuestionFields = Item & {
  fields?: {
    Question?: Field<string>;
    Answer?: Field<string>;
    CTAIcon: CTAIconFields;
    CTALink: LinkField;
  };
};

interface Fields {
  Questions?: QuestionFields[];
}

type FAQProps = {
  params?: Params;
  fields?: Fields;
};

// type FAQSchema = {
//   '@type': string;
//   name: string | undefined;
//   acceptedAnswer: {
//     '@type': string;
//     text: string | undefined;
//   };
// }[];

const getAccordions = (
  questions: QuestionFields[],
  isExperienceEditor: boolean | undefined
) => {
  const accordions: AccordionsProps['accordions'] = [];

  for (const accordion of questions) {
    accordions.push({
      title: <JssText field={accordion.fields?.Question} />,
      children: (
        <>
          <RichText>
            <JssRichText field={accordion.fields?.Answer}></JssRichText>
          </RichText>

          {isExperienceEditor ? (
            <Button variation="full" size="large">
              <JssLink field={accordion.fields?.CTALink}></JssLink>
            </Button>
          ) : (
            accordion.fields?.CTALink?.value?.href && (
              <Button variation="full" size="large">
                <JssLink field={accordion.fields?.CTALink}>
                  {accordion?.fields?.CTAIcon?.fields?.SvgMarkup && (
                    <span
                      dangerouslySetInnerHTML={{
                        __html:
                          accordion.fields?.CTAIcon?.fields?.SvgMarkup?.value,
                      }}
                    ></span>
                  )}
                  <JssRichText
                    tag="span"
                    field={{
                      value: accordion.fields?.CTALink.value.text,
                    }}
                  />
                </JssLink>
              </Button>
            )
          )}
        </>
      ),
    });
  }

  return { accordions };
};

// const getSchema = (questions: QuestionFields[]) => {
//   const questionSchema: FAQSchema = [];
//   for (const accordion of questions) {
//     questionSchema.push({
//       '@type': 'Question',
//       name: accordion.fields?.Question?.value,
//       acceptedAnswer: {
//         '@type': 'Answer',
//         text: accordion.fields?.Answer?.value,
//       },
//     });
//   }

//   const faqSchema = {
//     '@context': 'https://schema.org',
//     '@type': 'FAQPage',
//     mainEntity: questionSchema,
//   };
//   return faqSchema;
// };


const AccordionsDefaultComponent : React.FC<FAQProps> = (props) => {
  const { sitecoreContext } = useSitecore();
  const isExperienceEditor = sitecoreContext.pageEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          Accordions. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

export const Default: React.FC<FAQProps> = (props) => {
  const { sitecoreContext } = useSitecore();
  const isExperienceEditor = sitecoreContext.pageEditing;

  if (!props?.fields?.Questions) {
    return <AccordionsDefaultComponent {...props} />;
  }
  const accordions = getAccordions(props.fields?.Questions, isExperienceEditor);

  // const faqSchema = getSchema(props.fields?.Questions);

  return (
    <>
      {/* <Head>
        <script
          key="faqs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head> */}
      <Themes theme={props.params?.Theme || 'A-HCA-White'}>
        <Accordions accordions={accordions.accordions} />
      </Themes>
    </>
  );
};
