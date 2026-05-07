import { Field, ImageField } from '@sitecore-content-sdk/nextjs';
import { ComponentWithContextProps } from 'lib/component-props';
import Params from 'src/types/params';

export interface Fields {
  data?: {
    item?: {
      title?: { jsonValue?: Field<string> };
      defaultNavigationImage?: { jsonValue: ImageField };
      rootPage?: {
        targetItem?: NavigablePagesFields & {
          children?: {
            results?: NavigablePagesFields[];
          };
        };
      };
      includeRootPage?: { boolValue: boolean };
    };
  };
}

export interface NavigablePagesFields {
  id: string;
  navigationTitle?: { value?: string };
  abstractTitle?: { value?: string };
  abstractImage?: { jsonValue: ImageField };
  title?: { value?: string };
  image?: { jsonValue: ImageField };
  url?: { path?: string };
  hideInSubNavigation: { boolValue: boolean };
}

export type SubNavigationProps = ComponentWithContextProps & {
  params?: Params;
  fields?: Fields;
};

export interface PageRouteData {
  itemId?: string;
}
