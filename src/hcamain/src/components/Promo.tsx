import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Button from '@hca/component-library/core-components/Button/Button';
import Text from '@hca/component-library/foundation/Text/Text';
import Themes from '@hca/component-library/foundation/Themes/Themes';
import CardBlog from '@hca/component-library/components/CardBlog/CardBlog';
import Tags from '@hca/component-library/core-components/Tags/Tags';

interface Fields {
  PromoIcon: ImageField;
  PromoText: Field<string>;
  PromoLink: LinkField;
  PromoText2: Field<string>;
}

type PromoProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const PromoDefaultComponent = (props: PromoProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Promo</span>
    </div>
  </div>
);

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        id={id ? id : undefined}
      >
        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={props.fields.PromoIcon} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <Text tag="div">
                  <JssRichText field={props.fields.PromoText} />
                </Text>
              </div>
            </div>
            <div className="field-promolink">
              <Themes theme="a">
                <CardBlog>
                  <a>Test link</a>
                  <Tags>
                    <a href="#">Test tag</a>
                  </Tags>
                </CardBlog>
                <Button size={'small'} theme={'outline'}>
                  <JssLink field={props.fields.PromoLink}>
                    Themed outline button
                  </JssLink>
                </Button>
                <Button size={'small'} theme={'full'}>
                  <JssLink field={props.fields.PromoLink}>
                    Themed full button
                  </JssLink>
                </Button>
              </Themes>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};

export const WithText = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        id={id ? id : undefined}
      >
        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={props.fields.PromoIcon} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <JssRichText
                  className="promo-text"
                  field={props.fields.PromoText}
                />
              </div>
            </div>
            <div className="field-promotext">
              <JssRichText
                className="promo-text"
                field={props.fields.PromoText2}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};
