// These Types correspond with CMS options
// They should be synchronized by back end developers when CMS options are updated/added
// This allows for type safety in integrated component props
export type Theme =
  | 'D-HCA-Teal'
  | 'F-HCA-Fern'
  | 'I-HCA-Goldenrod'
  | 'D-HCA-Light-Orange'
  | 'B-HCA-Navy-Blue'
  | 'A-HCA-White'
  | 'G-HCA-Green-40'
  | 'K-HCA-Fern-20'
  | 'I-HCA-Turquoise-20'
  | 'J-HCA-Turquoise-10'
  | 'L-HCA-Teal-5'
  | 'G-HCA-Orange';

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingSize =
  | 'display-1'
  | 'display-2'
  | 'display-3'
  | 'display-4'
  | 'display-5'
  | 'display-6';
