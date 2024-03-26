// Template finder component

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
import HeaderLDB from '@component-library/consultant-finder/HeaderLDB/HeaderLDB';
import ProgressBar from '@component-library/consultant-finder/ProgressBar/ProgressBar';
import SlotsCalendar from '@component-library/consultant-finder/SlotsCalendar/SlotsCalendar';
import { ConsultantFinderContext } from '../../context/consultantFinderContext';
import Navigation from '@component-library/consultant-finder/Navigation/Navigation';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Icons from '@component-library/foundation/Icons/Icons';
import Container from '@component-library/foundation/Containers/Container';
import axios from 'axios';

interface Fields {
  HCALogo: ImageField | ImageFieldValue | undefined;
  CurrentStep: any;
  Steps: any;
  // from the Specific component data template e.g. /sitecore/templates/Project/HCA/Consultant finder/StepSPECIFIC

  // add specific fields defined in the data template here...

  // from the StepCommon template e.g. /sitecore/templates/Project/HCA/Consultant finder/StepCommon
  TitleText: Field<string>;
  CardImage: ImageField;

  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
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
  console.log('steps slot', props.fields);
  const {
    selectedLocation,
    setSelectedTypeOfAppointment,
    setConsultantGUID,
    selectedDate,
    selectedTime,
  } = useContext(ConsultantFinderContext);
  const id = props.params.RenderingIdentifier;
  const router = useRouter();
  const [slug, setSlug] = useState<string>('');
  const [gmcNumber, setGmcNumber] = useState<number | null>(null);

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

    // // get isFollowup from URL
    // const isFollowUpAppointment = router?.query?.isFollowOnAppointment || null;
    // if (isFollowUpAppointment) {
    //   setSelectedTypeOfAppointment(isFollowUpAppointment?.toString());
    // }

    // const requestURL_C2 = `${baseURL_C2}&gmcNumber=${gmcNumber}&isFollowOnAppointment=${isFollowUpAppointment}`;

    // console.log('locations DoctifyURL', requestURL_C2);

    // axios
    //   .get(requestURL_C2)
    //   .then((res) => {
    //     console.log('locations results', res);
    //     seLoading(false);
    //     setError(false);
    //     setLocations(res?.data?.availability || []);
    //     setConsultantGUID(res?.data?.CRMID || '');
    //   })
    //   .catch((error) => {
    //     setError(true);
    //     console.log(error);
    //   });
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
            <SlotsCalendar />
            <Navigation hideTextMobile={true}>
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
              {selectedDate !== '' && selectedTime !== '' && (
                <Text tag="p" variation="body-medium-extra-large">
                  {`Appointment selected on ${selectedDate} at ${selectedTime}`}
                </Text>
              )}
              <Container>
                <Button size={'small'} variation={'full-dark'}>
                  <button
                    disabled={
                      selectedDate === '' && selectedTime === '' ? true : false
                    }
                    onClick={() =>
                      router.push(
                        `${
                          props?.fields?.NextLinks?.value?.href ||
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
