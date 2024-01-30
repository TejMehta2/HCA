import React from 'react';
import {
  Field,
  LinkField,
  Link as JssLink,
  Text as JssText,
  Item,
} from '@sitecore-jss/sitecore-jss-nextjs';

type CTAIconFields = {
  fields: {
    SvgMarkup: Field<string>;
  };
};

type QuestionFields = Item & {
  fields?: {
    Question?: Field<string>;
    Answer?: Field<string>;
    CTAIcon?: CTAIconFields;
    CTALink?: LinkField;
  };
};

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
  CTAIcon?: CTAIconFields;
  CTALink?: LinkField;
  Questions: QuestionFields[];
}

type FAQProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FAQBlockDefaultComponent = (props: FAQProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">FAQ Questions</span>
    </div>
  </div>
);

export const Default = (props: FAQProps): JSX.Element => {
  if (!props.fields) {
    return <FAQBlockDefaultComponent {...props} />;
  }
  return (
    <div>
      <JssText field={props.fields.Heading} />
      <br />
      <JssText field={props.fields.Title} />
      <br />
      <JssText field={props.fields.Text} />
      <br />
      {props.fields?.CTALink && (
        <JssLink field={props.fields?.CTALink}>
          {props?.fields?.CTAIcon?.fields.SvgMarkup && (
            <span
              dangerouslySetInnerHTML={{
                __html: props.fields.CTAIcon?.fields?.SvgMarkup?.value,
              }}
            ></span>
          )}
        </JssLink>
      )}
      <br />
      <ul>
        {props.fields.Questions.map((question, index) => (
          <li key={index}>
            <br />
            <JssText field={question.fields.Question} />
            <br />
            <JssText field={question.fields.Answer} />
            <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const RightAligned = (props: FAQProps): JSX.Element => {
  if (!props.fields) {
    return <FAQBlockDefaultComponent {...props} />;
  }
  return (
    <div>
      <JssText field={props.fields.Heading} />
      <br />
      <JssText field={props.fields.Title} />
      <br />
      <JssText field={props.fields.Text} />
      <br />
      {props.fields?.CTALink && (
        <JssLink field={props.fields?.CTALink}>
          {props?.fields?.CTAIcon?.fields.SvgMarkup && (
            <span
              dangerouslySetInnerHTML={{
                __html: props.fields.CTAIcon?.fields?.SvgMarkup?.value,
              }}
            ></span>
          )}
        </JssLink>
      )}
      <br />
      <ul>
        {props.fields.Questions.map((question, index) => (
          <li key={index}>
            <br />
            <JssText field={question.fields.Question} />
            <br />
            <JssText field={question.fields.Answer} />
            <br />
            {question.fields?.CTALink && (
              <JssLink field={question.fields?.CTALink}>
                {question.fields?.CTAIcon?.fields.SvgMarkup && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: question.fields.CTAIcon?.fields?.SvgMarkup?.value,
                    }}
                  ></span>
                )}
              </JssLink>
            )}
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};
