// src/components/Facet.tsx
import React from 'react';
import {
  // Matcher and NumberRangeValue will be used in step 3
  Matcher,
  NumberRangeValue,
  useSearchActions,
  useSearchState,
} from '@yext/search-headless-react';

interface FacetProps {
  fieldId: string;
  displayName?: string;
}

const YextFilter = ({ fieldId, displayName }: FacetProps) => {
  const searchActions = useSearchActions();
  const facet = useSearchState(
    (state) => state.filters.facets?.find((f) => f.fieldId === fieldId)
  );

  console.log(state.filters.facets);

  const handleFacetClick = (
    value: string | number | boolean | NumberRangeValue,
    selected: boolean,
    matcher = Matcher.Equals
  ) => {
    searchActions.setFacetOption(fieldId, { matcher, value }, selected);
    searchActions.executeVerticalQuery();
  };

  // component returns null if the facet isn't found in the search state or has no options for a partiaular set of results
  return facet && facet.options.length > 0 ? (
    <div>
      <span>{displayName ?? facet.displayName}</span>
      <div key={facet.fieldId}>
        {facet.options.map((o, i) => (
          <div
            key={`${fieldId}_${i}`}
            // handleFacetClick will trigger on click to reverse the selected state of the facet option
            onClick={() => handleFacetClick(o.value, !o.selected)}
          >
            <div>
              {/* Each facet option contains a display name and count */}
              <span>{o.displayName}</span>
              <span>{`(${o.count})`}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default YextFilter;
