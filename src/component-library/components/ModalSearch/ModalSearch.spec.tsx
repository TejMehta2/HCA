import React from 'react';
import { render } from '@testing-library/react';
import ModalSearch from './ModalSearch';
import { ModalSearchProps } from './ModalSearch.types';
import SearchBar from '../SearchBar/SearchBar';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';

const suggestions = [
  'Hello world',
  'How do I pay for treatment?',
  'Locations near me',
  'Operations & Covid 19',
  'Careers',
  'Neurology',
  'Where can I park?',
  'ENT',
  'How do I pay for treatment?',
  'Operations & Covid 19',
  'Careers',
  'Neurology',
  'Where can I park?',
  'ENT',
];

const mockProps: ModalSearchProps = {
  searchBar: <SearchBar placeholder="Start typing..." />,
  suggestions: (
    <>
      {suggestions.map((suggestion, index) => (
        <Button key={index} size={'small'} variation={'full-light-blue'}>
          <button>
            <Icons iconName="iconSearch" />
            <span>{suggestion}</span>
          </button>
        </Button>
      ))}
    </>
  ),
  defaultOpen: true,
  theme: 'D-HCA-Teal',
};

describe('ModalSearch', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ModalSearch {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
