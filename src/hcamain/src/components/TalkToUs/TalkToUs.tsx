import React from 'react';
import {
  Field,
  Text as JssText,
  Image as JssImage,
  ImageField,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ImageAndTextBlock from '@component-library/site-components/ImageAndTextBlock/ImageAndTextBlock';
import Text from '@component-library/foundation/Text/Text';
import ContactList from '@component-library/components/ContactList/ContactList';
import Icons from '@component-library/foundation/Icons/Icons';
import { Theme, HeadingSize, HeadingTag } from 'src/types/params';

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

const TalkToUsDefaultComponent = (props: TalkToUsProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">ImageShortText no datasource</span>
    </div>
  </div>
);

export const Default = (props: TalkToUsProps): JSX.Element => {
  if (!props.fields) {
    return <TalkToUsDefaultComponent {...props} />;
  }
  console.log(props);

  const contactListItems = [];

  props.fields.data.item.contactUnits.contactUnitList.map((contactUnit) => {
    const numbers = contactUnit.telephoneNumber.telephoneNumberList.map(
      (telephoneNumber, index) => {
        return (
          <Text tag="p" variation="display-6" key={index}>
            <JssText field={telephoneNumber.phoneNumber} />
          </Text>
        );
        //                 <li key={index}>
        //                   <JssText field={telephoneNumber.phoneNumberLabel} />
        //                   <br />
        //                   <JssText field={telephoneNumber.phoneNumber} />
        //                   <br />
        //                   <JssText field={telephoneNumber.internationPhoneNumber} />
        //                 </li>
        //               )
        //             )}
      }
    );

    const contactListItem = {
      title: (
        <Text tag="h4" variation="subheading-2">
          <JssText field={contactUnit.contactUnitName} />
        </Text>
      ),
      icon: <Icons iconName="iconClock"></Icons>,
      openingHours: (
        <Text tag="p" variation="body-large">
          Monday to Friday 8am - 6pm
        </Text>
      ),
      number: numbers,
    };
    contactListItems.push(contactListItem);
  });

  return (
    <ImageAndTextBlock
      theme={props.params.Theme || 'A-HCA-Main-Turquoise'}
      imageAlignment="left"
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
      <ContactList
        items={
          contactListItems
          // {
          //   title: (
          //     <Text tag="h4" variation="subheading-2">
          //       Embassy team
          //     </Text>
          //   ),
          //   number: (
          //     <Text tag="p" variation="display-6">
          //       020 3131 5978
          //     </Text>
          //   ),
          //   icon: <Icons iconName="iconClock"></Icons>,
          //   openingHours: (
          //     <Text tag="p" variation="body-large">
          //       Monday to Friday 8am - 6pm
          //     </Text>
          //   ),
          // },
        }
      />
    </ImageAndTextBlock>

    // <div className={`component ${props.params.styles}`}>
    //   <JssText field={props.fields.data.item.heading.jsonValue} />
    //   <br />
    //   <JssText field={props.fields.data.item.title.jsonValue} />
    //   <br />
    //   <JssRichText field={props.fields.data.item.text.jsonValue} />
    //   <br />
    //   <JssImage field={props.fields.data.item.image.jsonValue} />
    //   <br />
    //   <ul>
    //     {props.fields.data.item.contactUnits.contactUnitList.map(
    //       (contactUnit, index) => (
    //         <li key={index}>
    //           <JssText field={contactUnit.contactUnitName} />
    //           <br />
    //           <ul>
    //             {contactUnit.telephoneNumber.telephoneNumberList.map(
    //               (telephoneNumber, index) => (
    //                 <li key={index}>
    //                   <JssText field={telephoneNumber.phoneNumberLabel} />
    //                   <br />
    //                   <JssText field={telephoneNumber.phoneNumber} />
    //                   <br />
    //                   <JssText field={telephoneNumber.internationPhoneNumber} />
    //                 </li>
    //               )
    //             )}
    //           </ul>
    //           <br />
    //           <span>Opening Hours</span>
    //           <br />
    //           <ul>
    //             {contactUnit.children.results.map((children, index) => (
    //               <li key={index}>
    //                 <ul>
    //                   {children.children.results.map((openingHours, index) => (
    //                     <li key={index}>
    //                       <ul>
    //                         {openingHours.dayOfWeek.dayOfWeekList.map(
    //                           (day, index) => (
    //                             <li key={index}>
    //                               <JssText field={day.dayName} />
    //                             </li>
    //                           )
    //                         )}
    //                       </ul>
    //                       <br />
    //                       <JssText field={openingHours.opens} />
    //                       <br />
    //                       <JssText field={openingHours.closes} />
    //                       <br />
    //                       <JssText field={openingHours.validFrom} />
    //                       <br />
    //                       <JssText field={openingHours.validThrough} />
    //                     </li>
    //                   ))}
    //                 </ul>
    //               </li>
    //             ))}
    //           </ul>
    //         </li>
    //       )
    //     )}
    //   </ul>
    // </div>
  );
};
