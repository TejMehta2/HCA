import React, { type JSX } from 'react';
import { YextStyledStaticFiltersProps } from './YextStyledStaticFilters.types';
import styles from './YextStyledStaticFilters.module.scss';
import { StaticFilters, StaticFiltersCssClasses } from '@yext/search-ui-react';

const YextStyledStaticFilters = (
  props: YextStyledStaticFiltersProps
): JSX.Element => {
  const staticFiltersCssClasses: StaticFiltersCssClasses = {
    staticFiltersContainer: styles['static-filters-container'],
    titleLabel: styles['title-label'],
    searchInput: styles['search-input'],
    optionsContainer: styles['options-container'],
    option: styles['option'],
    optionInput: 'sr-only',
    optionLabel: styles['option-label'],
  };

  return (
    <StaticFilters
      customCssClasses={staticFiltersCssClasses}
      defaultExpanded={false}
      searchOnChange={false}
      {...props}
    />
  );
};

export default YextStyledStaticFilters;
