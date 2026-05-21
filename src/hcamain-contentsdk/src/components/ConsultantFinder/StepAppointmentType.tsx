/* eslint-disable */
/* @typescript-eslint/no-explicit-any */
// Template finder component
'use client';

import { type JSX, Suspense } from 'react';
import React, { useEffect, useState, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Image as JssImage,
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import Button from '@component-library/core-components/Button/Button';
import HeaderLDB from '@component-library/consultant-finder/HeaderLDB/HeaderLDB';
import ProgressBar from '@component-library/consultant-finder/ProgressBar/ProgressBar';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Icons from '@component-library/foundation/Icons/Icons';
import Container from '@component-library/foundation/Containers/Container';
import Navigation from '@component-library/consultant-finder/Navigation/Navigation';
import SelectAppointmentType from '@component-library/consultant-finder/SelectAppointmentType/SelectAppointmentType';
import Headline from '@component-library/consultant-finder/Headline/Headline';
import { ConsultantFinderContext } from '@component-library/context/consultantFinderContext';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import { getQueryValue } from './routeQuery';
interface Fields {
  HCALogo: ImageField;
  CurrentStep: any;
  Steps: any;
  InitialAppointmentLink: LinkField;
  InitialAppointmentIcon: any;
  InitialAppointmentBodyText: Field<string>;
  FollowOnAppointmentLink: LinkField;
  FollowUpAppointmentIcon: any;
  FollowUpAppointmentBodyText: Field<string>;
  TitleText: Field<string>;
  CardImage: ImageField;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
  BodyText: Field<string>;
  ResultsLink: Field<string>;
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

const DefaultContent = (props: StepProps): JSX.Element => {
  //console.log('appointment type', props.fields);
  const id = props.params.RenderingIdentifier;
  const { selectedTypeOfAppointment, setSelectedTypeOfAppointment } =
    useContext(ConsultantFinderContext);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [slug, setSlug] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [keywordId, setKeywordId] = useState<string>('');
  const [gmcNumber, setGmcNumber] = useState<string>('');
  const [reviewsTotal, setReviewsTotal] = useState<number | null>(null);
  const [isSelected, setIsSelected] = useState('');

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

    // get type of selected appointment if present in URL
    const typeOfAppointment = searchParams.get('isFollowOnAppointment');
    if (typeOfAppointment) {
      setSelectedTypeOfAppointment(typeOfAppointment.toString());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        id={id ? id : undefined}
      >
        {(
          <div className="component-content">
            <HeaderLDB
              logo={<JssImage field={props?.fields?.HCALogo} />}
              progress={
                <ProgressBar
                  currentPage={props?.fields?.CurrentStep?.value}
                  steps={props?.fields?.Steps}
                  slug={slug}
                  reviewsTotal={reviewsTotal}
                  name={name}
                ></ProgressBar>
              }
            ></HeaderLDB>
            <Headline
              withConsultantName={true}
              name={name}
              slug={slug}
              gmcNumber={gmcNumber}
              reviewsTotal={reviewsTotal || 0}
              backLink={props?.fields?.BackLink?.value?.href}
              headingText={props?.fields?.BodyText?.value ||
                'Please choose a type of appointment'}
              backLinkText={props?.fields?.BackLink?.value?.text || 'Back'}
              resultsLink={props?.fields?.ResultsLink?.value || '/finder/step-consultant-cards'}
              search={search}
              keywordId={keywordId}
            >
            </Headline>
            <SelectAppointmentType
              iconCard1={
                <SitecoreSvg>
                  {
                    props?.fields?.InitialAppointmentIcon?.fields?.SvgMarkup
                      ?.value
                  }
                </SitecoreSvg>
              }
              iconCard2={
                <SitecoreSvg>
                  {
                    props?.fields?.FollowUpAppointmentIcon?.fields?.SvgMarkup
                      ?.value
                  }
                </SitecoreSvg>
              }
              titleCard1={
                props?.fields?.InitialAppointmentLink?.value?.text ||
                'Initial appointment'
              }
              titleCard2={
                props?.fields?.FollowOnAppointmentLink?.value?.text ||
                'Follow up appointment'
              }
              textCard1={
                <JssRichText
                  field={props?.fields?.InitialAppointmentBodyText}
                />
              }
              textCard2={
                <JssRichText
                  field={props?.fields?.FollowUpAppointmentBodyText}
                />
              }
              nextLink={`${props?.fields?.NextLink?.value?.href}?slug=${slug}&name=${encodeURIComponent(name)}&gmcNumber=${gmcNumber}&reviewsTotal=${reviewsTotal}&search=${search}&keywordId=${keywordId}`}
              isSelected={isSelected}
              setIsSelected={setIsSelected}
            />
            <Navigation hideTextMobile={true} showOnMobile={true}>
              <div>
                <TextButton>
                  <Link
                    href={`${props?.fields?.BackLink?.value?.href}?slug=${slug}&name=${encodeURIComponent(name)}&gmcNumber=${gmcNumber}&reviewsTotal=${reviewsTotal}&search=${search}&keywordId=${keywordId}`}
                  >
                    <Icons iconName="iconArrowSmallLeft" />
                    <span>
                      {props?.fields?.BackLink?.value?.text || 'Back'}
                    </span>
                  </Link>
                </TextButton>
              </div>
              <Container>
                <Button size={'small'} variation={'full-dark'}>
                  <button
                    disabled={isSelected ? false : true}
                    onClick={() =>
                      router.push(
                        `${props?.fields?.NextLink?.value?.href}?slug=${slug}&name=${encodeURIComponent(name)}&gmcNumber=${gmcNumber}&isFollowOnAppointment=${selectedTypeOfAppointment}&reviewsTotal=${reviewsTotal}&search=${search}&keywordId=${keywordId}`
                      )
                    }
                  >
                    <span>
                      {props?.fields?.NextLink?.value?.text || 'Next'}
                    </span>
                  </button>
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

export const Default = (props: StepProps): JSX.Element => (
  <Suspense fallback={null}>
    <DefaultContent {...props} />
  </Suspense>
);
