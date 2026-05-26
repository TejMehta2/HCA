'use client';

import { useRef, type JSX } from 'react';
import Themes from '@component-library/foundation/Themes/Themes';
import Text from '@component-library/foundation/Text/Text';
import ModalSearch from '@component-library/yext/ModalSearch/ModalSearch';
import { SEARCH_SUGGESTIONS_MODAL_ID } from 'lib/constants';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';

type MainNavigationSearchSuggestion = {
  iconSvg?: string;
  text?: string;
  query?: string;
};

type MainNavigationSearchModalClientProps = {
  placeholder?: string;
  popularSearchesLabel?: string;
  redirectUrl?: string;
  suggestions?: MainNavigationSearchSuggestion[];
};

const MainNavigationSearchModalClient = ({
  placeholder = '',
  popularSearchesLabel = '',
  redirectUrl,
  suggestions = [],
}: MainNavigationSearchModalClientProps): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <Themes theme={'A-HCA-White'}>
      <ModalSearch
        id={SEARCH_SUGGESTIONS_MODAL_ID}
        ref={dialogRef}
        placeholder={placeholder}
        subheading={
          popularSearchesLabel ? (
            <Text variation={'subheading-1'}>{popularSearchesLabel}</Text>
          ) : undefined
        }
        redirectUrl={redirectUrl}
        suggestions={suggestions.map((search) => ({
          icon: <SitecoreSvg>{search.iconSvg}</SitecoreSvg>,
          text: search.text,
          query: search.query,
        }))}
      />
    </Themes>
  );
};

export default MainNavigationSearchModalClient;
