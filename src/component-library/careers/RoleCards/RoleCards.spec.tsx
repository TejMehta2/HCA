import React from 'react';
import { render } from '@testing-library/react';
import RoleCards from './RoleCards';
import { RoleCardsProps } from './RoleCards.types';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import CardRole from '../CardRole/CardRole';
import Icons from '../../foundation/Icons/Icons';
import Image from 'next/image';

const mockProps: RoleCardsProps = {
  title: (
    <Text variation="display-2">
      Find your role in transforming patient care
    </Text>
  ),
  subtitle: <Text variation="subheading-1">Where do you fit in?</Text>,
  bodyText: (
    <Text>
      Delivering quality patient care and innovative treatments is achieved
      through diverse people working in diverse roles, which means there&apos;s
      a good chance we&apos;ll have an opportunity to suit you.
    </Text>
  ),
  children: [
    <CardRole
      key={0}
      image={
        <Image
          src="/placeholders/smiling-doctor.png"
          alt="two children playing"
          width="643"
          height="605"
        />
      }
      icon={<Icons iconName="iconHospitalLarge" />}
      title={
        <Text variation="heading-2" tag="h4">
          Nursing & Front Line Clinical Services
        </Text>
      }
      cta={
        <Button size="small" variation="full">
          <a href="#">
            <span>
              <Icons iconName="iconArrowSmallRight" />
            </span>
          </a>
        </Button>
      }
    />,
  ],
};

describe('RoleCards', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<RoleCards {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
