import {
  Text as JssText,
  Link,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

import Themes from '@component-library/foundation/Themes/Themes';
import Text from '@component-library/foundation/Text/Text';
import { CareersLatestVacanciesProps } from './CareersLatestVacancies.types';

const CareersLatestVacanciesDefaultComponent = (
  props: CareersLatestVacanciesProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Careers Latest Vacancies. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: CareersLatestVacanciesProps): JSX.Element => {
  if (!props?.fields?.data?.item) {
    return <CareersLatestVacanciesDefaultComponent {...props} />;
  }

  return (
    <Themes theme={props.params?.Theme || 'A-HCA-White'}>
      <Text
        tag={props.params?.HeadingTag || 'h1'}
        variation={props.params?.HeadingSize || 'display-1'}
      >
        <JssText field={props.fields?.data?.item?.title?.jsonValue} />
      </Text>

      <p>Search Controls:</p>
      <p>{props.fields?.data?.item?.selectAJobAreaLabel?.value}</p>
      <p>{props.fields?.data?.item?.selectALocationLabel?.value}</p>
      <p>{props.fields?.data?.item?.readMoreCtaText?.value}</p>
      <p>
        <Link
          field={props.fields.data.item.viewAllVacanciesCTA.jsonValue}
        ></Link>
      </p>

      <p>Context data:</p>
      <p>
        jobFamily, use it to scope search results to context job area page:{' '}
        {props.fields?.data?.contextItem?.jobFamily?.value}
      </p>
    </Themes>
  );
};
