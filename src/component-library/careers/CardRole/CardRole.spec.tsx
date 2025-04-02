import React from 'react';
import { render } from '@testing-library/react';
import CardRole from './CardRole';
import { CardRoleProps } from './CardRole.types';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Image from 'next/image';

const mockProps: CardRoleProps = {
  image: (
    <Image
      src="/placeholders/children-playing.jpg"
      alt="two children playing"
      width="643"
      height="605"
    />
  ),
  icon: <Icons iconName="iconHospital48" />,
  title: (
    <Text variation="heading-2" tag="h4">
      Nursing & Front Line Clinical Services
    </Text>
  ),
  cta: (
    <Button size="small" variation="full">
      <a href="#">
        <span>
          <Icons iconName="iconArrowSmallRight" />
        </span>
      </a>
    </Button>
  ),
};

describe('CardRole', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CardRole {...mockProps} />);
    expect(getByText('Nursing & Front Line Clinical Services')).toBeVisible();
  });
});
