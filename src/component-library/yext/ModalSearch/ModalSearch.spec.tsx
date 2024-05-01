import React from 'react';
import { render } from '@testing-library/react';
import ModalSearch from './ModalSearch';
import { ModalSearchProps } from './ModalSearch.types';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';

const mockProps: ModalSearchProps = {
  id: 'SEARCH_SUGGESTIONS_MODAL_ID',
  placeholder: 'placeholder',
  subheading: <Text variation={'subheading-1'}>Popular searches</Text>,
  redirectUrl: '#',
  suggestions: [
    {
      icon: <Icons iconName={'iconSearch'} />,
      text: <span>Suggestion</span>,
      query: 'Suggestion',
    },
  ],
  defaultOpen: true,
};

describe('ModalSearch', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ModalSearch {...mockProps} />);
    expect(getByText('Popular searches')).toBeVisible();
  });
});
