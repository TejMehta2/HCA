import {
  Text as JssText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

import Themes from '@component-library/foundation/Themes/Themes';
import Text from '@component-library/foundation/Text/Text';
import { StatsProps } from './Stats.types';
import Stats from '@component-library/careers/Stats/Stats';
import { inPageNavGlobalStore } from 'src/context/inPageNavGlobalStorage';

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

  const tableOfContentsLinkTitle = props?.fields?.Title?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );

  return (
    <Themes theme={props.params?.Theme || 'D-HCA-Teal'} id={componentAnchorId}>
      <Stats
        heading={
          <Text
            tag={props.params?.HeadingTag || 'h2'}
            variation={props.params?.HeadingSize || 'display-3'}
          >
            <JssText field={props.fields.Title} />
          </Text>
        }
      >
        {props.fields?.Counters?.map((counters, index) => (
          <div key={index}>
            <Text variation="heading-2">
              <JssText field={counters.fields?.Number} />
            </Text>
            <Text variation="body-medium-large">
              <JssText field={counters.fields?.Text} />
            </Text>
          </div>
        ))}
      </Stats>
    </Themes>
  );
};

export const ThreeColumns = (props: StatsProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  if (!props?.fields) {
    return <StatsDefaultComponent {...props} />;
  }

  const tableOfContentsLinkTitle = props?.fields?.Title?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );

  return (
    <Themes theme={props.params?.Theme || 'D-HCA-Teal'} id={componentAnchorId}>
      <Stats
        variant={'threeCol'}
        heading={
          props.fields.Title?.value || isExperienceEditor ? (
            <Text
              tag={props.params?.HeadingTag || 'h2'}
              variation={props.params?.HeadingSize || 'display-3'}
            >
              <JssText field={props.fields.Title} />
            </Text>
          ) : undefined
        }
      >
        {props.fields?.Counters?.map((counters, index) => (
          <div key={index}>
            <Text variation="display-4">
              <JssText field={counters.fields?.Number} />
            </Text>
            <Text variation="body-medium-large">
              <JssText field={counters.fields?.Text} />
            </Text>
          </div>
        ))}
      </Stats>
    </Themes>
  );
};
