import React from 'react';
import { render } from '@testing-library/react';
import CardService from './CardService';
import { CardServiceProps } from './CardService.types';
import Text from '../../foundation/Text/Text';

const mockProps: CardServiceProps = {
  children: <Text variation="display-6">Cardiac Care</Text>,
  link: <a href="#">Learn More</a>,
};

describe('CardService', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CardService {...mockProps} />);
    expect(getByText('Cardiac Care')).toBeVisible();
  });
});
