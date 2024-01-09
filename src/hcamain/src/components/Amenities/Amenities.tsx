import React from 'react';
import {
  Field,
  ImageField,
  Text as JssText,
  RichText as JssRichText,
  Image as JssImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ImageAndTextBlock from '@component-library/site-components/ImageAndTextBlock/ImageAndTextBlock';
import Text from '@component-library/foundation/Text/Text';
import { iconList } from '@component-library/site-components/ImageAndTextBlock/ImageAndTextBlock.types';

type HCAIconFields = {
  fields: {
    SvgMarkup: Field<string>;
  };
};

type AmenitiesFields = {
  fields: {
    Title: Field<string>;
    Icon: HCAIconFields;
  };
};

interface Fields {
  Title: Field<string>;
  Text: Field<string>;
  Image: ImageField;
  AmenitiesList: AmenitiesFields[];
}

type AmenitiesProps = {
  params: {
    [key: string]: string;
  };
  fields: Fields;
};

const AmenitiesDefaultComponent = (props: AmenitiesProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">
        Homepage Service Cards - no datasource
      </span>
    </div>
  </div>
);

export const Default = (props: AmenitiesProps): JSX.Element => {
  if (!props.fields) {
    return <AmenitiesDefaultComponent {...props} />;
  }

  const amenitiesList: iconList = [];
  props.fields.AmenitiesList.map((item) => {
    amenitiesList.push({
      text: item.fields.Title.value,
      icon: (
        <span
          dangerouslySetInnerHTML={{
            __html: item.fields.Icon.fields.SvgMarkup.value,
          }}
        ></span>
      ),
    });
  });

  return (
    <div className={`component ${props.params.styles}`}>
      <ImageAndTextBlock
        theme="E-HCA-Dark-Grey"
        imageAlignment="left"
        length="short"
        header={
          <Text tag="h2" variation="display-2">
            <JssRichText field={props.fields.Title} />
          </Text>
        }
        iconList={amenitiesList}
        image={<JssImage field={props.fields.Image} />}
      >
        <Text tag="p" variation="body-large">
          <JssText field={props.fields.Text}></JssText>
        </Text>
      </ImageAndTextBlock>
    </div>
  );
};
