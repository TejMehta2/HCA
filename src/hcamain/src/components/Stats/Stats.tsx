import {
  Text as JssText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

import Themes from '@component-library/foundation/Themes/Themes';
import Text from '@component-library/foundation/Text/Text';
import { StatsProps } from './Stats.types';

const StatsDefaultComponent = (props: StatsProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Stats. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: StatsProps): JSX.Element => {
  if (!props?.fields) {
    return <StatsDefaultComponent {...props} />;
  }

  return (
    <Themes theme={props.params?.Theme || 'A-HCA-White'}>
      <Text
        tag={props.params?.HeadingTag || 'h1'}
        variation={props.params?.HeadingSize || 'display-1'}
      >
        <JssText field={props.fields.Title} />
      </Text>

      <p>Stats</p>
      {props.fields?.Counters?.map((counters) => (
        <>
          <br />
          <JssText field={counters.fields?.Number} />
          :
          <JssText field={counters.fields?.Text} />
        </>
      ))}
    </Themes>
  );
};
