import React from 'react';
import {
  Field,
  Text as JssText,
  Image as JssImage,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ImageAndTextBlock from '@component-library/site-components/ImageAndTextBlock/ImageAndTextBlock';
import Text from '@component-library/foundation/Text/Text';
import ContactList from '@component-library/components/ContactList/ContactList';
import Icons from '@component-library/foundation/Icons/Icons';
import { Theme, HeadingSize, HeadingTag } from 'src/types/params';
import { formatDaysText } from 'components/CallUsTodayCTA/CallUsTodayCTA.utilities';
import { ContactItem } from '@component-library/components/ContactList/ContactList.types';

interface TelephoneNumberFields {
  phoneNumberLabel: { value: string };
  phoneNumber: { value: string };
  internationPhoneNumber: { value: string };
}

interface DayOfWeekFields {
  dayName: { value: string };
}

interface OpeningHoursSpecificationFields {
  dayOfWeek: {
    dayOfWeekList: DayOfWeekFields[];
  };
  opens: { value: string };
  closes: { value: string };
  validFrom: { value: string };
  validThrough: { value: string };
}

interface OpeningHoursFields {
  children: {
    results: OpeningHoursSpecificationFields[];
  };
}

interface ContactUnitFields {
  contactUnitName: { value: string };
  telephoneNumber: {
    telephoneNumberList: TelephoneNumberFields[];
  };
  children: {
    results: OpeningHoursFields[];
  };
}

interface Fields {
  data: {
    item: {
      heading: { jsonValue: Field<string> };
      title: { jsonValue: Field<string> };
      text: { jsonValue: Field<string> };
      image: { jsonValue: ImageField };
      contactUnits: {
        contactUnitList: ContactUnitFields[];
      };
    };
  };
}

type TalkToUsProps = {
  params: {
    [key: string]: string;
    Theme: Theme;
    HeadingTag: HeadingTag;
    HeadingSize: HeadingSize;
  };
  fields: Fields;
};

interface TalkToUsLeftProps extends TalkToUsProps {
  imageAlignment: 'left' | 'right';
}

const TalkToUsDefaultComponent = (props: TalkToUsProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">ImageShortText no datasource</span>
    </div>
  </div>
);

export const Default = (props: TalkToUsLeftProps): JSX.Element => {
  const { imageAlignment = 'left' } = props;
  if (!props.fields) {
    return <TalkToUsDefaultComponent {...props} />;
  }

  const contactListItems: ContactItem[] = [];

  props.fields.data.item.contactUnits.contactUnitList.map((contactUnit) => {
    const numbers = contactUnit.telephoneNumber.telephoneNumberList.map(
      (telephoneNumber, index) => {
        return (
          <Text tag="p" variation="display-6" key={index}>
            <a href={`tel:${telephoneNumber.internationPhoneNumber.value}`}>
              {telephoneNumber.phoneNumber.value}
            </a>
          </Text>
        );
      }
    );

    const availability: string[] = [];

    contactUnit.children.results.map((children) => {
      children.children.results.map((openingHours) => {
        const days: string[] = [];

        openingHours.dayOfWeek.dayOfWeekList.map((day) => {
          days.push(day.dayName.value);
        });

        availability.push(
          formatDaysText(
            days,
            openingHours.opens.value,
            openingHours.closes.value
          )
        );
      });
    });

    const availabilityString = availability.join(', ');

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
  });

  return (
    <ImageAndTextBlock
      theme={props.params.Theme || 'A-HCA-Main-Turquoise'}
      imageAlignment={imageAlignment}
      length="short"
      header={
        <Text
          tag={props.params.HeadingTag || 'h4'}
          variation={props.params.HeadingSize || 'subheading-2'}
        >
          <JssText field={props.fields.data.item.title.jsonValue} />
        </Text>
      }
      image={<JssImage field={props.fields.data.item.image.jsonValue} />}
    >
      <ContactList items={contactListItems} />
    </ImageAndTextBlock>
  );
};

export const ImageRight = (props: TalkToUsProps): JSX.Element => {
  if (!props.fields) {
    return <TalkToUsDefaultComponent {...props} />;
  }
  return <Default {...props} imageAlignment="right" />;
};
