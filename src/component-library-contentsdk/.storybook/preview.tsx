import type { Preview } from '@storybook/nextjs-vite';
import "../globals/index.scss";
import React from 'react';
import YextProvider from '../yext/YextProvider/YextProvider'
import { NextIntlClientProvider } from 'next-intl';

const customViewports = {
  small: {
    name: 'Small',
    styles: {
      width: '390px',
      height: '844px',
    },
  },
  Medium: {
    name: 'Medium',
    styles: {
      width: '600px',
      height: '963px',
    },
  },
  Large: {
    name: 'Large',
    styles: {
      width: '1280px',
      height: '820px',
    },
  },
  XLarge: {
    name: 'XLarge',
    styles: {
      width: '1440px',
      height: '900px',
    },
  },
};

const preview: Preview = {
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en-GB" messages={{ sync: {} }}>
        <YextProvider>
          <Story />
        </YextProvider>
      </NextIntlClientProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: { order: ["Foundation", "Core Components", "Components"] },
    },
    viewport: { viewports: customViewports },
  },  
};

export default preview;
