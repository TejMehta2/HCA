import {
  ComponentRendering,
  Field,
  Item,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

export interface Component extends ComponentRendering {
  params: {
    TableOfContentsLinkTitle: string;
    ExcludeFromTableOfContents?: '0' | '1';
  };
  fields?: {
    Title?: {
      value: string;
    };
    data?: Item & {
      item?: {
        title?: { jsonValue?: Field<string> };
      };
    };
  };
}

export interface Result {
  componentName: string;
  TableOfContentsLinkTitle?: string | undefined;
  TitleValue: string | undefined;
}

export interface TableOfContentsProps {
  params?: Params;
}
