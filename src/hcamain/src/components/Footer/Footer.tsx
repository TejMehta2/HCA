import React from 'react';
import {
  Image as JssImage,
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
  Link as JssLink,
  Text as JssText,
  Placeholder,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Footer from '@component-library/components/Footer/Footer';
import Icons from '@component-library/foundation/Icons/Icons';
import CQCBlock from '@component-library/components/CQCBlock/CQCBlock';
import {
  Foundation,
  Navigation,
} from '.GeneratedTypeScriptModel/Project.HCA.model';

type FooterProps = Navigation.Footer & {
  params: { [key: string]: string };
  rendering: ComponentRendering & { params: { [key: string]: string } };
};

const FooterDefaultComponent = (props: FooterProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Empty Footer</span>
    </div>
  </div>
);

export const Default = (props: FooterProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const bottomLineLinks: Navigation.NavigationLinksList = props.fields
    ?.BottomLineLinksFolder as Navigation.NavigationLinksList;

  const phKey = `cta-buttons-${props.params.DynamicPlaceholderId}`;

  const cqc = props.fields?.CqcStatus as Foundation.Cqc.Cqc;
  const reviews = [
    {
      reviews: [
        <CQCBlock
          link={<a href="#">CQCBlock</a>}
          key="1"
          title={cqc.fields?.Title?.value}
          text={cqc.fields?.Text?.value}
          icon={<Icons iconName="{iconCheckCircle}"></Icons>}
          logo={{
            dark: (
              <JssImage
                src="/cqc-white.png"
                alt="cqc logo"
                width="120"
                height="37"
              />
            ),
            light: (
              <JssImage
                src="/cqc-color.png"
                alt="cqc logo"
                width="120"
                height="37"
              />
            ),
          }}
        />,
      ],
    },
  ];

  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        id={id ? id : undefined}
      >
        <Placeholder name={phKey} rendering={props.rendering} />
        <Footer
          buttons={[]}
          legals={(bottomLineLinks.fields?.Links || []).map((_item, _index) => {
            const link = _item as Navigation.NavigationLink;
            return <JssLink field={link.fields?.Link} key={_index}></JssLink>;
          })}
          columns={(props.fields?.NavigationColumnsFolders || []).map(
            (_item, _index) => {
              const linksColumn = _item as Navigation.NavigationLinksList;
              console.log(_index, linksColumn.fields?.Title);
              return {
                title: <JssText field={linksColumn.fields?.Title}></JssText>,
                links: (linksColumn.fields?.Links || []).map(
                  (_item, _index) => (
                    <JssLink
                      field={(_item as Navigation.NavigationLink).fields?.Link}
                      key={_index}
                    ></JssLink>
                  )
                ),
              };
            }
          )}
        />
      </div>
    );
  }

  return <FooterDefaultComponent {...props} />;
};
