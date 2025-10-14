/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
// import Link from 'next/link';
import axios from 'axios';
import {
  Image as JssImage,
  Text as JssText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import HeaderLDB from '@component-library/consultant-finder/HeaderLDB/HeaderLDB';
import ProgressBar from '@component-library/the-birth-company/ProgressBar/ProgressBar';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Icons from '@component-library/foundation/Icons/Icons';
// import Container from '@component-library/foundation/Containers/Container';
// import Navigation from '@component-library/consultant-finder/Navigation/Navigation';
import Headline from '@component-library/consultant-finder/Headline/Headline';
// import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
// import LocationCardBlock from '@component-library/the-birth-company/LocationCardBlock/LocationCardBlock';
// import LocationCard from '@component-library/the-birth-company/LocationCard/LocationCard';
// import CantFind from '@component-library/consultant-finder/CantFind/CantFind';

import {
  TheBirthCompanyContext,
  TheBirthCompanyContextProvider,
} from '@component-library/context/theBirthCompanyContext';
import LoaderCF from '@component-library/consultant-finder/LoaderCF/LoaderCF';
import BookingTypeCards from 'temp/component-library/the-birth-company/BookingTypeCards/BookingTypeCards';
interface Fields {
  HCALogo: ImageField;
  CurrentStep: any;
  Steps: any;
  SonographerIcon: any;
  SonographerTitle: Field<string>;
  SonographerBodyText: Field<string>;
  ConsultantTitle: Field<string>;
  ConsultantIcon: any;
  ConsultantBodyText: Field<string>;
  Title: Field<string>;
  CardImage: ImageField;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
  BodyText: Field<string>;
  CantFindBannerText: Field<string>;
  CantFindPhoneNumber: Field<string>;
  CantFindIcon: any;
  servicesFolder: {
    id: string;
  };
}

type StepProps = {
  params: { [key: string]: string };
  fields: Fields;
};

interface TypeFields {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
}

const StepDefaultComponent = (props: StepProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Consultant Finder Step</span>
    </div>
  </div>
);

export const Default = (props: StepProps): JSX.Element => {
  return (
    <TheBirthCompanyContextProvider>
      <TbcLocations {...props} />
    </TheBirthCompanyContextProvider>
  );
};

export const TbcLocations = (props: StepProps): JSX.Element => {
  const { selectedTypeOfAppointment, setSelectedTypeOfAppointment } =
    useContext(TheBirthCompanyContext);

  const id = props.params.RenderingIdentifier;
  const router = useRouter();
  const [appointmentTypes, setAppointmentTypes] = useState<TypeFields[]>([]);
  const [loading, seLoading] = useState(true);
  const [error, setError] = useState(false);

  console.log(appointmentTypes);

  const searchParams = useSearchParams();

  const paramTypeId = searchParams.get('typeId');
  const configurationId = props.fields.servicesFolder.id;

  // Set params for next page
  const nextPageParams = new URLSearchParams(searchParams.toString());
  if (selectedTypeOfAppointment) {
    nextPageParams.set('typeId', selectedTypeOfAppointment);
  }

  useEffect(() => {
    if (paramTypeId) {
      setSelectedTypeOfAppointment(paramTypeId);
    }
  }, [paramTypeId, setSelectedTypeOfAppointment]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    if (!router.isReady) {
      return;
    }

    const paramScanId = searchParams.get('scanId');
    const paramExtras = searchParams.getAll('extraId');
    const paramLocationId = searchParams.get('locationId');

    //  if any required params are missing redirect back to the start of the journey
    if (!paramScanId || !paramLocationId) {
      router.push('/booking');
    }

    const extras = paramExtras.map((extra) => `&extraId=${extra}`).join('');

    const requestURL = `${process.env.NEXT_PUBLIC_INTEGRATION_LAYER_PROXY_PATH}/tbcbooking/types?scanid=${paramScanId}&locationid=${paramLocationId}&configurationid=${configurationId}${extras}`;

    axios
      .get(requestURL)
      .then((res) => {
        // console.log('res', res);
        seLoading(false);
        setError(false);
        setAppointmentTypes(res?.data || []);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  }, [router, router.isReady, searchParams]);

  const DUMMY_CTAS = [
    {
      title: <span>Consultant obstetrician</span>,
      copy: (
        <span>
          Text explaining what that appointment would involve and why choose a
          consultant obstetrician.
        </span>
      ),
      cta: (
        <Button size="small" variation="full">
          <a href="https://www.hcahealthcare.co.uk/finder/step-consultant-cards?search=Obstetrics&keywordId=2773&sortType=relevance&lat=51.507217&lon=-0.1275862&distance=0&limit=12&offset=0">
            <span>
              <Icons iconName="iconCalendar" />
            </span>
            <span>Find a consultant</span>
          </a>
        </Button>
      ),
    },
    {
      title: <span>Sonographer</span>,
      copy: (
        <span>
          Text explaining what that appointment would involve and why choose a
          consultant obstetrician.
        </span>
      ),
      cta: (
        <Button size="small" variation="full">
          <a href="#">
            <span>
              <Icons iconName="iconCalendar" />
            </span>
            <span>Book a scan</span>
          </a>
        </Button>
      ),
    },
    {
      title: <span>Consultant gynaecologists</span>,
      copy: (
        <span>
          Text explaining what that appointment would involve and why choose a
          consultant obstetrician.
        </span>
      ),
      cta: (
        <Button size="small" variation="full">
          <a href="https://www.hcahealthcare.co.uk/finder/step-consultant-cards?search=Gynaecology&keywordId=2998&sortType=relevance&lat=51.507217&lon=-0.1275862&distance=0&limit=12&offset=0">
            <span>
              <Icons iconName="iconCalendar" />
            </span>
            <span>Find a consultant</span>
          </a>
        </Button>
      ),
    },
    {
      title: <span>Midwife</span>,
      copy: (
        <span>
          Text explaining what that appointment would involve and why choose a
          consultant obstetrician.
        </span>
      ),
      cta: (
        <>
          <Text variation="body-bold-small" tag="p">
            Call to book below:
          </Text>
          <TextButton>
            <a
              href={`tel:${props?.fields?.CantFindPhoneNumber?.value.replace(
                /\s/g,
                ''
              )}`}
            >
              <Icons iconName="iconPhone" />
              Hale: {props?.fields?.CantFindPhoneNumber?.value}
            </a>
          </TextButton>
        </>
      ),
    },
    {
      title: <span>Consultant</span>,
      copy: (
        <span>
          Text explaining what that appointment would involve and why choose a
          consultant obstetrician.
        </span>
      ),
      cta: (
        <Button size="small" variation="full">
          <a href="#">
            <span>
              <Icons iconName="iconCalendar" />
            </span>
            <span>Book a scan</span>
          </a>
        </Button>
      ),
    },
  ];

  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        id={id ? id : undefined}
      >
        {router.isReady && (
          <div className="component-content">
            <HeaderLDB
              logo={<JssImage field={props?.fields?.HCALogo} />}
              progress={
                <ProgressBar
                  currentPage={props?.fields?.CurrentStep?.value}
                  steps={props?.fields?.Steps}
                ></ProgressBar>
              }
            ></HeaderLDB>
            <Headline>
              <Text tag="h1" variation="heading-1">
                <JssText field={props?.fields?.Title}></JssText>
              </Text>
            </Headline>
            {loading && <LoaderCF />}
            {!loading && !error && (
              <BookingTypeCards cards={DUMMY_CTAS} />
              // <LocationCardBlock
              //   cta={
              //     props?.fields?.CantFindPhoneNumber?.value && (
              //       <CantFind
              //         contentVariation="the-birth-company"
              //         title={
              //           <Text tag="p" variation="body-medium-large">
              //             {props?.fields?.CantFindBannerText?.value}
              //           </Text>
              //         }
              //       >
              //         <TextButton>
              //           <a
              //             href={`tel:${props?.fields?.CantFindPhoneNumber?.value.replace(
              //               /\s/g,
              //               ''
              //             )}`}
              //           >
              //             <SitecoreSvg>
              //               {
              //                 props?.fields?.CantFindIcon?.fields?.SvgMarkup
              //                   ?.value
              //               }
              //             </SitecoreSvg>
              //             <span>
              //               {props?.fields?.CantFindPhoneNumber?.value}
              //             </span>
              //           </a>
              //         </TextButton>
              //       </CantFind>
              //     )
              //   }
              // >
              //   <>
              //     {appointmentTypes.map((appointmentType, index) => (
              //       <LocationCard
              //         key={index}
              //         contentVariation="appointmentType"
              //         selected={
              //           selectedTypeOfAppointment === appointmentType.id
              //         }
              //         name={
              //           <Text variation="body-bold-large">
              //             {appointmentType.name}
              //           </Text>
              //         }
              //         description={
              //           appointmentType.description ? (
              //             <Text variation="body-small">
              //               {appointmentType.description}
              //             </Text>
              //           ) : undefined
              //         }
              //         handleClick={() => {
              //           setSelectedTypeOfAppointment(appointmentType.id);
              //         }}
              //       >
              //         {appointmentType.duration && (
              //           <span>
              //             <Icons iconName="iconClock" />
              //             <Text variation="body-small" tag="p">
              //               {appointmentType.duration}
              //             </Text>
              //           </span>
              //         )}
              //         {appointmentType.price && (
              //           <span>
              //             <Icons iconName="iconCreditCard" />
              //             <Text variation="body-small" tag="p">
              //               {appointmentType.price}
              //             </Text>
              //           </span>
              //         )}
              //       </LocationCard>
              //     ))}
              //   </>
              // </LocationCardBlock>
            )}
            {/* <Navigation hideTextMobile={true}>
              <div>
                <TextButton>
                  <Link
                    href={`${
                      props?.fields?.BackLink?.value?.href
                    }?${searchParams.toString()}`}
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
                    disabled={
                      selectedTypeOfAppointment.length === 0 ? true : false
                    }
                    onClick={() =>
                      router.push(
                        `${
                          props?.fields?.NextLink?.value?.href
                        }?${nextPageParams.toString()}`
                      )
                    }
                  >
                    <span>
                      {props?.fields?.NextLink?.value?.text || 'Next'}
                    </span>
                  </button>
                </Button>
              </Container>
            </Navigation> */}
          </div>
        )}
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
