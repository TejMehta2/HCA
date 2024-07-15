import React from 'react';
import styles from './YextNoResults.module.scss';
import { YextNoResultsProps } from './YextNoResults.types';
import Text from '../../foundation/Text/Text';
import { useSearchState } from '@yext/search-headless-react';

const YextNoResults = (props: YextNoResultsProps): JSX.Element => {
  const { currentVerticalLabel, displayAllOnNoResults = true } = props;

  const allResultsForVertical =
    useSearchState(
      (state) => state.vertical.noResults?.allResultsForVertical.results
    ) || [];
  const query = useSearchState((state) => state.query.mostRecentSearch);

  const isShowingAllResults =
    displayAllOnNoResults && allResultsForVertical.length > 0;

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.title}>
          <Text tag="h2" variation="display-5">
            No results found in {currentVerticalLabel} for {query}.
          </Text>
        </div>
        <div className={styles.subtitle}>
          <Text tag="p" variation="body-extra-large">
            {isShowingAllResults && (
              <span>
                {' '}
                Showing <strong>all {currentVerticalLabel}</strong> instead.
              </span>
            )}
          </Text>
        </div>
      </div>
    </div>
  );
};
export default YextNoResults;
