import React, { type JSX } from 'react';
import Tabs from '../../core-components/Tabs/Tabs';
import Themes from '../../foundation/Themes/Themes';
import { VerticalKey } from '../YextSearch/YextSearch.types';
import useSetVertical, { verticalMap } from '../helpers/useSetVertical';
import { useSearchState } from '@yext/search-headless-react';

const YextTabs = (): JSX.Element => {
  const setVertical = useSetVertical();
  const searchState = useSearchState((state) => state);
  const verticalKey = searchState.vertical.verticalKey as VerticalKey;
  const verticalIndex = [...verticalMap.keys()].indexOf(verticalKey || 'all');
  const displayTab = ({ value }: { value: VerticalKey }) => {
    setVertical(value);
  };

  return (
    <Themes theme="A-HCA-White">
      <Tabs
        overrideTabIndex={verticalIndex}
        callback={(args) => {
          displayTab(args as { value: VerticalKey });
        }}
        tabs={[...verticalMap.entries()].map(([value, label]) => ({
          label,
          value,
        }))}
        contentVariation="scroll-max-large"
      />
    </Themes>
  );
};

export default YextTabs;
