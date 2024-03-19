import React from 'react';
import { render } from '@testing-library/react';
import CardGrid from './CardGrid';
import { CardGridProps } from './CardGrid.types';
import Image from 'next/image';
import Text from '../../foundation/Text/Text';
import CardPatientStories from '../../components/CardPatientStories/CardPatientStories';

const mockProps: CardGridProps = {
  children: [
    <CardPatientStories
      key={0}
      title={
        <Text variation="heading-1" tag="h4">
          Cardiac care
        </Text>
      }
      bodyCopy={
        <Text variation="body-large" tag="p">
          There are over 1400 at The Portland, each year. Hear new mums sharing
          theirs
        </Text>
      }
      image={
        <Image
          src="/placeholders/multicard.jpg"
          alt="baby crying"
          width="363"
          height="243"
        />
      }
      link={
        <a href="#">
          <span>
            Read the <strong>Story</strong>
          </span>
        </a>
      }
    />,
  ],
};

describe('CardGrid', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CardGrid {...mockProps} />);
    expect(getByText('Cardiac care')).toBeVisible();
  });
});
