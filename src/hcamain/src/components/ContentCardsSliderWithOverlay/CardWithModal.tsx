import React, { useRef } from 'react';
import {
  Text as JssText,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CardContent from '@component-library/components/CardContent/CardContent';
import getSubheadingTag from 'lib/subheading-tag-getter';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import ModalImageShortText from '@component-library/careers/ModalImageShortText/ModalImageShortText';
import RichText from '@component-library/core-components/RichText/RichText';
import { PagesFields, WithImageProps } from './ContentCardsSliderWithOverlay';
import Text from '@component-library/foundation/Text/Text';

interface CardWithModalProps extends WithImageProps {
  cards: PagesFields;
}

const CardWithModal = (props: CardWithModalProps) => {
  const { showImage = true, cards } = props;
  const modalRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <CardContent
        image={
          showImage ? (
            <NextJssImage
              field={cards.image?.jsonValue}
              editable={false}
              next={{
                width: 500,
                height: 400,
                sizes: '(max-width: 768px) 100vw, 30vw',
              }}
            />
          ) : undefined
        }
        title={
          <Text
            tag={getSubheadingTag(props.params?.HeadingTag, 'h3')}
            variation="heading-1"
          >
            <JssText field={cards.title} />
          </Text>
        }
        bodyCopy={
          cards?.text ? (
            <Text tag="p" variation="body-large">
              <JssRichText tag="span" field={cards.text} />
            </Text>
          ) : undefined
        }
        link={
          <>
            <button
              onClick={() => {
                modalRef?.current?.showModal?.();
              }}
            >
              <JssRichText
                tag="div"
                field={props.fields?.data?.item?.cTACardText?.jsonValue}
              />
            </button>
          </>
        }
      />
      <ModalImageShortText
        ref={modalRef}
        subheader={
          <Text variation={'subheading-1'}>
            <JssText tag={'p'} field={cards?.overlayHeading} />
          </Text>
        }
        header={
          <Text variation={'display-2'}>
            <JssText tag={'p'} field={cards?.overlayTitle} />
          </Text>
        }
        image={
          cards?.overlayImage?.jsonValue?.value ? (
            <NextJssImage
              field={cards?.overlayImage?.jsonValue}
              next={{
                width: 1000,
                height: 1000,
                sizes: '(max-width: 768px) 100vw, 30vw',
              }}
            />
          ) : undefined
        }
        copy={
          <RichText>
            <JssRichText tag={'div'} field={cards?.overlayText} />
          </RichText>
        }
      />
    </>
  );
};

export default CardWithModal;
