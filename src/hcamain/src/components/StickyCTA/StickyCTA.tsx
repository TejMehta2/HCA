import React, { useRef } from 'react';
import {
  Field,
  Text as JssText,
  RichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Button from '@component-library/core-components/Button/Button';
import ModalAppointment from '@component-library/components/ModalAppointment/ModalAppointment';
import Text from '@component-library/foundation/Text/Text';
import Params from 'src/types/params';
import StickyCTA from '@component-library/site-components/StickyCTA/StickyCTA';
import { ButtonVariationUnionTypes } from '@component-library/core-components/Button/Button.types';
import Link from 'next/link';
import { withKeywordIdIfNeeded } from 'lib/doctify-integration/withKeywordIdIfNeeded';
import { SITECORE_TEMPLATE_IDS } from 'lib/sitecore/templateIds';
import { svgIconFieldsTargetItem } from 'src/types/svgIconFields.GraphQL';

import { DoctifyMappedSitecoreItemWithAncestors } from 'src/types/doctify/doctifyMappingTypes';
import { firstDoctifyMappedSelfOrAncestor } from 'lib/doctify-integration/firstDoctifyMappedSelfOrAncestor';
import { ModalContentFields } from 'src/types/modalContent.GraphQL';
import { firstSelfOrAncestorByTemplate } from 'lib/doctify-integration/firstSelfOrAncestorByTemplate';

interface Fields {
  cTAIcon?: svgIconFieldsTargetItem;
  cTAText?: { jsonValue?: Field<string> };
  desktopCaption?: { jsonValue?: Field<string> };
  modalContent?: { targetItems: ModalContentFields[] };
}

type StickyCTAProps = {
  params?: Params;
  fields?: {
    data: { item: Fields; contextItem: DoctifyMappedSitecoreItemWithAncestors };
  };
};

const StickyCTADefaultComponent = (props: StickyCTAProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Sticky CTA. Please click to select datasource.
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: StickyCTAProps): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  //mapped doctify id - keywordId or practice, depending on page type.
  let doctifyId = undefined;

  //finding any first location page within context page or it's ancestors.
  const locationPageOrFirstParentLocation = firstSelfOrAncestorByTemplate(
    SITECORE_TEMPLATE_IDS.LocationPage,
    props?.fields?.data?.contextItem
  );

  //If there is a result, it means we're in Locations tree where we don't want to inherit doctifyPractice from parent location
  if (locationPageOrFirstParentLocation) {
    doctifyId = locationPageOrFirstParentLocation.doctifyPractice?.value;
  } else {
    //find first page mapped with doctify within context item or it's ancestors
    const firstMappedAncestor = firstDoctifyMappedSelfOrAncestor(
      props?.fields?.data?.contextItem
    );

    //if there was a result with doctifyKeywordId use it
    if (firstMappedAncestor?.type == 'doctifyKeywordId') {
      doctifyId = firstMappedAncestor.value;
    }
  }

  if (!props.fields) {
    return <StickyCTADefaultComponent {...props} />;
  }

  if (!props.fields?.data?.item?.modalContent?.targetItems) return <></>;

  const firstModal = props.fields?.data?.item?.modalContent?.targetItems[0];
  const secondModal = props.fields?.data?.item?.modalContent?.targetItems[1];

  const items = [
    {
      link: firstModal?.primaryCTA,
      icon: firstModal?.primaryCTAIcon,
      buttonVariation: firstModal?.primaryCTAVariant?.name ?? 'full',
    },
    {
      link: firstModal?.secondaryCTA,
      icon: firstModal?.secondaryCTAIcon,
      buttonVariation: firstModal?.secondaryCTAVariant?.name ?? 'outline',
    },
    {
      link: firstModal?.tertiaryCTA,
      icon: firstModal?.tertiaryCTAIcon,
      buttonVariation: firstModal?.tertiaryCTAVariant?.name ?? 'outline',
    },
    {
      link: firstModal?.quaternaryCTA,
      icon: firstModal?.quaternaryCTAIcon,
      buttonVariation: firstModal?.quaternaryCTAVariant?.name ?? 'outline',
    },
  ];

  const items1 = [
    {
      link: secondModal?.primaryCTA,
      icon: secondModal?.primaryCTAIcon,
      buttonVariation: secondModal?.primaryCTAVariant?.name ?? 'full',
    },
    {
      link: secondModal?.secondaryCTA,
      icon: secondModal?.secondaryCTAIcon,
      buttonVariation: secondModal?.secondaryCTAVariant?.name ?? 'outline',
    },
    {
      link: secondModal?.tertiaryCTA,
      icon: secondModal?.tertiaryCTAIcon,
      buttonVariation: secondModal?.tertiaryCTAVariant?.name ?? 'outline',
    },
    {
      link: secondModal?.quaternaryCTA,
      icon: secondModal?.quaternaryCTAIcon,
      buttonVariation: secondModal?.quaternaryCTAVariant?.name ?? 'outline',
    },
  ];

  return (
    <>
      <StickyCTA
        cta={
          props?.fields?.data?.item?.cTAText?.jsonValue && (
            <Button size="large" variation="full">
              <button
                onClick={() => {
                  dialogRef?.current?.showModal();
                }}
              >
                <>
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        props?.fields?.data?.item?.cTAIcon?.targetItem
                          ?.svgMarkup?.value || '',
                    }}
                  ></span>
                  <RichText
                    tag="span"
                    field={props?.fields?.data?.item?.cTAText?.jsonValue}
                  />
                </>
              </button>
            </Button>
          )
        }
      >
        {props.fields.data?.item?.desktopCaption?.jsonValue && (
          <Text variation="heading-1">
            <JssText
              field={props.fields.data?.item?.desktopCaption?.jsonValue}
            />
          </Text>
        )}
      </StickyCTA>

      <ModalAppointment
        ref={dialogRef}
        title1={
          firstModal && (
            <Text variation={'display-4'} tag="h2">
              <JssText field={firstModal.title} />
            </Text>
          )
        }
        copy1={
          firstModal && (
            <Text variation={'body-large'} tag="div">
              <RichText field={firstModal?.text} />
            </Text>
          )
        }
        cta1={
          firstModal && (
            <>
              {items.map(({ link, icon, buttonVariation }, idx) => {
                if (!link?.jsonValue.value.text) return null;

                const optionalCta =
                  (link?.jsonValue.value?.class || '').indexOf(
                    'optionalfinder'
                  ) != -1;

                //hack alert: if here is no doctifyId and CTA has optionalfinder css class - don't render it.
                if (optionalCta && !doctifyId) {
                  return;
                }

                const { href, text } = locationPageOrFirstParentLocation
                  ? withKeywordIdIfNeeded(link.jsonValue, doctifyId, 'practice')
                  : withKeywordIdIfNeeded(
                      link.jsonValue,
                      doctifyId,
                      'keywordId'
                    );

                return (
                  <Button
                    key={idx}
                    size="large"
                    contentVariation="full-width"
                    variation={
                      buttonVariation.toLowerCase() as ButtonVariationUnionTypes
                    }
                  >
                    <Link href={href} target={link?.jsonValue?.value?.target}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: icon?.targetItem?.svgMarkup?.value || '',
                        }}
                      />
                      <RichText tag="span" field={{ value: text }} />
                    </Link>
                  </Button>
                );
              })}
            </>
          )
        }
        title2={
          secondModal && (
            <Text variation={'display-4'} tag="h2">
              <JssText field={secondModal?.title} />
            </Text>
          )
        }
        copy2={
          secondModal && (
            <Text variation={'body-large'} tag="div">
              <JssText field={secondModal?.text} />
            </Text>
          )
        }
        cta2={
          secondModal && (
            <>
              {items1.map(({ link, icon, buttonVariation }, idx) => {
                if (!link?.jsonValue?.value?.text) return null;

                const optionalCta =
                  (link?.jsonValue?.value?.class || '').indexOf(
                    'optionalfinder'
                  ) != -1;

                //hack alert: if here is no doctifyId and CTA has optionalfinder css class - don't render it.
                if (optionalCta && !doctifyId) {
                  return;
                }

                const { href, text } = locationPageOrFirstParentLocation
                  ? withKeywordIdIfNeeded(
                      link?.jsonValue,
                      doctifyId,
                      'practice'
                    )
                  : withKeywordIdIfNeeded(
                      link?.jsonValue,
                      doctifyId,
                      'keywordId'
                    );

                return (
                  <Button
                    key={idx}
                    size="large"
                    contentVariation="full-width"
                    variation={
                      buttonVariation.toLowerCase() as ButtonVariationUnionTypes
                    }
                  >
                    <Link href={href} target={link.jsonValue?.value?.target}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: icon?.targetItem?.svgMarkup?.value || '',
                        }}
                      />
                      <RichText tag="span" field={{ value: text }} />
                    </Link>
                  </Button>
                );
              })}
            </>
          )
        }
      />
    </>
  );
};
