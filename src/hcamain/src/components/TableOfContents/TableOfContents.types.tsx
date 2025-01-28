import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
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
