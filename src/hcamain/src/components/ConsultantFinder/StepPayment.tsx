/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component

import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { ConsultantFinderContext } from 'src/context/consultantFinderContext';
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
import ImageAndTextBlock from '@component-library/site-components/ImageAndTextBlock/ImageAndTextBlock';
import SearchPayment from '@component-library/consultant-finder/Search/SearchPayment';
import Navigation from '@component-library/consultant-finder/Navigation/Navigation';
import Checkbox from '@component-library/core-components/Checkbox/Checkbox';
import Icons from '@component-library/foundation/Icons/Icons';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Container from '@component-library/foundation/Containers/Container';

interface Fields {
  // from the Specific component data template e.g. /sitecore/templates/Project/HCA/Consultant finder/StepSPECIFIC

  // add specific fields defined in the data template here...

  // from the StepCommon template e.g. /sitecore/templates/Project/HCA/Consultant finder/StepCommon
  TitleText: Field<string>;
  HeadingText: Field<string>;
  CardImage: ImageField;
  BodyText: Field<string>;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
  SearchIcon: any;
  InsuranceProvidersFilterHeaderText: Field<string>;
  InsurersList: any;
  API_Insurance_BaseURL: Field<string>;
  API_Insurance_NoResultsMsg: Field<string>;
  API_Insurance_Limit: Field<string>;
  API_Insurance_LoadingMsg: Field<string>;
  SearchPlaceholderText: Field<string>;
  SelfPayCheckBoxText: Field<string>;
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
  const router = useRouter();
  const {
    searchStringPayment,
    setSearchStringPayment,
    setIsSelfPayment,
    isSelfPayment,
  } = useContext(ConsultantFinderContext);
  console.log('payment', props);

  // tbc
  // useEffect(() => {
  //   // Check if the 'test' query parameter is empty or not present
  //   const isTestParamEmpty =
  //     !router.query.keywordId || !router.query.searchString;

  //   // If 'test' query parameter is empty, redirect to '/Finder/Step-Intro'
  //   if (isTestParamEmpty) {
  //     router.push('/Finder/Step-Intro');
  //   }
  // }, [router.query.keywordId, router.query.searchString]);
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        id={id ? id : undefined}
      >
        <ImageAndTextBlock
          theme="F-HCA-White"
          imageAlignment="left"
          length="short"
          subheader={
            <Text tag="h3" variation="subheading-1">
              <JssRichText field={props.fields.HeadingText} />
            </Text>
          }
          header={
            <Text tag="h2" variation="display-2">
              <JssRichText field={props.fields.TitleText} />
            </Text>
          }
          image={<JssImage field={props.fields.CardImage} />}
        >
          <Text tag="div" variation="body-large">
            <JssRichText field={props.fields.BodyText} />
          </Text>
          <form autoComplete="off">
            <SearchPayment
              placeholder={props.fields.SearchPlaceholderText.value}
              doctifyBaseURL={props.fields.API_Insurance_BaseURL.value}
              limit={Number(props.fields.API_Insurance_Limit.value)}
              noResultsMsg={props.fields.API_Insurance_NoResultsMsg.value}
              searchIcon={props.fields.SearchIcon.fields.SvgMarkup.value}
              searchStringPayment={searchStringPayment}
              setSearchStringPayment={setSearchStringPayment}
              insuranceProvidersFilterHeaderText={
                props.fields.InsuranceProvidersFilterHeaderText.value
              }
              insurersList={props.fields.InsurersList}
              loadingText={props.fields.API_Insurance_LoadingMsg.value}
            />

            <Container marginTop="spacing-8" marginBottom="spacing-4">
              <Text tag="h2" variation="heading-2">
                {props.fields.TitleText.value}
              </Text>
            </Container>

            <Checkbox
              id="1"
              label={props.fields.SelfPayCheckBoxText.value}
              name="selfpayment"
              value="selfpayment"
              checked={isSelfPayment}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.checked) {
                  setSearchStringPayment('');
                }
                setIsSelfPayment(e.target.checked);
              }}
            ></Checkbox>
          </form>
        </ImageAndTextBlock>
        <Navigation>
          <TextButton>
            <JssLink field={props.fields.BackLink}>
              <Icons iconName="iconArrowSmallLeft" />
              {props.fields.BackLink.value.text}
            </JssLink>
          </TextButton>

          <Button size={'small'} theme={'full-dark'}>
            <button
              disabled={
                searchStringPayment === '' && !isSelfPayment ? true : false
              }
              onClick={() =>
                router.push(
                  props.fields.NextLink.value.href || '/Finder/Step-Locations'
                )
              }
            >
              <span>{props.fields.NextLink.value.text}</span>
            </button>
          </Button>
        </Navigation>
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
