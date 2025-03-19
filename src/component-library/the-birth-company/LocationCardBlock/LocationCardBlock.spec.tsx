import React from 'react';
import { render } from '@testing-library/react';
import LocationCardBlock from './LocationCardBlock';
import { LocationCardBlockProps } from './LocationCardBlock.types';
import LocationCard from '../LocationCard/LocationCard';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';

const mockProps: LocationCardBlockProps = {
  children: (
    <LocationCard
      handleClick={() => {}}
      name={<Text variation="body-bold-large">Wimpole Street, London</Text>}
      description={
        <Text variation="body-small">
          The Waterfront Business Park, Beaufort House, Elstree WD6 3BS
        </Text>
      }
    >
      <span>
        <Icons iconName="iconClock" />
        <Text variation="body-small" tag="p">
          Available Sat 21 Oct 2023
        </Text>
      </span>
    </LocationCard>
  ),
};

describe('LocationCardBlock', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<LocationCardBlock {...mockProps} />);
    expect(getByText('Wimpole Street, London')).toBeVisible();
  });
});
