/* eslint-disable prettier/prettier */
import {
  Text as JssText,
  useSitecoreContext,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Themes from '@component-library/foundation/Themes/Themes';
import Text from '@component-library/foundation/Text/Text';
import RichText from '@component-library/core-components/RichText/RichText';
import { StatsProps } from './Stats.types';
import Stats from '@component-library/careers/Stats/Stats';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import StatsCards from '@component-library/careers/StatsCards/StatsCards';
import { StatProps } from '@component-library/careers/StatsCards/StatsCards.types';

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
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle || tableOfContentsLinkTitle;

  return (
    <Themes theme={props.params?.Theme || 'D-HCA-Teal'} id={componentAnchorId} tableOfContentTitle={tableOfContentTitle}>
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
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle || tableOfContentsLinkTitle;

  return (
    <Themes theme={props.params?.Theme || 'D-HCA-Teal'} id={componentAnchorId} tableOfContentTitle={tableOfContentTitle}>
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

export const Cards = (props: StatsProps): JSX.Element => {
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
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle || tableOfContentsLinkTitle;

  const stats: StatProps[] = (props.fields?.Counters || []).map((counter) => {
    const stat = counter.fields?.Number?.value || '';
    const text = counter.fields?.Text?.value || '';
    return { stat, text };
  });

  return (
    <StatsCards
      theme={props.params?.Theme || 'D-HCA-Teal'}
      id={componentAnchorId}
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
      header={
        <Text
          tag={props.params?.HeadingTag || 'h2'}
          variation={props.params?.HeadingSize || 'display-2'}
        >
          <JssText field={props.fields.Title} />
        </Text>
      }
      bodyCopy={
        (props.fields?.Text?.value || isExperienceEditor) && (
          <RichText>
            <JssRichText field={props.fields?.Text} />
          </RichText>
        )
      }
      stats={stats || []}
    ></StatsCards>
  );
};
