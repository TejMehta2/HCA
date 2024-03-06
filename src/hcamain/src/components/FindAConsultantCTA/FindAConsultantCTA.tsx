import React from 'react';
import {
  Field,
  ImageField,
  Text as JssText,
  Image as JSSImage,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

type FilterOptionFields = {
  displayName?: { value?: string };
  filter?: { value?: string };
  filterValue?: { value?: string };
};

type PracticeFields = {
  title?: { value?: string };
  text?: { value?: string };
  image?: { jsonValue?: ImageField };
  doctifyPractice?: { value?: string };
};

type ServiceFields = {
  title?: { value?: string };
  text?: { value?: string };
  image?: { jsonValue?: ImageField };
  doctifyKeywordId?: { value?: string };
};

type CustomFilters = {
  filter?: { value?: string };
};

interface Fields {
  data?: {
    item?: {
      cTAIcon?: {
        Icon?: CTAIconFields;
      };
      cTALink?: { jsonValue?: LinkField };
      practice?: {
        PracticeList?: PracticeFields[];
      };
      service?: {
        ServicesList?: ServiceFields[];
      };
      customFilters?: {
        CustomFiltersList?: CustomFilters[];
      };
    };
    contextItem?: {
      doctifyKeywordId?: { value?: string };
      doctifyPractice?: { value?: string };
    };
  };
}

type FindAConsultantCTAProps = {
  params?: Params;
  fields?: Fields;
};

const FindAConsultantCTADefaultComponent = (
  props: FindAConsultantCTAProps
): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">FindAConsultantCTA no datasource</span>
    </div>
  </div>
);

export const Default = (props: FindAConsultantCTAProps): JSX.Element => {
  if (!props.fields) {
    return <FindAConsultantCTADefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params?.styles}`}>
      <a href={props.fields?.data?.item?.cTALink?.jsonValue?.value.href}>
        {props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup && (
          <span
            dangerouslySetInnerHTML={{
              __html: props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup.value,
            }}
          />
        )} 
        <span>{props.fields?.data?.item?.cTALink?.jsonValue?.value.text}</span>
      </a>
      <br />

      <span>Practice:</span>
      <br />
      <ul>
        {props.fields?.data?.item?.practice?.PracticeList?.map(
          (practice, index) => (
            <li key={index}>
              <JssText field={practice?.title} />
              <br />
              <JssText field={practice?.text} />
              <br />
              <JSSImage field={practice?.image?.jsonValue} />
              <br />
              <span>{practice?.doctifyPractice?.value}</span>
              <br />
            </li>
          )
        )}
      </ul>
      <br />
      <span>Service:</span>
      <br />
      <ul>
        {props.fields?.data?.item?.service?.ServicesList?.map(
          (service, index) => (
            <li key={index}>
              <JssText field={service?.title} />
              <br />
              <JssText field={service?.text} />
              <br />
              <JSSImage field={service?.image?.jsonValue} />
              <br />
              <span>{service?.doctifyKeywordId?.value}</span>
            </li>
          )
        )}
      </ul>
      <br />
      <span>CustomFilters:</span>
      <br />
      <ul>
        {props.fields?.data?.item?.customFilters?.CustomFiltersList?.map(
          (customFilter, index) => (
            <li key={index}>
              <span>{customFilter?.filter?.value}</span>
              <br />
            </li>
          )
        )}
      </ul>
      <br />
      <span>{props.fields?.data?.contextItem?.doctifyKeywordId?.value}</span>
      <br />
      <span>{props.fields?.data?.contextItem?.doctifyPractice?.value}</span>
      <br />
    </div>
  );
};

