import React from 'react';
import {
  Field,
  Text as JssText,
  ImageField,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ImageAndTextBlock from '@component-library/site-components/ImageAndTextBlock/ImageAndTextBlock';
import Text from '@component-library/foundation/Text/Text';
import ContactList from '@component-library/components/ContactList/ContactList';
import Icons from '@component-library/foundation/Icons/Icons';
import Params from 'src/types/params';
import { ContactItem } from '@component-library/components/ContactList/ContactList.types';
import { ContactUnitFields } from 'src/jss-abstractions/OpeningHoursTextFormatting/OpeningHours.types';
import { OpeningHours } from 'src/jss-abstractions/OpeningHoursTextFormatting/OpeningHours';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import { inPageNavGlobalStore } from 'src/context/inPageNavGlobalStorage';

interface Fields {
  data?: {
    item?: {
      heading?: { jsonValue?: Field<string> };
      title?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
      image?: { jsonValue?: ImageField };
      contactUnits?: {
        contactUnitList?: ContactUnitFields[];
      };
    };
  };
}

type TalkToUsProps = {
  params?: Params;
  fields?: Fields;
};

interface TalkToUsLeftProps extends TalkToUsProps {
  imageAlignment: 'left' | 'right';
}

const TalkToUsDefaultComponent = (props: TalkToUsProps): JSX.Element => (
  <div className={`component promo ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">TalkToUs no datasource</span>
    </div>
  </div>
);

export const ImageLeft = (props: TalkToUsLeftProps): JSX.Element => {
  const { imageAlignment = 'left' } = props;

  if (!props.fields) {
    return <TalkToUsDefaultComponent {...props} />;
  }

  const tableOfContentsLinkTitle =
    props.fields?.data?.item?.title?.jsonValue?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );

  const contactListItems: ContactItem[] = [];

  props.fields?.data?.item?.contactUnits?.contactUnitList?.map(
    (contactUnit: ContactUnitFields) => {
      const numbers = contactUnit?.telephoneNumber?.telephoneNumberList?.map(
        (telephoneNumber, index) => {
          return (
            <Text tag="p" variation="display-6" key={index}>
              <a href={`tel:${telephoneNumber?.internationPhoneNumber?.value}`}>
                {telephoneNumber?.phoneNumber?.value}
              </a>
            </Text>
          );
        }
      );

      const availabilityString = OpeningHours(contactUnit);

      const contactListItem = {
        title: (
          <Text tag="h4" variation="subheading-2">
            <JssText field={contactUnit.contactUnitName} />
          </Text>
        ),
        icon: <Icons iconName="iconClock"></Icons>,
        openingHours: (
          <Text tag="p" variation="body-large">
            {availabilityString}
          </Text>
        ),
        number: numbers,
      };
      contactListItems.push(contactListItem);
    }
  );

  return (
    <ImageAndTextBlock
      id={componentAnchorId}
      theme={props.params?.Theme || 'D-HCA-Teal'}
      imageAlignment={imageAlignment}
      length="short"
      subheader={
        !!props.fields?.data?.item?.heading?.jsonValue?.value && (
          <Text tag="p" variation="subheading-1">
            <JssText field={props.fields?.data?.item?.heading?.jsonValue} />
          </Text>
        )
      }
      header={
        <Text
          tag={props.params?.HeadingTag || 'h4'}
          variation={props.params?.HeadingSize || 'display-2'}
        >
          <JssText field={props.fields?.data?.item?.title?.jsonValue} />
        </Text>
      }
      image={
        <NextJssImage
          field={props.fields?.data?.item?.image?.jsonValue}
          next={{
            width: 1000,
            height: 1000,
            sizes: '(max-width: 768px) 100vw, 50vw',
          }}
        />
      }
    >
      <Text tag="div" variation="body-large">
        <RichText field={props.fields?.data?.item?.text?.jsonValue} />
      </Text>
      <ContactList items={contactListItems} />
    </ImageAndTextBlock>
  );
};

export const ImageRight = (props: TalkToUsProps): JSX.Element => {
  if (!props.fields) {
    return <TalkToUsDefaultComponent {...props} />;
  }
  return <ImageLeft {...props} imageAlignment="right" />;
};
