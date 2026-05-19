/* eslint-disable */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component

'use client';

import { type JSX } from 'react';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Image as JssImage,
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import TermsConditionsCards from '@component-library/consultant-finder/TermsConditionsCards/TermsConditionsCards';
import InfoBox from '@component-library/consultant-finder/InfoBox/InfoBox';
import Navigation from '@component-library/consultant-finder/Navigation/Navigation';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Icons from '@component-library/foundation/Icons/Icons';
import HeaderLDB from '@component-library/consultant-finder/HeaderLDB/HeaderLDB';
import Container from '@component-library/foundation/Containers/Container';
import ProgressBar from '@component-library/consultant-finder/ProgressBar/ProgressBar';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import Headline from '@component-library/consultant-finder/Headline/Headline';
import { getQueryValue } from './routeQuery';

interface Fields {
  // from the Specific component data template e.g. /sitecore/templates/Project/HCA/Consultant finder/StepSPECIFIC
  // add specific fields defined in the data template here...
  // from the StepCommon template e.g. /sitecore/templates/Project/HCA/Consultant finder/StepCommon
  TitleText: Field<string>;
  CardImage: ImageField;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
  HCALogo: ImageField;
  Steps: object[];
  CurrentStep: any;
  AcceptInstructionsText: Field<string>;
  Card1Icon: any;
  Card1HeadingText: Field<string>;
  Card1BodyText: Field<string>;
  Card2Icon: any;
  Card2HeadingText: Field<string>;
  Card2BodyText: Field<string>;
  Card3Icon: any;
  Card3HeadingText: Field<string>;
  Card3BodyText: Field<string>;
  Card4Icon: any;
  Card4HeadingText: Field<string>;
  Card4BodyText: Field<string>;
  AcceptButtonText: Field<string>;
}

type StepProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const StepDefaultComponent = (props: StepProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Consultant Finder Step</span>
    </div>
  </div>
);

export const Default = (props: StepProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  //console.log(props.fields);
  const searchParams = useSearchParams();
  const [slug, setSlug] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [keywordId, setKeywordId] = useState<string>('');
  const [gmcNumber, setGmcNumber] = useState<string>('');
  const [reviewsTotal, setReviewsTotal] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // get search from URL
    setSearch(getQueryValue(searchParams, 'search'));
    // get keywordId from URL
    setKeywordId(getQueryValue(searchParams, 'keywordId'));
    // get slug from URL
    setSlug(getQueryValue(searchParams, 'slug'));
    // get name from URL
    setName(getQueryValue(searchParams, 'name'));
    // get gmc number from URL
    setGmcNumber(getQueryValue(searchParams, 'gmcNumber'));
    // get reviews total number from URL
    const reviewsTotal = searchParams.get('reviewsTotal');
    setReviewsTotal(Number(reviewsTotal));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (props.fields) {
    return (
      <div id={id ? id : undefined}>
        {(
          <div className="component-content">
            <HeaderLDB
              logo={<JssImage field={props?.fields?.HCALogo} />}
              progress={
                <ProgressBar
                  currentPage={props?.fields?.CurrentStep?.value}
                  steps={props?.fields?.Steps}
                  reviewsTotal={reviewsTotal}
                  name={name}
                ></ProgressBar>
              }
            ></HeaderLDB>
            <Headline>
              <Text tag="h1" variation="heading-1">
                {'A few important things to know before you book'}
              </Text>
            </Headline>
            {/* <Headline
              withConsultantName={true}
              backLinkProfile={`${props?.fields?.BackLink?.value?.href &&
                props?.fields?.BackLink?.value?.href.replace(/,-w-,/g, '')
                }${slug}`}
              backLink={props?.fields?.BackLink?.value?.href}
              headingText={'A few important things to know before you book'}
              backLinkText={props.fields.BackLink.value.text || 'Back'}
              search={search}
              keywordId={keywordId}
            >
            </Headline> */}
            <TermsConditionsCards
              acceptBtn={null}
            >
              <InfoBox
                backgroundColour="turquoise"
                icon={
                  <SitecoreSvg>
                    {props?.fields?.Card1Icon?.fields?.SvgMarkup?.value}
                  </SitecoreSvg>
                }
                isShortInfo={false}
                longText={<JssRichText field={props?.fields?.Card1BodyText} />}
                longTextTitle={props.fields.Card1HeadingText.value}
                paddingLarge={true}
              />
              <InfoBox
                backgroundColour="turquoise"
                icon={
                  <SitecoreSvg>
                    {props?.fields?.Card2Icon?.fields?.SvgMarkup?.value}
                  </SitecoreSvg>
                }
                isShortInfo={false}
                longText={<JssRichText field={props?.fields?.Card2BodyText} />}
                longTextTitle={props.fields.Card2HeadingText.value}
                paddingLarge={true}
              />
              <InfoBox
                backgroundColour="turquoise"
                icon={
                  <SitecoreSvg>
                    {props?.fields?.Card3Icon?.fields?.SvgMarkup?.value}
                  </SitecoreSvg>
                }
                isShortInfo={false}
                longText={<JssRichText field={props?.fields?.Card3BodyText} />}
                longTextTitle={props.fields.Card3HeadingText.value}
                paddingLarge={true}
              />
              <InfoBox
                backgroundColour="turquoise"
                icon={
                  <SitecoreSvg>
                    {props?.fields?.Card4Icon?.fields?.SvgMarkup?.value}
                  </SitecoreSvg>
                }
                isShortInfo={false}
                longText={<JssRichText field={props?.fields?.Card4BodyText} />}
                longTextTitle={props.fields.Card4HeadingText.value}
                paddingLarge={true}
              />
            </TermsConditionsCards>
            <Navigation hideTextMobile={true}>
              <div>
                <TextButton>
                  <Link
                    href={`${props?.fields?.BackLink?.value?.href &&
                      props?.fields?.BackLink?.value?.href.replace(/,-w-,/g, '')
                      }${slug}`}
                  >
                    <Icons iconName="iconArrowSmallLeft" />
                    <span>{props.fields.BackLink.value.text || 'Back'}</span>
                  </Link>
                </TextButton>
              </div>
              <Text tag="p" variation="body-medium-extra-large">
                {props?.fields?.AcceptInstructionsText?.value ||
                  'Please accept to continue.'}
              </Text>
              <Container customBtn={true}>
                <Button variation="full-dark" size="large">
                  <Link
                    href={`${props?.fields?.NextLink?.value?.href ||
                      '/finder/step-appointment-type'
                      }?slug=${slug}&name=${encodeURIComponent(name)}&gmcNumber=${gmcNumber}&reviewsTotal=${reviewsTotal}&search=${search}&keywordId=${keywordId}`}
                  >
                    <span>
                      {props?.fields?.AcceptButtonText?.value || 'Accept'}
                    </span>
                  </Link>
                </Button>
              </Container>
            </Navigation>
          </div>
        )}
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
