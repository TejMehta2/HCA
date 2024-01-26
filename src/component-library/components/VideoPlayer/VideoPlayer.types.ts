import { ReactNode } from 'react';

export interface VideoPlayerProps {
  videoUrl: string;
  overlayImage: ReactNode | JSX.Element;
}
