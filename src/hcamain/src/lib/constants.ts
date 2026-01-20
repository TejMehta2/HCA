// Exposes the id of the search suggestions dialog in the main navigation template, so that other components e.g. HeroBannerWithSearch can control the open/closed state of the dialog.
export const SEARCH_SUGGESTIONS_MODAL_ID = 'search-suggestions-modal';

// Exposes site base URL for e.g. Schema
export const BASE_URL = 'https://www.hcahealthcare.co.uk';

export const FINDER_PROFILE_ROOT_PATH =
  process.env.FINDER_PROFILE_ROOT_PATH! || `finder/stepconsultantprofile`;

// Exposes the profile base for consultants
export const FINDER_PROFILE_CANONICAL_BASE_URL = `${BASE_URL}/${FINDER_PROFILE_ROOT_PATH}`;
