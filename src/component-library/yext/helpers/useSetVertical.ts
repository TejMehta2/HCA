import { useSearchActions } from '@yext/search-headless-react';
import { VerticalKey, VerticalLabel } from '../YextSearch/YextSearch.types';

export const verticalMap = new Map<VerticalKey, VerticalLabel>([
  ['all', 'All'],
  ['healthcare_facilities', 'Locations'],
  ['tests_and_treatments', 'Tests & Treatments'],
  ['healthcare_professionals', 'Consultants'],
  ['specialties', 'Service Lines'],
  ['articles', 'Articles'],
  ['faqs', 'FAQs'],
]);

const useSetVertical = () => {
  const searchActions = useSearchActions();
  const setVertical = (verticalKey: VerticalKey) => {
    if (verticalKey === 'all') {
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
      searchActions.setVertical(verticalKey);
      searchActions.setVerticalLimit(5);
      searchActions.executeVerticalQuery();
    }
  };
  return setVertical;
};

export default useSetVertical;
