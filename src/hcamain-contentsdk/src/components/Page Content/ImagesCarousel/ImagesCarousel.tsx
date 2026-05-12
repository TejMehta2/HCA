/* eslint-disable prettier/prettier */
import React from 'react';
import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import CarouselImages from '@component-library/careers/CarouselImages/CarouselImages';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';

interface ImageCardFields {
  image?: { jsonValue: ImageField };
}

interface Fields {
  data?: {
    item?: {
      images?: {
        targetItems?: ImageCardFields[];
      };
    };
  };
}

export type ImagesCarouselProps = {
  params?: Params;
  fields?: Fields;
  dataSource: string;
};

const ImagesCarouselDefaultComponent = (
  props: ImagesCarouselProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          Images Carousel. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

interface EqualSizeProps extends ImagesCarouselProps {
  equalSize: boolean;
}

export const Default = (props: EqualSizeProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  const isExperienceEditor = sitecoreContext?.pageEditing;
  const { equalSize = false } = props;
  const variation = equalSize ? 'equalSize' : undefined;

  if (!props.fields?.data?.item) {
    return <ImagesCarouselDefaultComponent {...props} />;
  }

  if (
    !props.fields?.data?.item?.images?.targetItems?.length &&
    !isExperienceEditor
  ) {
    return <></>;
  }

  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    'Gallery'
  );
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle || 'Gallery';

  return (
    <CarouselImages
      id={componentAnchorId}
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
      contentVariation={variation}
      images={
        props.fields?.data?.item?.images?.targetItems?.map((card, index) => {
          return (
            <NextJssImage
              field={card.image?.jsonValue}
              key={index}
              next={{
                width: 1000,
                height: 1000,
                sizes: '(max-width: 768px) 100vw, 50vw',
              }}
            />
          );
        }) || []
      }
    ></CarouselImages>
  );
};

export const EqualSize = (props: ImagesCarouselProps): JSX.Element => {
  if (!props.fields?.data?.item) {
    return <ImagesCarouselDefaultComponent {...props} />;
  }

  return <Default {...props} equalSize={true} />;
};
