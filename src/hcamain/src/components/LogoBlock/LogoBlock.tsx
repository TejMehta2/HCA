import React from 'react';
import {
  Field,
  LinkField,
  ImageField,
  ComponentRendering,
  RichText as JssRichText,
  Image,
  Text as JSSText,
  Link as JSSLink,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Theme, HeadingTag, HeadingSize } from 'src/types/params';
import { ButtonProps } from '@component-library/core-components/Button/Button.types';
import LogoBlock from '@component-library/site-components/LogoBlock/LogoBlock';
import Text from 'temp/component-library/foundation/Text/Text';
import AdvancedBlockHeader from '@component-library/components/AdvancedBlockHeader/AdvancedBlockHeader';

type CTAIconFields = {
  fields: {
    SvgMarkup: Field<string>;
  };
};

interface LogosFields {
  fields: {
    LogoImage: ImageField;
    Link: LinkField;
  };
}

interface Fields {
  Heading: Field<string>;
  Title: Field<string>;
  CTAIcon?: CTAIconFields;
  CTALink: LinkField;
  Text: Field<string>;
  Logos: LogosFields[];
}

type LogoBlockProps = {
  params: {
    [key: string]: string;
    Theme: Theme;
    HeadingTag: HeadingTag;
    HeadingSize: HeadingSize;
    styles: string;
  };
  rendering: ComponentRendering;
  fields: Fields;
};

const LogoBlockDefaultComponent = (props: LogoBlockProps): JSX.Element => {
  return (
    <div className={`component ${props.params.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Component with logos and links</span>
      </div>
    </div>
  );
};

export const Default = (props: LogoBlockProps): JSX.Element => {
  if (!props.fields) {
    return <LogoBlockDefaultComponent {...props} />;
  }

  console.log(props);
  return (
    <LogoBlock
      theme={props.params.Theme}
      header={
        <AdvancedBlockHeader
          subtitle={
            <Text variation={'subheading-1'}>
              <JSSText field={props.fields.Heading} />
            </Text>
          }
          title={
            <Text
              tag={props.params.HeadingTag}
              variation={props.params.HeadingSize}
            >
              <JSSText field={props.fields.Title} />
            </Text>
          }
          body={
            <Text tag="div" variation={'body-large'}>
              <JssRichText
                tag="p"
                className="promo-text"
                field={props.fields.Text}
              />
            </Text>
          }
          ctas={
            <Placeholder
              name={phKey}
              rendering={props.rendering}
              size={buttonSize}
            />
          }
        />
      }
      logos={props.fields.Logos.map((logo, index) => (
        <JSSLink key={index} field={logo.fields.Link}>
          <Image field={logo.fields?.LogoImage} />
        </JSSLink>
      ))}
    />);}
    /* <div className={`component ${props.params.styles}`}>
      <Text field={props.fields.Heading} />
      <br />
      <Text field={props.fields.Title} />
      <br />
      <JssRichText className="promo-text" field={props.fields.Text} />
      <br />
      <JssLink field={props.fields.CTALink}>
        {props?.fields?.CTAIcon && (
          <span
            dangerouslySetInnerHTML={{
              __html: props.fields.CTAIcon.fields.SvgMarkup.value,
            }}
          />
        )}
        {props?.fields?.CTALink.value.text && (
          <span
            dangerouslySetInnerHTML={{
              __html: props.fields.CTALink.value.text,
            }}
          ></span>
        )}
      </JssLink>
      <br />
      <ul>
        {props.fields.Logos.map((logo, index) => (
          <li key={index}>
            <JssLink field={logo.fields.Link}>
              <Image field={logo.fields?.LogoImage} />
            </JssLink>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};*/

export const SideBySide = (props: LogoBlockProps): JSX.Element => {
  if (!props.fields) {
    return <LogoBlockDefaultComponent {...props} />;
  }

  console.log(props);
  return (
    <LogoBlock
      theme={props.params.Theme}
      header={
        <AdvancedBlockHeader
          subtitle={
            <Text variation={'subheading-1'}>
              <JSSText field={props.fields.Heading} />
            </Text>
          }
          title={
            <Text
              tag={props.params.HeadingTag}
              variation={props.params.HeadingSize}
            >
              <JSSText field={props.fields.Title} />
            </Text>
          }
          body={
            <Text tag="div" variation={'body-large'}>
              <JssRichText
                tag="p"
                className="promo-text"
                field={props.fields.Text}
              />
            </Text>
          }
          ctas={
            <Placeholder
              name={phKey}
              rendering={props.rendering}
              size={buttonSize}
            />
          }
        />
      }
      logos={props.fields.Logos.map((logo, index) => (
        <JSSLink key={index} field={logo.fields.Link}>
          <Image field={logo.fields?.LogoImage} />
        </JSSLink>
      ))}
    />)}
    /* <div className={`component ${props.params.styles}`}>
      <Text field={props.fields.Heading} />
      <br />
      <Text field={props.fields.Title} />
      <br />
      <JssRichText className="promo-text" field={props.fields.Text} />
      <br />
      <JssLink field={props.fields.CTALink}>
        {props?.fields?.CTAIcon && (
          <span
            dangerouslySetInnerHTML={{
              __html: props.fields.CTAIcon.fields.SvgMarkup.value,
            }}
          />
        )}
        {props?.fields?.CTALink.value.text && (
          <span
            dangerouslySetInnerHTML={{
              __html: props.fields.CTALink.value.text,
            }}
          ></span>
        )}
      </JssLink>
      <br />
      <ul>
        {props.fields.Logos.map((logo, index) => (
          <li key={index}>
            <JssLink field={logo.fields.Link}>
              <Image field={logo.fields?.LogoImage} />
            </JssLink>
            <br />
          </li>
        ))}
      </ul>
    </div>
      <Placeholder name={phKey} rendering={props.rendering} size={buttonSize} />
    </div> */
  );
};
