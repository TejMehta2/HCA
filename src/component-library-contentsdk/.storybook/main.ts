import type { StorybookConfig } from "@storybook/nextjs";
import { RuleSetRule} from 'webpack'

import { join, dirname } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: [
    "../poc/**/*.mdx",
    "../poc/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../foundation/**/*.mdx",
    "../foundation/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../core-components/**/*.mdx",
    "../core-components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../components/**/*.mdx",
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../careers/**/*.mdx",
    "../careers/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../site-components/**/*.mdx",
    "../site-components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../site-components/**/*.mdx",
    "../consultant-finder/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../consultant-finder/**/*.mdx",
    "../the-birth-company/**/*.mdx",
    "../the-birth-company/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../yext/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../yext/**/*.mdx",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-a11y"),
  ],
  staticDirs: ['../assets/images'],
  framework: {
    //name: getAbsolutePath("@storybook/react-webpack5"),
    name: getAbsolutePath("@storybook/nextjs"),
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async webpackFinal(config, { configType }) {
    if (!config?.module?.rules) return config
    const rules = config.module.rules as RuleSetRule[]

    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = rules.find((rule) => {
      const test = rule?.test as RegExp
      return test?.test?.('.svg')
    })

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i
    }

    return config
  },
};
export default config;
