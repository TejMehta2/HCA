// Template finder component

import React, { useContext, useEffect } from 'react';
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
              placeholder={'Type in your insurance provider'}
              doctifyBaseURL={
                'https://api.doctify.com/api/hca/listing/insurers'
              }
              limit={20}
              noResultsMsg={'no results'}
              searchIcon={props.fields.SearchIcon.fields.SvgMarkup.value}
              searchStringPayment={searchStringPayment}
              setSearchStringPayment={setSearchStringPayment}
              insuranceProvidersFilterHeaderText={
                props.fields.InsuranceProvidersFilterHeaderText.value
              }
              insurersList={props.fields.InsurersList}
            />

            <Container marginTop="spacing-8">
              <Text tag="h2" variation="heading-2">
                Not paying through insurance?
              </Text>

              <Checkbox
                id="1"
                label="I am self-paying"
                name="selfpayment"
                value="selfpayment"
                checked={isSelfPayment}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.checked) {
                    setSearchStringPayment('');
                  }
                  setIsSelfPayment(e.target.checked);
                  console.log(e.target.checked);
                }}
              ></Checkbox>
            </Container>
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
              onClick={() => router.push(props.fields.NextLink.value.href)}
            >
              <span>{props.fields.NextLink.value.text}</span>
            </button>
          </Button>
        </Navigation>

        {/* <div>Message: {message}</div>
        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={props.fields.CardImage} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <Text tag="div">
                  <JssRichText field={props.fields.TitleText} />
                </Text>
              </div>
            </div>
            <div className="field-promolink">
              <h2>Links from the base template</h2>
              <Button size={'small'} theme={'outline'}>
                <JssLink field={props.fields.NextLink} title={props.fields.NextLink.value.text}></JssLink>
              </Button>
              <Button size={'small'} theme={'outline'}>
                <JssLink field={props.fields.BackLink} title={props.fields.BackLink.value.text}></JssLink>
              </Button>
              <Button size={'small'} theme={'outline'}>
                <JssLink field={props.fields.StartLink} title={props.fields.StartLink.value.text}></JssLink>
              </Button>
            </div>
          </div> 
        </div> */}
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
