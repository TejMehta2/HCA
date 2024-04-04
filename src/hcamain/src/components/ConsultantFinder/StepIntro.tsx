/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { ConsultantFinderContext } from 'src/context/consultantFinderContext';

import {
  Image as JssImage,
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Search from '@component-library/consultant-finder/Search/Search';
import ImageAndTextBlock from '@component-library/site-components/ImageAndTextBlock/ImageAndTextBlock';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import Icons from '@component-library/foundation/Icons/Icons';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Container from '@component-library/foundation/Containers/Container';

interface Fields {
  QuickSearchLink: LinkField;
  AdvancedSearchLink: LinkField;
  SearchByConsultantLink: LinkField;
  API_Autocomplete_BaseURL: Field<string>;
  API_Autocomplete_Limit: Field<string>;
  API_Autocomplete_LoadingMsg: Field<string>;
  SearchPlaceholderText: Field<string>;
  API_Autocomplete_NoResultsMsg: Field<string>;
  ConditionsTreatmentsFilterHeaderText: Field<string>;
  SpecialitiesFilterHeaderText: Field<string>;
  HeadingText: Field<string>;
  FindConsultantHeaderText: Field<string>;
  TitleText: Field<string>;
  CardImage: ImageField;
  BodyText: Field<string>;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
  SearchIcon: any;
  ConditionsTreatmentsList: any;
  SpecialitiesList: any;
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
  const id = props.params.RenderingIdentifier;
  const { searchString, setSearchString, setKeywordId, keywordId } = useContext(
    ConsultantFinderContext
  );

  //console.log('how can we help', props);

  const handleClickQuickSearch = () => {
    const baseURLResults =
      props?.fields?.QuickSearchLink?.value?.href ||
      '/Finder/Step-Consultant-Cards';
    router.push(
      `${baseURLResults}?search=${searchString}&keywordId=${keywordId}&sortType=relevance&lat=51.507217&lon=-0.1275862&distance=700&limit=12&offset=0`
    );
  };

  const handleClickAdvanceSearch = () => {
    router.push({
      pathname: props.fields.AdvancedSearchLink.value.href,
      query: { keywordId: keywordId, searchString: searchString },
    });
  };

  if (props.fields) {
    return (
      <div id={id ? id : undefined}>
        <ImageAndTextBlock
          theme="A-HCA-White"
          imageAlignment="left"
          length="short"
          hideImageOnMobile={true}
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
            <Search
              placeholder={
                props?.fields?.SearchPlaceholderText?.value ||
                'Type in a service, condition, treatment...'
              }
              doctifyBaseURL={
                props?.fields?.API_Autocomplete_BaseURL?.value ||
                'https://api.doctify.com/api/hca/search/autocomplete?search'
              }
              limit={Number(props?.fields?.API_Autocomplete_Limit?.value) || 20}
              noResultsMsg={
                props?.fields?.API_Autocomplete_NoResultsMsg?.value ||
                'No matches found, please try typing something else.'
              }
              specialtyLabel={
                props?.fields?.SpecialitiesFilterHeaderText?.value ||
                'Specialties'
              }
              conditionsProceduresLabel={
                props?.fields?.ConditionsTreatmentsFilterHeaderText?.value ||
                'Conditions/ Procedures'
              }
              setKeywordId={setKeywordId}
              searchString={searchString}
              setSearchString={setSearchString}
              searchIcon={
                props?.fields?.SearchIcon?.fields?.SvgMarkup?.value || null
              }
              conditionsTreatmentsList={
                props?.fields?.ConditionsTreatmentsList || []
              }
              specialitiesList={props?.fields?.SpecialitiesList || []}
              loadingText={
                props?.fields?.API_Autocomplete_LoadingMsg?.value ||
                'Loading...'
              }
            />
          </form>

          <Container
            marginBottom="spacing-8"
            displayFlex="displayFlex"
            withButtons={true}
          >
            <Button
              size={'small'}
              variation={'full-dark'}
              contentVariation="full-width"
            >
              <button
                disabled={keywordId === 0 ? true : false}
                onClick={handleClickQuickSearch}
              >
                <Icons iconName="iconSearch" />
                <span>{props.fields.QuickSearchLink.value.text}</span>
              </button>
            </Button>

            <Button
              size={'small'}
              variation={'outline-dark'}
              contentVariation="full-width"
            >
              <button
                disabled={keywordId === 0 ? true : false}
                onClick={handleClickAdvanceSearch}
              >
                <Icons iconName="iconAdvanced" />
                <span>{props.fields.AdvancedSearchLink.value.text}</span>
              </button>
            </Button>
          </Container>

          <Container marginBottom="spacing-4">
            <Text tag="h2" variation="heading-2">
              {props.fields.FindConsultantHeaderText.value}
            </Text>
          </Container>

          <TextButton theme="dark">
            {/* sa iau din data */}
            <button
              onClick={() =>
                router.push({
                  pathname: props.fields.SearchByConsultantLink.value.href,
                  query: { keywordId: keywordId, searchString: searchString },
                })
              }
            >
              {props.fields.SearchByConsultantLink.value.text}
              <Icons iconName="iconArrowSmallRight" />
            </button>
          </TextButton>
        </ImageAndTextBlock>
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
