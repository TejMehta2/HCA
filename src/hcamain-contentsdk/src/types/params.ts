// These Types correspond with CMS options
// They should be synchronized by back end developers when CMS options are updated/added
// This allows for type safety in integrated component props
export type Theme =
  | 'A-HCA-White'
  | 'B-HCA-Navy-Blue'
  | 'C-HCA-Denim'
  | 'D-HCA-Teal'
  | 'E-HCA-Cerulean'
  | 'F-HCA-Fern'
  | 'G-HCA-Orange'
  | 'H-HCA-Tangerine'
  | 'I-HCA-Goldenrod'
  | 'J-HCA-Tangerine-20'
  | 'K-HCA-Fern-20'
  | 'L-HCA-Teal-5'
  | 'M-HCA-Goldenrod-20'
  | 'N-HCA-Denim-5';

export const darkThemes = [
  'B-HCA-Navy-Blue',
  'C-HCA-Denim',
  'Palace-Grey',
  'Chelsea-Navy-Blue',
  'Alan-Black',
] as const;

export type DarkTheme = (typeof darkThemes)[number];

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingSize =
  | 'display-1'
  | 'display-2'
  | 'display-3'
  | 'display-4'
  | 'display-5'
  | 'display-6';

interface Params {
  styles?: string;
  Theme?: Theme;
  CardTheme?: Theme; // Appears only on search components
  HeadingTag?: HeadingTag;
  HeadingSize?: HeadingSize;
  DynamicPlaceholderId?: string;
  Columns?: '2' | '3' | '4';
  Containerized?: '1' | '0'; // Appears only on RichText related components
  KeepAspectRatio?: '1' | '0'; // Appears only on images in IntroBlock, BlogImage and ImageAndTextBlock
  ExcludeFromTableOfContents?: '1' | '0';
  TableOfContentsLinkTitle?: string;
  DisableHeadersToggle?: '1' | '0'; // Appears only on images in IntroBlock and ImageAndTextBlock
  HeadingBeforeTitle?: '1' | '0';
  NoLogo?: '1' | '0';
  ExtractH2Links?: '1' | '0'; //Used on Blog Text to extrat Table of contents links directly from content
}
export default Params;
