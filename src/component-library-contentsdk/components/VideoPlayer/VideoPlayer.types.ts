import { ReactNode, type JSX } from 'react';

export interface VideoPlayerProps {
  videoUrl: string;
  overlayImage: ReactNode | JSX.Element;
}
