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

  return (
    <Themes
      theme={props.params?.Theme || 'B-HCA-Navy-Blue'}
      id={componentAnchorId}
      {...(tableOfContentTitle && !props?.params?.ExcludeFromTableOfContents ? { tableOfContentTitle: tableOfContentTitle } : {})}
    >
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
                card?.fields?.Text || isExperienceEditor ? (
                  <Text variation="body-large">
                    <JssRichText tag="div" field={card.fields.Text} />
                  </Text>
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
