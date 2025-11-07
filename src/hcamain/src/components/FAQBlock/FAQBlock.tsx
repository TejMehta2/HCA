/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  LinkField,
  Link as JssLink,
  Text as JssText,
  Item,
  RichText as JssRichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import AccordionsBlock from '@component-library/site-components/AccordionsBlock/AccordionsBlock';
import Text from '@component-library/foundation/Text/Text';
import Button from '@component-library/core-components/Button/Button';
import Params from 'src/types/params';
import { Accordions } from '@component-library/components/Accordions/Accordions.types';
import AccordionsBlockSideBySide from '@component-library/site-components/AccordionsBlockSideBySide/AccordionsBlockSideBySide';
import Head from 'next/head';
import RichText from '@component-library/core-components/RichText/RichText';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';

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
  Heading?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
  CTAIcon?: CTAIconFields;
  CTALink: LinkField;
  Questions?: QuestionFields[];
}

type FAQProps = {
  params?: Params;
  fields?: Fields;
};

type FAQSchema = {
  '@type': string;
  name: string | undefined;
  acceptedAnswer: {
    '@type': string;
    text: string | undefined;
  };
}[];

const getAccordions = (
  questions: QuestionFields[],
  isExperienceEditor: boolean | undefined
) => {
  const accordions: Accordions = [];

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

const getSchema = (questions: QuestionFields[]) => {
  const questionSchema: FAQSchema = [];
  for (const accordion of questions) {
    questionSchema.push({
      '@type': 'Question',
      name: accordion.fields?.Question?.value,
      acceptedAnswer: {
        '@type': 'Answer',
        text: accordion.fields?.Answer?.value,
      },
    });
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questionSchema,
  };
  return faqSchema;
};

const FAQBlockDefaultComponent = (props: FAQProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          FAQ Block. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

export const Default = (props: FAQProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  if (!props?.fields?.Questions) {
    return <FAQBlockDefaultComponent {...props} />;
  }

  const tableOfContentsLinkTitle = props?.fields?.Title?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );

  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  const accordions = getAccordions(props.fields?.Questions, isExperienceEditor);

  const faqSchema = getSchema(props.fields?.Questions);

  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.Heading?.value
  );
  return (
    <>
      <Head>
        <script
          key="faqs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <AccordionsBlock
        id={componentAnchorId}
        {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
        theme={props.params?.Theme || 'A-HCA-White'}
        subtitle={
          (props.fields.Heading?.value || isExperienceEditor) && (
            <Text tag={subheadingTag} variation="subheading-1">
              <JssText field={props.fields?.Heading} />
            </Text>
          )
        }
        header={
          (props.fields.Title?.value || isExperienceEditor) && (
            <Text
              tag={headingTag}
              variation={props.params?.HeadingSize || 'display-3'}
            >
              <JssText field={props.fields?.Title} />
            </Text>
          )
        }
        body={
          (props.fields.Text?.value || isExperienceEditor) && (
            <Text tag="div" variation="body-large">
              <RichText>
                <JssRichText field={props.fields?.Text} />
              </RichText>
            </Text>
          )
        }
        accordions={accordions.accordions}
        ctas={
          isExperienceEditor ? (
            <Button variation="full" size="large">
              <JssLink field={props.fields?.CTALink}></JssLink>
            </Button>
          ) : (
            props.fields?.CTALink?.value?.href && (
              <Button variation="full" size="large">
                <JssLink field={props.fields?.CTALink}>
                  {props?.fields?.CTAIcon?.fields?.SvgMarkup && (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: props.fields?.CTAIcon?.fields?.SvgMarkup?.value,
                      }}
                    ></span>
                  )}
                  <JssRichText
                    tag="span"
                    field={{
                      value: props.fields?.CTALink.value.text,
                    }}
                  />
                </JssLink>
              </Button>
            )
          )
        }
      />
    </>
  );
};

export const RightAligned = (props: FAQProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (!props?.fields?.Questions) {
    return <FAQBlockDefaultComponent {...props} />;
  }

  const tableOfContentsLinkTitle = props?.fields?.Title?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );

  const accordions = getAccordions(props.fields?.Questions, isExperienceEditor);

  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  const faqSchema = getSchema(props.fields?.Questions);
  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.Heading?.value
  );
  return (
    <>
      <Head>
        <script
          key="faqs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <AccordionsBlockSideBySide
        {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
        id={componentAnchorId}
        theme={props.params?.Theme || 'A-HCA-White'}
        body={
          (props.fields.Text?.value || isExperienceEditor) && (
            <Text tag="div" variation="body-large">
              <RichText>
                <JssRichText field={props.fields?.Text} />
              </RichText>
            </Text>
          )
        }
        header={
          (props.fields.Title?.value || isExperienceEditor) && (
            <Text tag={headingTag} variation={props.params?.HeadingSize}>
              <JssText field={props.fields?.Title} />
            </Text>
          )
        }
        subtitle={
          (props.fields.Heading?.value || isExperienceEditor) && (
            <Text tag={subheadingTag} variation="subheading-1">
              <JssText field={props.fields?.Heading} />
            </Text>
          )
        }
        accordions={accordions.accordions}
        ctas={
          isExperienceEditor ? (
            <Button variation="full" size="large">
              <JssLink field={props.fields?.CTALink}></JssLink>
            </Button>
          ) : (
            props.fields?.CTALink?.value?.href && (
              <Button variation="full" size="large">
                <JssLink field={props.fields?.CTALink}>
                  {props?.fields?.CTAIcon?.fields?.SvgMarkup && (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: props.fields?.CTAIcon?.fields?.SvgMarkup?.value,
                      }}
                    ></span>
                  )}
                  <JssRichText
                    tag="span"
                    field={{
                      value: props.fields?.CTALink?.value.text,
                    }}
                  />
                </JssLink>
              </Button>
            )
          )
        }
      />
    </>
  );
};
