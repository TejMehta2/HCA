/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component
// Based on src\hcamain\src\components\ConsultantFinder\StepLocationSelect.tsx

import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Image as JssImage,
  ImageField,
  Field,
  LinkField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import HeaderLDB from '@component-library/consultant-finder/HeaderLDB/HeaderLDB';
import ProgressBar from '@component-library/consultant-finder/ProgressBar/ProgressBar';
import Container from '@component-library/foundation/Containers/Container';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Navigation from '@component-library/consultant-finder/Navigation/Navigation';
import Icons from '@component-library/foundation/Icons/Icons';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import CantFind from '@component-library/consultant-finder/CantFind/CantFind';
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

const StepDefaultComponent = (props: StepProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            TBC Booking Select Location Step
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: StepProps): JSX.Element => {
  // const {
  //   selectedLocation,
  //   setSelectedTypeOfAppointment,
  //   setConsultantGUID,
  //   setHcaConsultantID,
  //   setConsultantName,
  //   setConsultantMainSpecialty,
  // } = useContext(ConsultantFinderContext);
  const id = props.params.RenderingIdentifier;
  //console.log('step location', props.fields);
  const router = useRouter();

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
                ></ProgressBar>
              }
            ></HeaderLDB>
            <Headline>
              <Text tag="h1" variation="heading-1">
                {props?.fields?.HeadingText?.value ||
                  'Please select a location'}
              </Text>
            </Headline>

            {props?.fields?.CantFindPhoneNumber?.value && (
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
                  <Link href={`${props?.fields?.BackLink?.value?.href}`}>
                    <Icons iconName="iconArrowSmallLeft" />
                    <span>{props.fields.BackLink.value.text || 'Back'}</span>
                  </Link>
                </TextButton>
              </div>
              <Container>
                <Button size={'small'} variation={'full-dark'}>
                  <button
                    // disabled={selectedLocation.length === 0 ? true : false}
                    onClick={() =>
                      router.push(`${props?.fields?.NextLink?.value?.href}`)
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
