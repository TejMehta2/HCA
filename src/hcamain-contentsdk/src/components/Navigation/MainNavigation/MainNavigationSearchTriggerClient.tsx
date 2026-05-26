'use client';

import { type JSX } from 'react';
import TextLink from '@component-library/core-components/TextLink/TextLink';
import Icons from '@component-library/foundation/Icons/Icons';
import { SEARCH_SUGGESTIONS_MODAL_ID } from 'lib/constants';

const MainNavigationSearchTriggerClient = (): JSX.Element => (
  <TextLink>
    <button
      type="button"
      onClick={() => {
        const dialog = document.getElementById(
          SEARCH_SUGGESTIONS_MODAL_ID
        ) as HTMLDialogElement | null;
        dialog?.showModal();
      }}
    >
      <Icons iconName={'iconSearch'} />
      <span className="sr-only">Search</span>
    </button>
  </TextLink>
);

export default MainNavigationSearchTriggerClient;
