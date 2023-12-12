import type { Preview } from "@storybook/react";
import "../globals/index.scss";

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
      width: '1180px',
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
