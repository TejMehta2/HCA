import React from 'react';
import { render } from '@testing-library/react';
import LocationCard from './LocationCard';
import { LocationCardProps } from './LocationCard.types';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';

const mockProps: LocationCardProps = {
  name: (
    <Text variation="body-bold-large" tag="p">
      Wimpole Street, London
    </Text>
  ),
  description: (
    <Text variation="body-small" tag="p">
      The Waterfront Business Park, Beaufort House, Elstree WD6 3BS
    </Text>
  ),
  children: (
    <span>
      <Icons iconName="iconClock" />
      <Text variation="body-small" tag="p">
        Available Sat 21 Oct 2023
      </Text>
    </span>
  ),
  handleClick: () => {},
};

describe('LocationCard', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<LocationCard {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
