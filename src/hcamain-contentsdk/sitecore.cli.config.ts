import { defineCliConfig } from '@sitecore-content-sdk/nextjs/config-cli';
import {
  generateSites,
  generateMetadata,
  extractFiles,
  writeImportMap,
} from '@sitecore-content-sdk/nextjs/tools';
import scConfig from './sitecore.config';

export default defineCliConfig({
  config: scConfig,
  build: {
    commands: [
      generateMetadata(),
      generateSites(),
      extractFiles(),
      writeImportMap({
        paths: ['src/components'],
        exclude: ['src/components/**/CardWithModal.tsx'],
      }),
    ],
  },
  componentMap: {
    paths: ['src/components'],
    exclude: [
      'src/components/content-sdk/*',
      'src/components/**/*.types.ts',
      'src/components/**/*.types.tsx',
      'src/components/**/*Types.ts',
      'src/components/**/*Types.tsx',
      'src/components/**/*.utilities.ts',
      'src/components/**/*.utilities.tsx',
      'src/components/**/*.mapping.ts',
      'src/components/**/*.mapping.tsx',
      'src/components/**/*.mapping.GraphQL.ts',
      'src/components/**/*.mapping.GraphQL.tsx',
      'src/components/**/helpers/*',
      'src/components/**/CardWithModal.tsx',
      'src/components/**/response.types.ts',
    ],
  },
});
