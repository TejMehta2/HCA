// These Types correspond with CMS options
// They should be synchronized by back end developers when CMS options are updated/added
// This allows for type safety in integrated component props
export type Theme =
  | 'A-HCA-Main-Turquoise'
  | 'B-HCA-Green'
  | 'C-HCA-Beige'
  | 'D-HCA-Light-Orange'
  | 'E-HCA-Dark-Grey'
  | 'F-HCA-White'
  | 'G-HCA-Green-40'
  | 'H-HCA-Green-20'
  | 'I-HCA-Turquoise-20'
  | 'J-HCA-Turquoise-10'
  | 'K-HCA-Turquoise-5'
  | 'L-HCA-Coral-60';

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingSize =
  | 'display-1'
  | 'display-2'
  | 'display-3'
  | 'display-4'
  | 'display-5'
  | 'display-6';
