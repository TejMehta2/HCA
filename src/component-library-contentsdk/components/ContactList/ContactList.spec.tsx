import React from 'react';
import { render } from '@testing-library/react';
import ContactList from './ContactList';
import { ContactListProps } from './ContactList.types';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';

const mockProps: ContactListProps = {
  items: [
    {
      title: (
        <Text tag="h4" variation="subheading-2">
          Embassy team
        </Text>
      ),
      number: (
        <Text tag="p" variation="display-6">
          020 3131 5978
        </Text>
      ),
      icon: <Icons iconName="iconClock"></Icons>,
      openingHours: (
        <Text tag="p" variation="body-large">
          Monday to Friday 8am - 6pm
        </Text>
      ),
    },
  ],
};

describe('ContactList', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ContactList {...mockProps} />);
    expect(getByText('Embassy team')).toBeVisible();
  });
});
