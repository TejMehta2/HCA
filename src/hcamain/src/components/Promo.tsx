import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import Themes from '@component-library/foundation/Themes/Themes';
import CardBlog from '@component-library/components/CardBlog/CardBlog';
import Tags from '@component-library/core-components/Tags/Tags';
import Accordions from '@component-library/components/Accordions/Accordions';

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

        <Accordions
          header={
            <Text tag="h3" variation="display-3">
              Hip Pain FAQ
            </Text>
          }
          accordions={[
            {
              title:
                'How long will I have to wait to book a hip pain appointment?',
              children: (
                <p>
                  Eiusmod irure nostrud culpa veniam nisi incididunt nostrud
                  commodo deserunt anim quis cupidatat irure duis. Eu voluptate
                  pariatur non. Elit dolore consequat veniam et. Eiusmod
                  consectetur sit dolor laborum excepteur laborum quis.
                </p>
              ),
            },
            {
              title:
                'How long will I have to wait to book a hip pain appointment?',
              children: (
                <p>
                  Eiusmod irure nostrud culpa veniam nisi incididunt nostrud
                  commodo deserunt anim quis cupidatat irure duis. Eu voluptate
                  pariatur non. Elit dolore consequat veniam et. Eiusmod
                  consectetur sit dolor laborum excepteur laborum quis.
                </p>
              ),
            },
            {
              title:
                'How long will I have to wait to book a hip pain appointment?',
              children: (
                <p>
                  Eiusmod irure nostrud culpa veniam nisi incididunt nostrud
                  commodo deserunt anim quis cupidatat irure duis. Eu voluptate
                  pariatur non. Elit dolore consequat veniam et. Eiusmod
                  consectetur sit dolor laborum excepteur laborum quis.
                </p>
              ),
            },
          ]}
          cta={<button>View all FAQs</button>}
        ></Accordions>
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
