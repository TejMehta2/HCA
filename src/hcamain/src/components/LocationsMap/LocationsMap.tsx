/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  Text as JssText,
  LinkField,
  Link as JssLink,
  RichText as JssRichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import Text from '@component-library/foundation/Text/Text';
import Button from '@component-library/core-components/Button/Button';
import Themes from '@component-library/foundation/Themes/Themes';
import CardLocation from '@component-library/components/CardLocation/CardLocation';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import { Location } from '@component-library/site-components/OurLocations/OurLocations.types';
import dynamic from 'next/dynamic';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';

const DynamicOurLocations = dynamic(
  () => import('@component-library/site-components/OurLocations/OurLocations'),
  {
    ssr: false,
  }
);

type HCAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
  };
};

type CardFieldTheme = {
  name: Params['Theme'];
};

type CardsFields = {
  fields?: {
    Title?: Field<string>;
    Text?: Field<string>;
    Number?: Field<string>;
    Theme?: CardFieldTheme;
    PinPositionX: Field<string>;
    PinPositionY: Field<string>;
    MapScale?: Field<string>;
    CTAIcon?: HCAIconFields;
    CTALink?: LinkField;
    Icon: HCAIconFields;
  };
};

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
  Cards?: CardsFields[];
  CTAIcon?: HCAIconFields;
  CTALink?: LinkField;
}

type LocationsMapProps = {
  params?: Params;
  fields?: Fields;
};

const LocationsMapDefaultComponent = (
  props: LocationsMapProps
): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">LocationsMap no datasource</span>
    </div>
  </div>
);

export const Default = (props: LocationsMapProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext?.pageEditing;
  if (!props.fields) {
    return <LocationsMapDefaultComponent {...props} />;
  }

  const tableOfContentsLinkTitle = props?.fields?.Title?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;
  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.Heading?.value
  );
  const headerProps = {
    subtitle: (
      <Text tag={subheadingTag} variation="subheading-1">
        <JssText field={props.fields?.Heading} />
      </Text>
    ),
    title: (
      <Text
        tag={headingTag}
        variation={props.params?.HeadingSize || 'display-3'}
      >
        <JssText field={props.fields?.Title} />
      </Text>
    ),
    body: (
      <Text tag="p" variation="body-large">
        <JssRichText tag="span" field={props.fields?.Text} />
      </Text>
    ),
    ctas: !isExperienceEditor ? (
      <>
        {props.fields?.CTALink?.value?.text && (
          <Themes theme={props.params?.Theme || 'O-HCA-Teal-20'}>
            <Button size="large" variation="full-dark">
              <a href={props.fields?.CTALink?.value.href}>
                <span>
                  <SitecoreSvg>
                    {props?.fields?.CTAIcon?.fields?.SvgMarkup?.value}
                  </SitecoreSvg>
                </span>

                <span
                  dangerouslySetInnerHTML={{
                    __html: props.fields?.CTALink?.value.text || '',
                  }}
                ></span>
              </a>
            </Button>
          </Themes>
        )}
      </>
    ) : (
      props.fields?.CTALink && (
        <Button size="large" variation="full">
          <JssLink field={props.fields?.CTALink}></JssLink>
        </Button>
      )
    ),
  };

  const locationCards: Location[] = [];
  props.fields?.Cards?.map((card) => {
    const location = {
      mapX: Number(card?.fields?.PinPositionX?.value) || 0.66,
      mapY: Number(card?.fields?.PinPositionY?.value) || 0.85,
      mapScale: Number(card?.fields?.MapScale?.value) || 0.5,
      theme: card?.fields?.Theme?.name || 'B-HCA-Navy-Blue',
      card: (
        <CardLocation
          quantity={
            <Text tag="p" variation="display-1">
              <JssText field={card?.fields?.Number} />
            </Text>
          }
          title={
            <Text tag="p" variation="heading-2">
              <JssRichText tag="span" field={card?.fields?.Title} />
            </Text>
          }
          subtitle={
            card?.fields?.Text?.value ? (
              <Text tag="p" variation={'subheading-2'}>
                <JssText field={card?.fields?.Text} />
              </Text>
            ) : undefined
          }
          icon={
            card?.fields?.Icon?.fields?.SvgMarkup?.value ? (
              <SitecoreSvg>
                {card?.fields?.Icon?.fields?.SvgMarkup?.value}
              </SitecoreSvg>
            ) : undefined
          }
          cta={
            card.fields?.CTALink?.value ? (
              <a href={card.fields?.CTALink?.value.href}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: card.fields?.CTALink?.value.text || '',
                  }}
                ></span>
              </a>
            ) : (
              <></>
            )
          }
        />
      ),
    };
    locationCards.push(location);
  });

  return (
    <DynamicOurLocations
      id={componentAnchorId}
      {...(tableOfContentTitle && !props?.params?.ExcludeFromTableOfContents ? { tableOfContentTitle: tableOfContentTitle } : {})}
      mapAspectRatio={3000 / 3444}
      headerProps={headerProps}
      locations={locationCards}
    />
  );
};
