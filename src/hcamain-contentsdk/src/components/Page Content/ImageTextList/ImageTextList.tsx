import { type JSX } from 'react';
import { ComponentWithContextProps } from 'lib/component-props';
/* eslint-disable prettier/prettier */

import {
  Field,
  ImageField,
  Text as JssText,
  RichText as JssRichText,} from '@sitecore-content-sdk/nextjs';
import Params from 'src/types/params';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import Accreditations from '@component-library/careers/Accreditations/Accreditations';
import Themes from '@component-library/foundation/Themes/Themes';
import { inPageNavGlobalStore } from 'src/context/inPageNavGlobalStorage';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';

type HCAIconFields = {
  SvgMarkup?: Field<string>;
  SvgMarkup48?: Field<string>;
};

interface CardFields {
  fields?: {
    Title?: Field<string>;
    Text?: Field<string>;
    Image?: ImageField;
    Icon?: {
      fields: HCAIconFields;
    };
  };
}

interface Fields {
  Cards?: CardFields[];
}

type ImageTextListProps = ComponentWithContextProps & {
  params?: Params;
  fields?: Fields;
};

const ImageTextListDefaultComponent = (
  props: ImageTextListProps
): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            ImageTextList. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

interface ImageTextListColumnsProps extends ImageTextListProps {
  columns: 2 | 3;
}

export const Default = (props: ImageTextListColumnsProps): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;
  const { columns = 2 } = props;

  if (!props.fields) {
    return <ImageTextListDefaultComponent {...props} />;
  }

  if (!props.fields?.Cards?.length && !isExperienceEditor) {
    return <></>;
  }

  const componentAnchorId = inPageNavGlobalStore.addItem(props?.params, '');

  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  const centered =
    props?.params?.styles?.split(' ').indexOf('position-center') !== -1;

  return (
    <Themes
      theme={props.params?.Theme || 'B-HCA-Navy-Blue'}
      id={componentAnchorId}
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
    >
      <Accreditations
        columns={columns}
        contentVariation={centered ? 'centered' : undefined}
        items={
          props.fields?.Cards?.map((cards) => ({
            text: <JssRichText tag={'div'} field={cards?.fields?.Text} />,
            title: <JssText tag={'span'} field={cards.fields?.Title} />,
            logo: (
              <NextJssImage
                field={cards?.fields?.Image}
                editable={false}
                next={{
                  width: 643,
                  height: 605,
                }}
              />
            ),
          })) || []
        }
      />
    </Themes>
  );
};

export const ThreeColumns = (props: ImageTextListColumnsProps): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;

  if (!props.fields) {
    return <ImageTextListDefaultComponent {...props} />;
  }

  if (!props.fields?.Cards?.length && !isExperienceEditor) {
    return <></>;
  }

  const componentAnchorId = inPageNavGlobalStore.addItem(props?.params, '');
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;
  const leftAlign =
    props?.params?.styles &&
    props?.params?.styles?.split(' ').indexOf('position-left') !== -1;

  return (
    <Themes
      theme={props.params?.Theme || 'B-HCA-Navy-Blue'}
      id={componentAnchorId}
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
    >
      <Accreditations
        columns={3}
        contentVariation={leftAlign ? undefined : 'centered'}
        items={
          props.fields?.Cards?.map((cards) => ({
            text: <JssRichText tag={'div'} field={cards?.fields?.Text} />,
            title: <JssText tag={'span'} field={cards.fields?.Title} />,
            logo: (
              <SitecoreSvg>
                {cards.fields?.Icon?.fields.SvgMarkup48?.value}
              </SitecoreSvg>
            ),
          })) || []
        }
      />
    </Themes>
  );
};
