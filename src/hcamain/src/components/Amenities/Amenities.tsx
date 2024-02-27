import React from 'react';
import {
  Field,
  ImageField,
  Text as JssText,
  Image as JssImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ImageAndTextBlock from '@component-library/site-components/ImageAndTextBlock/ImageAndTextBlock';
import Text from '@component-library/foundation/Text/Text';
import {
  iconList,
  imageAlignmentTypes,
} from '@component-library/site-components/ImageAndTextBlock/ImageAndTextBlock.types';
import { Theme, HeadingTag, HeadingSize } from 'src/types/params';

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
    Theme: Theme;
    HeadingTag: HeadingTag;
    HeadingSize: HeadingSize;
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

const outputAmenitiesList = (props: AmenitiesProps) => {
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

  return amenitiesList;
};

const outputImageAndTextBlock = (
  props: AmenitiesProps,
  alignment: imageAlignmentTypes
) => {
  return (
    <ImageAndTextBlock
      theme={props.params.Theme || 'B-HCA-Navy-Blue'}
      imageAlignment={alignment}
      length="short"
      header={
        <Text
          tag={props.params.HeadingTag}
          variation={props.params.HeadingSize || 'display-2'}
        >
          <JssText field={props.fields.Title} />
        </Text>
      }
      iconList={outputAmenitiesList(props)}
      image={<JssImage field={props.fields.Image} />}
    >
      <Text tag="p" variation="body-large">
        <JssText field={props.fields.Text}></JssText>
      </Text>
    </ImageAndTextBlock>
  );
};

export const ImageLeft = (props: AmenitiesProps): JSX.Element => {
  if (!props.fields) {
    return <AmenitiesDefaultComponent {...props} />;
  }

  return outputImageAndTextBlock(props, 'left');
};

export const ImageRight = (props: AmenitiesProps): JSX.Element => {
  if (!props.fields) {
    return <AmenitiesDefaultComponent {...props} />;
  }

  return outputImageAndTextBlock(props, 'right');
};
