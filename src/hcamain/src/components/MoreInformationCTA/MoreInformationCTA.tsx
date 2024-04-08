import React from 'react';
import {
  Field,
  Text as JssText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

type ModalContentFields = {
  fields?: {
    Title?: Field<string>;
    Text?: Field<string>;
  };
};

interface Fields {
  ModalContent?: ModalContentFields[];
}

type MoreInformationCTAProps = {
  params?: Params;
  fields?: Fields;
};

const MoreInformationCTADefaultComponent = (
  props: MoreInformationCTAProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            More Information CTA please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: MoreInformationCTAProps): JSX.Element => {
  if (!props.fields) {
    return <MoreInformationCTADefaultComponent {...props} />;
  }
  console.log(props);
  return (
    <div className={`component ${props.params?.styles}`}>
      <ul>
        {props.fields?.ModalContent?.map((modalContent, index) => (
          <li key={index}>
            <br />
            <JssText field={modalContent?.fields?.Title} />
            <br />
            <JssText field={modalContent?.fields?.Text} />
            <br />
          </li>
        ))}
      </ul>
      <br />
    </div>
  );
};
