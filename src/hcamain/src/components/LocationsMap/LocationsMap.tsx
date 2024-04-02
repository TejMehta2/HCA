import React from 'react';
import {
  Field,
  Text as JssText,
  LinkField,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import OurLocations from '@component-library/site-components/OurLocations/OurLocations';
import Text from '@component-library/foundation/Text/Text';
import Button from '@component-library/core-components/Button/Button';
import Icons from '@component-library/foundation/Icons/Icons';
import CardLocation from '@component-library/components/CardLocation/CardLocation';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import { Location } from '@component-library/site-components/OurLocations/OurLocations.types';

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
  if (!props.fields) {
    return <LocationsMapDefaultComponent {...props} />;
  }

  const headerProps = {
    subtitle: (
      <Text tag="h3" variation="subheading-1">
        <JssText field={props.fields?.Heading} />
      </Text>
    ),
    title: (
      <Text
        tag={props.params?.HeadingTag || 'h2'}
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
    ctas: (
      <Button size="large" variation="full">
        <a href={props.fields?.CTALink?.value.href}>
          {props?.fields?.CTAIcon?.fields?.SvgMarkup?.value && (
            <span>
              <SitecoreSvg>
                {props?.fields?.CTAIcon?.fields?.SvgMarkup?.value}
              </SitecoreSvg>
            </span>
          )}

          <span
            dangerouslySetInnerHTML={{
              __html: props.fields?.CTALink?.value.text || '',
            }}
          ></span>
        </a>
      </Button>
    ),
  };

  const locationCards: Location[] = [];
  props.fields?.Cards?.map((card, index) => {
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
              <JssRichText tag="span" field={card?.fields?.Text} />
            </Text>
          }
          subtitle={
            <Text tag="p" variation={'subheading-2'}>
              {index === 0 ? 'Scroll down to explore' : undefined}
            </Text>
          }
          icon={index === 0 ? <Icons iconName={'iconArrowDown'} /> : undefined}
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
    <OurLocations
      mapAspectRatio={3000 / 3444}
      headerProps={headerProps}
      locations={locationCards}
    />
  );
};
