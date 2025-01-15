import Params from 'src/types/params';

export interface NavigableComponent {
  TableOfContentsLinkTitle?: string | undefined;
  Id: string | undefined;
}

export interface TableOfContentsProps {
  params?: Params;
}
