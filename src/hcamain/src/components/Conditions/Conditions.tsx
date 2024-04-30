import React from 'react';
import {
  Field,
  ImageField,
  Text as JssText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import TextBlockHeader from '@component-library/site-components/TextBlockHeader/TextBlockHeader';
import Text from '@component-library/foundation/Text/Text';

type HCAIcon = {
  svgMarkup?: Field<string>;
};

interface DepartmentFields {
  abstractTitle?: { value?: string };
  abstractText?: { value?: string };
  abstractImage?: { jsonValue: ImageField };
  title?: { value?: string };
  text?: { value?: string };
  image?: { jsonValue: ImageField };
  url?: { path?: string };
  children: {
    results: PagesFields[];
  };
}

interface PagesFields {
  abstractTitle?: { value?: string };
  abstractText?: { value?: string };
  abstractImage?: { jsonValue: ImageField };
  title?: { value?: string };
  text?: { value?: string };
  image?: { jsonValue: ImageField };
  url?: { path?: string };
}

interface Fields {
  data?: {
    item?: {
      heading?: { jsonValue?: Field<string> };
      title?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
      cTAIcon?: {
        Icon?: HCAIcon;
      };

      department?: {
        DepartmentList?: DepartmentFields[];
      };
      numberOfCards?: { jsonValue?: Field<string> };
      displayAllCards?: { jsonValue?: Field<string> };
      cTAText?: { jsonValue?: Field<string> };
    };
    contextItem?: {
      conditions?: {
        ConditionsList?: PagesFields[];
      };
    };
  };
}

type ConditionsProps = {
  params?: Params;
  fields?: Fields;
};

const ConditionsDefaultComponent = (props: ConditionsProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Conditions please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const WithImage = (props: ConditionsProps): JSX.Element => {
  if (!props.fields) {
    return <ConditionsDefaultComponent {...props} />;
  }
  return (
    <TextBlockHeader>
      <Text variation={'subheading-1'}>
        <JssText field={props.fields?.data?.item?.heading?.jsonValue} />
      </Text>
      <Text variation={'display-2'}>
        <JssText field={props.fields?.data?.item?.title?.jsonValue} />
      </Text>
    </TextBlockHeader>
  );
};

export const WithoutImage = (props: ConditionsProps): JSX.Element => {
  if (!props.fields) {
    return <ConditionsDefaultComponent {...props} />;
  }
  return (
    <TextBlockHeader>
      <Text variation={'subheading-1'}>
        <JssText field={props.fields?.data?.item?.heading?.jsonValue} />
      </Text>
      <Text variation={'display-2'}>
        <JssText field={props.fields?.data?.item?.title?.jsonValue} />
      </Text>
    </TextBlockHeader>
  );
};
