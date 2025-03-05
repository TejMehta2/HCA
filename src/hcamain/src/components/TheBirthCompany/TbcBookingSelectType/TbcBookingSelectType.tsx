/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Image as JssImage,
  RichText as JssRichText,
  Text as JssText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import HeaderLDB from '@component-library/consultant-finder/HeaderLDB/HeaderLDB';
import ProgressBar from '@component-library/consultant-finder/ProgressBar/ProgressBar';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Icons from '@component-library/foundation/Icons/Icons';
import Container from '@component-library/foundation/Containers/Container';
import Navigation from '@component-library/consultant-finder/Navigation/Navigation';
import SelectAppointmentType from '@component-library/consultant-finder/SelectAppointmentType/SelectAppointmentType';
import Headline from '@component-library/consultant-finder/Headline/Headline';
//import { ConsultantFinderContext } from '../../context/consultantFinderContext';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
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
  //console.log('appointment type', props.fields);
  const id = props.params.RenderingIdentifier;
  // const { selectedTypeOfAppointment, setSelectedTypeOfAppointment } =
  //   useContext(ConsultantFinderContext);

  const router = useRouter();
  const [slug, setSlug] = useState<string>('');
  const [gmcNumber, setGmcNumber] = useState<string>('');
  const [reviewsTotal, setReviewsTotal] = useState<number | null>(null);

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
    const gmcNumber = router?.query?.gmcNumber || '';
    setGmcNumber(gmcNumber.toString());
    // get reviews total number from URL
    const reviewsTotal = router?.query?.reviewsTotal || null;
    setReviewsTotal(Number(reviewsTotal));

    // get type of selected appointment if present in URL
    // const typeOfAppointment = router?.query?.type || null;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

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
                  slug={slug}
                  reviewsTotal={reviewsTotal}
                ></ProgressBar>
              }
            ></HeaderLDB>
            <Headline>
              <Text tag="h1" variation="heading-1">
                <JssText field={props?.fields?.Title}></JssText>
              </Text>
            </Headline>
            <SelectAppointmentType
              iconCard1={
                <SitecoreSvg>
                  {props?.fields?.SonographerIcon?.fields?.SvgMarkup?.value}
                </SitecoreSvg>
              }
              iconCard2={
                <SitecoreSvg>
                  {props?.fields?.ConsultantIcon?.fields?.SvgMarkup?.value}
                </SitecoreSvg>
              }
              titleCard1={props?.fields?.SonographerTitle?.value}
              titleCard2={props?.fields?.ConsultantTitle?.value}
              textCard1={
                <JssRichText field={props?.fields?.SonographerBodyText} />
              }
              textCard2={
                <JssRichText field={props?.fields?.ConsultantBodyText} />
              }
            />
            <Navigation hideTextMobile={true}>
              <div>
                <TextButton>
                  <Link
                    href={`${props?.fields?.BackLink?.value?.href}?slug=${slug}&gmcNumber=${gmcNumber}&reviewsTotal=${reviewsTotal}`}
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
                    onClick={() =>
                      router.push(
                        `${props?.fields?.NextLink?.value?.href}?slug=${slug}&gmcNumber=${gmcNumber}&isConsultant=isConsultant&reviewsTotal=${reviewsTotal}`
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
