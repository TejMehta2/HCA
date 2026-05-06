/* eslint-disable react/jsx-key */
import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';
import { FooterProps } from './Footer.types';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import CQCBlock from '../../components/CQCBlock/CQCBlock';
import Image from 'next/image';

const mockProps: FooterProps = {
  logo: undefined,
  buttons: (
    <>
      <a href="#">
        <Icons iconName="iconMobile" />
        <span>
          App <strong>download</strong>
        </span>
      </a>
      <a href="#">
        <Icons iconName="iconRedo" />
        <span>
          Get a <strong>second opinion</strong>
        </span>
      </a>
      <a href="#">
        <Icons iconName="iconStethoscope" />
        <span>
          Find a <strong>doctor</strong>
        </span>
      </a>
      <a href="#">
        <Icons iconName="iconCreditCard" />
        <span>
          Pay my <strong>bill</strong>
        </span>
      </a>
    </>
  ),
  columns: [
    {
      title: 'About HCA',
      links: [
        <a href="#">Our HCA Story</a>,
        <a href="#">Our Quality Commitment</a>,
        <a href="#">Our Mission Statement</a>,
        <a href="#">Contact HCA UK</a>,
      ],
      socials: [
        <Button size={'small'} variation={'social'}>
          <a href="#">
            <Icons iconName="iconFacebook" />
            <span className="sr-only">Facebook link</span>
          </a>
        </Button>,
        <Button size={'small'} variation={'social'}>
          <a href="#">
            <Icons iconName="iconInstagram" />
            <span className="sr-only">Instagram link</span>
          </a>
        </Button>,
        <Button size={'small'} variation={'social'}>
          <a href="#">
            <Icons iconName="iconLinkedin" />
            <span className="sr-only">Linkedin link</span>
          </a>
        </Button>,
      ],
    },
    {
      title: 'Departments',
      links: [
        <a href="#">Cancer Care</a>,
        <a href="#">Cardiac Care</a>,
        <a href="#">Neurology</a>,
        <a href="#">Women’s Health</a>,
        <a href="#">Orthopaedic Care</a>,
      ],
    },
    {
      title: 'Media',
      links: [
        <a href="#">Blog</a>,
        <a href="#">News & Press Releases</a>,
        <a href="#">Patient Stories</a>,
        <a href="#">Careers</a>,
      ],
    },
    {
      reviews: [
        <CQCBlock
          link={<a href="#">CQCBlock</a>}
          title="Care Quality Commission verified"
          text="All our hospitals are rated Good or Oustanding."
          icon={<Icons iconName="iconCheckCircle"></Icons>}
          logo={{
            dark: (
              <Image
                src="/cqc-white.png"
                alt="cqc logo"
                width="120"
                height="37"
              />
            ),
            light: (
              <Image
                src="/cqc-color.png"
                alt="cqc logo"
                width="120"
                height="37"
              />
            ),
          }}
        />,
        <CQCBlock
          link={<a href="#">CQCBlock2</a>}
          title="Care Quality Commission"
          text="All our hospitals are rated Good or Oustanding."
          icon={<Icons iconName="iconCheckCircle"></Icons>}
          logo={{
            dark: (
              <Image
                src="/cqc-white.png"
                alt="cqc logo"
                width="120"
                height="37"
              />
            ),
            light: (
              <Image
                src="/cqc-color.png"
                alt="cqc logo"
                width="120"
                height="37"
              />
            ),
          }}
        />,
      ],
    },
  ],
  legals: [
    <a href="#">Privacy Policy</a>,
    <a href="#">Modern Slavery</a>,
    <a href="#">Gender Pay Gap</a>,
    <a href="#">Cookie Settings</a>,
  ],
};

describe('Footer', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Footer {...mockProps} />);
    expect(getByText('Our HCA Story')).toBeVisible();
    expect(getByText('Care Quality Commission verified')).toBeVisible();
    expect(getByText('CQCBlock')).toBeVisible();
    expect(getByText('Cookie Settings')).toBeVisible();
  });
});
