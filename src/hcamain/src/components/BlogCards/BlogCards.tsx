import React from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  Link,
  RichText,
  Image,
} from '@sitecore-jss/sitecore-jss-nextjs';

type HCAIconFields = {
  fields: {
    SvgMarkup: Field<string>;
  };
};

interface BlogTags {
  fields: {
    Title: Field<string>;
  };
}

interface BlogFields {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    Date: Field<string>;
    Image: ImageField;
    Tags: BlogTags[];
  };
  url: string;
}

interface Fields {
  Title: Field<string>;
  CTAIcon: HCAIconFields;
  CTALink: LinkField;
  Cards: BlogFields[];
}

type BlogCardsProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const BlogCardsDefaultComponent = (props: BlogCardsProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">CTA</span>
    </div>
  </div>
);

export const Carousel = (props: BlogCardsProps): JSX.Element => {
  if (!props.fields) {
    return <BlogCardsDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <Text field={props.fields.Title} />
      <br />
      <span>
        <b>Cards</b>
      </span>
      <br />
      <ul>
        {props.fields.Cards.map((card, index) => (
          <li key={index}>
            <Text field={card.fields.Title} />
            <br />
            <RichText tag="span" field={card.fields.Description} />
            <br />
            <Image field={card.fields.Image} />
            <br />
            <Text field={card.fields.Date} />
            <br />
            <a href={card.url}>
              <RichText
                tag="span"
                field={{
                  value: card.url,
                }}
              />
            </a>
            <br />
            {props?.fields?.CTAIcon && (
              <span
                dangerouslySetInnerHTML={{
                  __html: props.fields.CTAIcon.fields.SvgMarkup.value,
                }}
              />
            )}
            <Link field={props.fields.CTALink}></Link>
            <ul>
              {card.fields.Tags.map((tag, index) => (
                <li key={index}>
                  <Text field={tag.fields.Title} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <br />
    </div>
  );
};

export const Standard = (props: BlogCardsProps): JSX.Element => {
  if (!props.fields) {
    return <BlogCardsDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <Text field={props.fields.Title} />
      <br />
      <span>
        <b>Cards</b>
      </span>
      <br />
      <ul>
        {props.fields.Cards.map((card, index) => (
          <li key={index}>
            <Text field={card.fields.Title} />
            <br />
            <RichText tag="span" field={card.fields.Description} />
            <br />
            <Image field={card.fields.Image} />
            <br />
            <Text field={card.fields.Date} />
            <br />
            <a href={card.url}>
              <RichText
                tag="span"
                field={{
                  value: card.url,
                }}
              />
            </a>
            <br />
            {props?.fields?.CTAIcon && (
              <span
                dangerouslySetInnerHTML={{
                  __html: props.fields.CTAIcon.fields.SvgMarkup.value,
                }}
              />
            )}
            <Link field={props.fields.CTALink}></Link>
            <ul>
              {card.fields.Tags.map((tag, index) => (
                <li key={index}>
                  <Text field={tag.fields.Title} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <br />
    </div>
  );
};
