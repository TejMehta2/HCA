/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Image as JssImage,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import { ConsultantFinderContext } from '../../context/consultantFinderContext';
import HeaderLDB from '@component-library/consultant-finder/HeaderLDB/HeaderLDB';
import ProgressBar from '@component-library/consultant-finder/ProgressBar/ProgressBar';
import Container from '@component-library/foundation/Containers/Container';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Navigation from '@component-library/consultant-finder/Navigation/Navigation';
import Icons from '@component-library/foundation/Icons/Icons';
import SelectLocation from '@component-library/consultant-finder/SelectLocation/SelectLocation';
import LoaderCF from '@component-library/consultant-finder/LoaderCF/LoaderCF';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import CantFind from '@component-library/consultant-finder/CantFind/CantFind';
import axios from 'axios';
import Headline from '@component-library/consultant-finder/Headline/Headline';

interface Fields {
  HCALogo: ImageField;
  CurrentStep: any;
  Steps: any;
  TitleText: Field<string>;
  CardImage: ImageField;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
  API_C2_GetConsultantDetails_BaseURL: Field<string>;
  CardTimeIcon: any;
  CantFindBannerText: Field<string>;
  CantFindPhoneNumber: Field<string>;
  CantFindIcon: any;
  HeadingText: Field<string>;
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
  const { selectedLocation, setSelectedTypeOfAppointment, setConsultantGUID } =
    useContext(ConsultantFinderContext);
  const id = props.params.RenderingIdentifier;
  //console.log('step location', props.fields);
  const router = useRouter();
  const [slug, setSlug] = useState<string>('');
  const [gmcNumber, setGmcNumber] = useState<number | null>(null);
  const baseURL_C2 =
    props?.fields?.API_C2_GetConsultantDetails_BaseURL?.value ||
    'https:/api/C2/GetLDBConsultantDetails?';
  const [locations, setLocations] = useState([]);
  const [loading, seLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    if (!router.isReady) {
      return;
    }

    // get slug from URL
    const slug = router?.query?.slug || '';
    setSlug(slug.toString());

    // get gmc number from URL
    const gmcNumber = router?.query?.gmcNumber || null;
    setGmcNumber(Number(gmcNumber));

    // get isFollowup from URL
    const isFollowUpAppointment = router?.query?.isFollowOnAppointment || null;
    if (isFollowUpAppointment) {
      setSelectedTypeOfAppointment(isFollowUpAppointment?.toString());
    }

    const requestURL_C2 = `${baseURL_C2}&gmcNumber=${gmcNumber}&isFollowOnAppointment=${isFollowUpAppointment}`;

    //console.log('locations DoctifyURL', requestURL_C2);

    axios
      .get(requestURL_C2)
      .then((res) => {
        console.log('locations results', res);
        seLoading(false);
        setError(false);
        setLocations(res?.data?.availability || []);
        setConsultantGUID(res?.data?.CRMID || '');
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        id={id ? id : undefined}
      >
        {router.isReady && (
          <>
            <HeaderLDB
              logo={<JssImage field={props?.fields?.HCALogo} />}
              progress={
                <ProgressBar
                  currentPage={props?.fields?.CurrentStep?.value}
                  steps={props?.fields?.Steps}
                  slug={slug}
                  gmcNumber={gmcNumber}
                ></ProgressBar>
              }
            ></HeaderLDB>
            <Headline>
              <Text tag="h1" variation="heading-1">
                {props?.fields?.HeadingText?.value ||
                  'Please select a location'}
              </Text>
            </Headline>
            {!loading && !error && (
              <SelectLocation
                locations={locations}
                noLocationsMsg={''}
                icon={
                  <SitecoreSvg>
                    {props?.fields?.CardTimeIcon?.fields?.SvgMarkup?.value}
                  </SitecoreSvg>
                }
              />
            )}
            {loading && <LoaderCF loadingMsg={'Loading...'} />}
            {!loading && error && (
              <div>There was an error, please try again</div>
            )}
            {props?.fields?.CantFindPhoneNumber?.value && !loading && (
              <CantFind
                title={
                  <Text tag="p" variation="body-medium-large">
                    {props?.fields?.CantFindBannerText?.value}
                  </Text>
                }
              >
                <TextButton>
                  <a
                    href={`tel:${props?.fields?.CantFindPhoneNumber?.value.replace(
                      /\s/g,
                      ''
                    )}`}
                  >
                    <SitecoreSvg>
                      {props?.fields?.CantFindIcon?.fields?.SvgMarkup?.value}
                    </SitecoreSvg>
                    <span>{props?.fields?.CantFindPhoneNumber?.value}</span>
                  </a>
                </TextButton>
              </CantFind>
            )}
            <Navigation>
              <div>
                <TextButton>
                  <Link
                    href={`${props?.fields?.BackLink?.value?.href}?slug=${slug}&gmcNumber=${gmcNumber}`}
                  >
                    <Icons iconName="iconArrowSmallLeft" />
                    <span>{props.fields.BackLink.value.text || 'Back'}</span>
                  </Link>
                </TextButton>
              </div>
              <Container>
                <Button size={'small'} variation={'full-dark'}>
                  <button
                    disabled={selectedLocation.length === 0 ? true : false}
                    onClick={() =>
                      router.push(
                        `${
                          props?.fields?.NextLink?.value?.href ||
                          '/Finder/Step-Slot-Select'
                        }?slug=${slug}&gmcNumber=${gmcNumber}`
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
          </>
        )}
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
