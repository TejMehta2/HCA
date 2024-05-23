/* eslint-disable react/jsx-key */
import React from 'react';
import Footer from './Footer';
import type { Meta, StoryObj } from '@storybook/react';
import Icons from '../../foundation/Icons/Icons';
import CQCBlock from '../../components/CQCBlock/CQCBlock';
import Image from 'next/image';
import Button from '../../core-components/Button/Button';
import Doctify from '../../components/Doctify/Doctify';
import Text from '../../foundation/Text/Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Footer> = {
  title: 'site-components/Footer',
  component: Footer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Footer> = {
  args: {
    copyright: (
      <Text variation={'body-small'}>
        HCA International Limited. Registered number: 03020522. A Company
        Registered in England and Wales. Registered office: 2 Cavendish Square,
        London, W1G 0PU  ©Copyright 2024 - HCA Healthcare UK
      </Text>
    ),
    buttons: (
      <>
        <Button size={'small'} variation={'outline'}>
          <a href="#">
            <Icons iconName="iconMobile" />
            <span>
              App <strong>download</strong>
            </span>
          </a>
        </Button>
        <Button size={'small'} variation={'outline'}>
          <a href="#">
            <Icons iconName="iconRedo" />
            <span>
              Get a <strong>second opinion</strong>
            </span>
          </a>
        </Button>
        <Button size={'small'} variation={'outline'}>
          <a href="#">
            <Icons iconName="iconStethoscope" />
            <span>
              Find a <strong>doctor</strong>
            </span>
          </a>
        </Button>
        <Button size={'small'} variation={'outline'}>
          <a href="#">
            <Icons iconName="iconCreditCard" />
            <span>
              Pay my <strong>bill</strong>
            </span>
          </a>
        </Button>
        <Button size={'small'} variation={'outline'}>
          <a href="#">
            <Icons iconName="iconMobile" />
            <span>
              App <strong>download</strong>
            </span>
          </a>
        </Button>
        <Button size={'small'} variation={'outline'}>
          <a href="#">
            <Icons iconName="iconRedo" />
            <span>
              Get a <strong>second opinion</strong>
            </span>
          </a>
        </Button>
        <Button size={'small'} variation={'outline'}>
          <a href="#">
            <Icons iconName="iconStethoscope" />
            <span>
              Find a <strong>doctor</strong>
            </span>
          </a>
        </Button>
        <Button size={'small'} variation={'outline'}>
          <a href="#">
            <Icons iconName="iconCreditCard" />
            <span>
              Pay my <strong>bill</strong>
            </span>
          </a>
        </Button>
        <Button size={'small'} variation={'outline'}>
          <a href="#">
            <Icons iconName="iconCreditCard" />
            <span>
              Pay my <strong>bill</strong>
            </span>
          </a>
        </Button>
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
  },
};
