import type { StorybookConfig } from '@storybook/nextjs-vite';
import { createRequire } from 'module';
import { dirname, join } from 'path';
import svgr from 'vite-plugin-svgr';

const require = createRequire(import.meta.url);

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: [
    '../poc/**/*.mdx',
    '../poc/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../foundation/**/*.mdx',
    '../foundation/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../core-components/**/*.mdx',
    '../core-components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../components/**/*.mdx',
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../careers/**/*.mdx',
    '../careers/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../site-components/**/*.mdx',
    '../site-components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../consultant-finder/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../consultant-finder/**/*.mdx',
    '../the-birth-company/**/*.mdx',
    '../the-birth-company/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../yext/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../yext/**/*.mdx',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-vitest'),
  ],
  staticDirs: ['../assets/images'],
  framework: {
    name: getAbsolutePath('@storybook/nextjs-vite'),
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal(config) {
    config.plugins = [
      ...(config.plugins ?? []),
      svgr({
        include: '**/*.svg?react',
      }),
    ];

    return config;
  },
};

export default config;
