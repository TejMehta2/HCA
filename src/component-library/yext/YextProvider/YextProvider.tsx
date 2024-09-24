import * as React from 'react';
import {
  GetPath,
  TemplateProps,
  GetHeadConfig,
  HeadConfig,
  TemplateRenderProps,
  // eslint-disable-next-line
  // @ts-ignore
} from '@yext/pages';

import '@yext/search-ui-react/bundle.css';
//import './styles/bundle.css'; // TODO - switch out for node_modules version as above, work around workspaces limitation
import {
  SearchHeadlessProvider,
  provideHeadless,
  HeadlessConfig,
  Environment,
} from '@yext/search-headless-react';

export const getPath: GetPath<TemplateProps> = () => {
  return 'search';
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: `HCA Search`,
    charset: 'UTF-8',
    viewport: 'width=device-width, initial-scale=1',
  };
};

const environment = process.env
  .NEXT_PUBLIC_YEXT_ENVIRONMENT! as keyof typeof Environment;

export const headlessConfig: HeadlessConfig = {
  apiKey: process.env.NEXT_PUBLIC_YEXT_API_KEY!,
  experienceKey: process.env.NEXT_PUBLIC_YEXT_EXPERIENCE_KEY!,
  locale: 'en_GB',
  environment: Environment[environment],
};

const searcher = provideHeadless(headlessConfig);

interface SearchProps {
  children: JSX.Element;
}
const YextProvider = (props: SearchProps) => {
  const { children } = props;
  return (
    <SearchHeadlessProvider searcher={searcher}>
      {children}
    </SearchHeadlessProvider>
  );
};

export default YextProvider;
