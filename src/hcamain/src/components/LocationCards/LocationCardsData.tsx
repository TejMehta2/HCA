import {
  FilterOptionFields,
  ComponentRenderingDocCards,
} from './LocationCards.types';

export const fetchLocationCard = async (
  component: ComponentRenderingDocCards
) => {
  const customFilters: string[] = [];

  component?.fields?.CustomFilters?.map((filter: FilterOptionFields) => {
    const customFilter = filter?.fields?.Filter?.value;
    customFilters.push(customFilter || '');
  });

  const customFiltersParams = customFilters.join('&');
  const limit = component?.fields?.NumberOfCards?.value;

  try {
    const res = await fetch(
      `${process.env.DOCTIFY_REQUEST_URL}?${customFiltersParams}&limit=${limit}`
    );

    if (res.ok) {
      const docitfyData = await res.json();

      return docitfyData;
    } else {
      console.error('Promise resolved but HTTP status failed');
    }
  } catch {
    console.error('Promise rejected');
  }
};
