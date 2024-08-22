import {
  useSearchState,
  VerticalResults as VerticalResultsData,
} from '@yext/search-headless-react';
import { VerticalConfig } from '@yext/search-ui-react';
import React from 'react';
import Text from '../../foundation/Text/Text';
import useSetVertical from '../helpers/useSetVertical';
import { VerticalKey } from '../YextSearch/YextSearch.types';
import styles from './YextCustomAlternativeVerticals.module.scss';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import TextLink from '../../core-components/TextLink/TextLink';

interface VerticalSuggestion {
  resultsCount: number;
  label?: string;
  verticalKey: string;
}

function isVerticalSuggestion(
  suggestion: unknown
): suggestion is VerticalSuggestion {
  return (
    (suggestion as VerticalSuggestion)?.resultsCount !== undefined &&
    (suggestion as VerticalSuggestion)?.verticalKey !== undefined
  );
}

/**
 * A map of vertical keys to labels.
 *
 * @public
 */
export interface VerticalLabelMap {
  /** Config mapped to a vertical. */
  [verticalKey: string]: Pick<VerticalConfig, 'label'>;
}

/**
 * Props for {@link AlternativeVerticals}.
 *
 * @public
 */
export interface AlternativeVerticalsProps {
  /** The label for the current vertical. */
  currentVerticalLabel: string;
  /** A map of verticalKeys to the display label for that vertical. */
  verticalConfigMap: VerticalLabelMap;
  /**
   * Whether or not all results should be displayed when there are none returned from the search.
   * Defaults to true.
   */
  displayAllOnNoResults?: boolean;
}

/**
 * A component that displays the alternative verticals that have results if a search returns none
 * on the current vertical.
 *
 * @public
 *
 * @param props - {@link AlternativeVerticalsProps}
 * @returns A React element for the alternative verticals, or null if there are none with results
 */
export function AlternativeVerticals({
  currentVerticalLabel,
  verticalConfigMap,
  displayAllOnNoResults = true,
}: AlternativeVerticalsProps): JSX.Element | null {
  const setVertical = useSetVertical();
  const alternativeVerticals =
    useSearchState((state) => state.vertical.noResults?.alternativeVerticals) ||
    [];
  const allResultsForVertical =
    useSearchState(
      (state) => state.vertical.noResults?.allResultsForVertical.results
    ) || [];
  const query = useSearchState((state) => state.query.mostRecentSearch);

  const verticalSuggestions = buildVerticalSuggestions(
    verticalConfigMap,
    alternativeVerticals
  );
  const isShowingAllResults =
    displayAllOnNoResults && allResultsForVertical.length > 0;

  function buildVerticalSuggestions(
    verticalConfigMap: VerticalLabelMap,
    alternativeVerticals: VerticalResultsData[]
  ): VerticalSuggestion[] {
    return alternativeVerticals
      .filter((alternativeResults: VerticalResultsData) => {
        return !!verticalConfigMap[alternativeResults.verticalKey];
      })
      .map((alternativeResults: VerticalResultsData) => {
        return {
          label: verticalConfigMap[alternativeResults.verticalKey].label,
          verticalKey: alternativeResults.verticalKey,
          resultsCount: alternativeResults.resultsCount,
        };
      })
      .filter(isVerticalSuggestion)
      .filter((verticalSuggestion) => verticalSuggestion.resultsCount > 0);
  }

  function processTranslation(args: {
    phrase: string;
    pluralForm?: string;
    count?: number;
  }): string {
    if (args.count != null && args.pluralForm && args.count !== 1) {
      return args.pluralForm;
    } else {
      return args.phrase;
    }
  }

  const Suggestion = (props: { suggestion: VerticalSuggestion }) => {
    const { suggestion } = props;
    const setVertical = useSetVertical();
    const resultsCountText = processTranslation({
      phrase: `${suggestion.resultsCount} result`,
      pluralForm: `${suggestion.resultsCount} results`,
      count: suggestion.resultsCount,
    });
    return (
      <Button key={suggestion.verticalKey} size={'small'} variation={'filter'}>
        <button
          onClick={() => setVertical(suggestion.verticalKey as VerticalKey)}
        >
          <Icons iconName={'iconSearch'} />
          <span>
            {suggestion.label || 'Links'} - {resultsCountText}
          </span>
        </button>
      </Button>
    );
  };

  return (
    <div className={styles.wrapper}>
      {verticalSuggestions && (
        <div>
          <div className={styles.title}>
            <Text tag="h2" variation="display-5">
              No results found in {currentVerticalLabel}.
            </Text>
          </div>
          {isShowingAllResults && verticalSuggestions.length > 0 ? (
            <>
              <div className={styles.subtitle}>
                <Text tag="p" variation="body-extra-large">
                  <span>
                    {' '}
                    Showing <strong>all {currentVerticalLabel}</strong> instead.
                  </span>
                </Text>
              </div>
              <div className={styles.copy}>
                <Text tag="p" variation="body-extra-large">
                  {processTranslation({
                    phrase: 'The following category yielded results for ',
                    pluralForm: 'The following categories yielded results for ',
                    count: verticalSuggestions.length,
                  })}{' '}
                  <strong>‘{query}’:</strong>
                </Text>
              </div>
              <div className={styles.ctas}>
                {verticalSuggestions.map((suggestion, index) => (
                  <Suggestion key={index} suggestion={suggestion} />
                ))}
              </div>
              <Text variation={'body-extra-large'}>
                <TextLink variation={'body-extra-large'}>
                  <button onClick={() => setVertical('all')}>
                    <span>
                      <span>Alternatively, you can </span>
                      <strong>
                        view results across all search categories.
                      </strong>
                    </span>
                  </button>
                </TextLink>
              </Text>
            </>
          ) : (
            <Text tag="p" variation="body-extra-large">
              Please try another search.
            </Text>
          )}
        </div>
      )}
    </div>
  );
}
