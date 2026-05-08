import { Field } from '@sitecore-content-sdk/nextjs';
import Params from 'src/types/params';

export interface NavigableComponent {
  TableOfContentsLinkTitle?: string | undefined;
  Id: string | undefined;
}

interface Fields {
  Title?: Field<string>;
}

export interface TableOfContentsProps {
  params?: Params;
  fields?: Fields;
}
