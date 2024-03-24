import React, { useEffect } from 'react';
import Tabs from '../../core-components/Tabs/Tabs';
import Themes from '../../foundation/Themes/Themes';
import { useSearchActions } from '@yext/search-headless-react';
import { VerticalKey, VerticalLabel } from '../YextSearch/YextSearch.types';
import { Args } from '../../core-components/Tabs/Tabs.types';

const YextTabs = (): JSX.Element => {
  useEffect(() => {
    searchActions.setUniversal();
    searchActions.setUniversalLimit({
      healthcare_facilities: 3,
    });
    searchActions.executeUniversalQuery();
  });

  const searchActions = useSearchActions();
  const verticalMap = new Map<VerticalLabel, VerticalKey>([
    ['All', 'all'],
    ['Locations', 'healthcare_facilities'],
    ['Tests & Treatments', 'tests_and_treatments'],
    ['Consultants', 'healthcare_professionals'],
    ['Service Lines', 'specialties'],
    ['Articles', 'articles'],
    ['FAQs', 'faqs'],
  ]);

  const displayTab = (args: Args) => {
    const { value } = args;

    if (value === 'all') {
      searchActions.setUniversal();
      searchActions.setUniversalLimit({
        healthcare_facilities: 3,
        tests_and_treatments: 5,
        healthcare_professionals: 5,
        specialties: 5,
        articles: 5,
        faqs: 5,
      });
      searchActions.executeUniversalQuery();
    } else {
      searchActions.setVertical(value);
      searchActions.setVerticalLimit(5);
      searchActions.executeVerticalQuery();
    }
  };

  return (
    <Themes theme="A-HCA-White">
      <Tabs
        callback={(args) => {
          displayTab(args);
        }}
        tabs={[...verticalMap.entries()].map(([label, value]) => ({
          label,
          value,
        }))}
        contentVariation="scroll-max-large"
      />
    </Themes>
  );
};

export default YextTabs;
