import { type JSX } from 'react';
export interface VideoHeroProps {
  title?: JSX.Element;
  subtitle?: JSX.Element;
  copy?: JSX.Element;
  children?: JSX.Element;
  image?: JSX.Element;
  videoSrc?: string;
  videoAspectRatio?: number;
}
