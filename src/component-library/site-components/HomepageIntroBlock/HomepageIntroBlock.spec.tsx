import React from 'react';
import { render } from '@testing-library/react';
import HomepageIntroBlock from './HomepageIntroBlock';
import { HomepageIntroBlockProps } from './HomepageIntroBlock.types';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import CQCBlock from '../../components/CQCBlock/CQCBlock';
import Icons from '../../foundation/Icons/Icons';
import Doctify from '../../components/Doctify/Doctify';

const mockProps: HomepageIntroBlockProps = {
  theme: 'A-HCA-White',
  title: (
    <Text variation="display-1" tag="h2">
      Committed to your care
    </Text>
  ),
  copy: (
    <Text variation="body-large" tag="p">
      Quis laboris proident sint amet id cillum do dolor in tempor est.
      Exercitation aute sint tempor eu ut aliquip commodo enim nulla et laborum
      et culpa minim. Commodo ex laboris pariatur labore nostrud dolore.
    </Text>
  ),
  stats: [
    {
      value: <span>26</span>,
      label: <span>years in the UK</span>,
    },
    {
      value: <span>3,000</span>,
      label: <span>consultants</span>,
    },
    {
      value: <span>770</span>,
      label: <span>inpatient beds</span>,
    },
  ],
  cta: (
    <a href="#">
      About <strong>HCA Healthcare UK</strong>
    </a>
  ),
  image: (
    <Image
      src="/placeholders/happy-nurse.jpeg"
      alt=""
      width="1875"
      height="1500"
    />
  ),
  cqc: (
    <CQCBlock
      link={<a href="#"></a>}
      title="Care Quality Commission verified"
      text="All our hospitals are rated Good or Oustanding."
      icon={<Icons iconName="iconCheckCircle"></Icons>}
      logo={{
        dark: (
          <Image src="/cqc-white.png" alt="cqc logo" width="120" height="37" />
        ),
        light: (
          <Image src="/cqc-color.png" alt="cqc logo" width="120" height="37" />
        ),
      }}
    />
  ),
  doctify: (
    <Doctify
      alignment="left"
      link={<a href="#"></a>}
      rating={5}
      reviews="13,500 +"
      logo={{
        dark: (
          <Image
            src="/doctify-dark.png"
            alt="doctify logo"
            width="83"
            height="21"
          />
        ),
        light: (
          <Image
            src="/doctify-light.png"
            alt="doctify logo"
            width="83"
            height="21"
          />
        ),
      }}
    />
  ),
};

describe('HomepageIntroBlock', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<HomepageIntroBlock {...mockProps} />);
    expect(getByText('Committed to your care')).toBeVisible();
    expect(getByText('years in the UK')).toBeVisible();
    expect(getByText('HCA Healthcare UK')).toBeVisible();
  });
});
