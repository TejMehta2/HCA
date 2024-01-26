import React from 'react';
import { 
  Field,
   LinkField,
   RichText as JssRichText,
    Text as JssText,
     Item }
      from '@sitecore-jss/sitecore-jss-nextjs';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import {
  ButtonProps,
} from '@component-library/core-components/Button/Button.types';

type CTAIconFields = {
  fields: {
    SvgMarkup: Field<string>;
  };
};

type QuestionFields = Item & {
  fields?: {
    Question?: Field<string>;
    Answer?: Field<string>;
  };  
};

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  CTAIcon?: CTAIconFields;
  CTALink?: LinkField;
  Questions:QuestionFields[];
}

type FAQProps = {
  params: { [key: string]: string };
  fields: Fields;
  size: ButtonProps['size'];
};

const FAQBLockDefaultComponent = (props: FAQProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">FAQ Questions</span>
    </div>
  </div>
);

export const Default = (props: FAQProps): JSX.Element => {
  if (!props.fields){
    return <FAQBLockDefaultComponent {...props} />;
  }
  return (
  <div>
     {
          <Text tag={'h2'} variation={'display-5'}>
            <JssText field={props.fields.Title} />
          </Text>
        }
  </div>

    );
  };
  
