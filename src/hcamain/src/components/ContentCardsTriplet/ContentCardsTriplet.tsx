/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  Text as JssText,
  useSitecoreContext,
  LinkField,
  Link as JssLink,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Button from '@component-library/core-components/Button/Button';
import Params from 'src/types/params';
import Text from '@component-library/foundation/Text/Text';
import Themes from '@component-library/foundation/Themes/Themes';
import IconCtaBlock, {
  IconCtaBlockChild,
} from '@component-library/site-components/IconCtaBlock/IconCtaBlock';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import AdvancedBlockHeader from '@component-library/components/AdvancedBlockHeader/AdvancedBlockHeader';
import getHeadingTags from 'lib/getHeadingTags';
import RichText from '@component-library/core-components/RichText/RichText';

type CTAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
    SvgMarkup48?: Field<string>;
  };
};

interface CardFields {
  fields: {
    Title?: Field<string>;
    Text?: Field<string>;
    Icon?: CTAIconFields;
    PrimaryCTA: LinkField;
    SecondaryCTA: LinkField;
  };
}

interface Fields {
  Cards?: CardFields[];
  Heading?: Field<string>;
  Title: Field<string>;
  Text?: Field<string>;
}

type ContentCardsTripletProps = {
  params?: Params;
  fields?: Fields;
};

const ContentCardsTripletDefaultComponent = (
  props: ContentCardsTripletProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Content Cards Triplet. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: ContentCardsTripletProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext?.pageEditing;
  if (!props.fields) {
    return <ContentCardsTripletDefaultComponent {...props} />;
  }

  if (!props.fields?.Cards?.length && !isExperienceEditor) {
    return <></>;
  }

  const componentAnchorId = inPageNavGlobalStore.addItem(props?.params, '');
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.Heading?.value
  );

  return (
    <Themes
      theme={props.params?.Theme || 'B-HCA-Navy-Blue'}
      id={componentAnchorId}
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
    >
      {(
        <AdvancedBlockHeader
          contentVariation='centered'
          paddingSize='small-mobile'
          subtitle={
            (props.fields.Heading?.value || isExperienceEditor) && (
              <Text tag={subheadingTag} variation="subheading-1">
                <JssText field={props.fields?.Heading} />
              </Text>
            )
          }
          title={
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
        >
        </AdvancedBlockHeader>
      )}

      <IconCtaBlock>
        {props.fields?.Cards?.map((card, index) => {
          return (
            <IconCtaBlockChild
              key={index}
              icon={
                card?.fields?.Icon && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        card?.fields?.Icon?.fields?.SvgMarkup?.value || '',
                    }}
                  />
                )
              }
              title={
                card?.fields?.Title || isExperienceEditor ? (
                  <Text variation="heading-2">
                    <JssText field={card.fields?.Title} />
                  </Text>
                ) : (
                  <></>
                )
              }
              copy={
                (card?.fields?.Text || isExperienceEditor) ? (
                  <>
                    {card?.fields?.Text && (
                      <Text variation="body-large">
                        <JssRichText tag="div" field={card.fields.Text} />
                      </Text>
                    )}
                  </>
                ) : (
                  <></>
                )
              }
              ctas={
                <>
                  {(card?.fields?.PrimaryCTA?.value?.href ||
                    isExperienceEditor) && (
                      <Button
                        variation="full"
                        size="small"
                        contentVariation="full-width"
                      >
                        <JssLink field={card.fields.PrimaryCTA}>
                          {!isExperienceEditor && (
                            <>
                              {card?.fields?.PrimaryCTA.value?.text && (
                                <JssRichText
                                  tag="span"
                                  field={{
                                    value: card?.fields?.PrimaryCTA.value?.text,
                                  }}
                                />
                              )}
                            </>
                          )}
                        </JssLink>
                      </Button>
                    )}
                  {(card?.fields?.SecondaryCTA?.value?.href ||
                    isExperienceEditor) && (
                      <Button
                        variation="outline"
                        size="small"
                        contentVariation="full-width"
                      >
                        <JssLink field={card.fields.SecondaryCTA}>
                          {!isExperienceEditor && (
                            <>
                              {card?.fields?.SecondaryCTA.value?.text && (
                                <JssRichText
                                  tag="span"
                                  field={{
                                    value: card?.fields?.SecondaryCTA.value?.text,
                                  }}
                                />
                              )}
                            </>
                          )}
                        </JssLink>
                      </Button>
                    )}
                </>
              }
            />
          );
        })}
      </IconCtaBlock>
    </Themes>
  );
};
