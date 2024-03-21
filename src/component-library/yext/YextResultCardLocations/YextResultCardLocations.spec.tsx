import React from 'react';
import { render } from '@testing-library/react';
import YextResultCardLocations from './YextResultCardLocations';
import { YextResultCardLocationsProps } from './YextResultCardLocations.types';
import Numbers from '../../components/Numbers/Numbers';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';

const mockProps: YextResultCardLocationsProps = {
  number: <Numbers number={<span>1</span>} />,
  image: (
    <Image
      src="/placeholders/couple-on-bench.jpeg"
      alt="couple on bench"
      width="140"
      height="140"
    />
  ),
  title: (
    <Text variation="heading-1">
      Golders Green Outpatients and Diagnostics Centre
    </Text>
  ),
  distance: <Text variation={'body-large'}>546.0 km</Text>,
  ctas: {
    button: <button>Learn more</button>,
    textButton: (
      <button>
        <Icons iconName="iconEmail"></Icons>Email us
      </button>
    ),
  },
  address: {
    icon: <Icons iconName={'iconPin'}></Icons>,
    text: (
      <Text variation="body-large" tag="span">
        Roman House, 296 Golders Green Road London NW11 9PY
      </Text>
    ),
  },
  phone: {
    icon: <Icons iconName="iconPhone"></Icons>,
    text: (
      <Text variation="body-large" tag="span">
        020 3993 1861
      </Text>
    ),
  },
  openingHours: {
    icon: <Icons iconName="iconPhone"></Icons>,
    text: (
      <>
        <Text variation="body-medium-large" tag="span">
          Open Now.
        </Text>
        <Text variation="body-medium" tag="span">
          Closes at 20:00
        </Text>
      </>
    ),
  },
  variation: 'stacked',
};

describe('YextResultCardLocations', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<YextResultCardLocations {...mockProps} />);
    expect(
      getByText('Golders Green Outpatients and Diagnostics Centre')
    ).toBeVisible();
  });
});
