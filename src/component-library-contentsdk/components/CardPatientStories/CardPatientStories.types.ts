import { type JSX } from 'react';
export interface CardPatientStoriesProps {
  image?: JSX.Element;
  title: JSX.Element;
  bodyCopy?: JSX.Element;
  link: JSX.Element;
  contentVariation?: 'mixed';
}
