import React, { useRef, useState } from 'react';
import { VideoHeroProps } from './VideoHero.types';
import styles from './VideoHero.module.scss';
import TextButton from '../../core-components/TextButton/TextButton';

const VideoHero = (props: VideoHeroProps): JSX.Element => {
  const {
    title,
    copy,
    children,
    image,
    subtitle,
    videoSrc,
    videoAspectRatio = 16 / 9,
  } = props;
  const [iframeState, setIframeState] = useState<'' | 'playing' | 'paused'>('');

  const isYoutube =
    videoSrc?.includes('youtube') || videoSrc?.includes('youtu.be');
  const videoUrl = videoSrc ? new URL(videoSrc) : null;

  if (isYoutube) {
    videoUrl?.searchParams.append('autoplay', '1');
    videoUrl?.searchParams.append('loop', '1');
    videoUrl?.searchParams.append('mute', '1');
    videoUrl?.searchParams.append('showinfo', '0');
  } else {
    videoUrl?.searchParams.append('background', '1');
    videoUrl?.searchParams.append('muted', '1');
    videoUrl?.searchParams.append('api', '1');
  }

  const iframeRef = useRef(null);

  return (
    <div
      className={styles.outer}
      style={{ ['--aspect-ratio' as string]: videoAspectRatio }}
    >
      {image && <div className={styles.image}>{image}</div>}
      {videoUrl && (
        <div className={[styles.video, styles[iframeState]].join(' ')}>
          <iframe
            onLoad={() => setIframeState('playing')}
            ref={iframeRef}
            aria-hidden="true"
            src={videoUrl.href}
            allow="autoplay"
            data-ready="true"
          ></iframe>
        </div>
      )}
      <div className={styles.overlay}></div>
      <div className={styles.inner}>
        <div className={styles.content}>
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
          {title && <div className={styles.title}>{title}</div>}
          {copy && <div className={styles.copy}>{copy}</div>}
          {children && <div className={styles.children}>{children}</div>}
        </div>
      </div>
      <div className={styles.toggle}>
        {!!iframeState && (
          <TextButton>
            <button
              onClick={() => {
                const iframe = iframeRef?.current as HTMLIFrameElement | null;
                if (!iframe) return;
                iframe.contentWindow?.postMessage(
                  JSON.stringify({
                    method: iframeState === 'playing' ? 'pause' : 'play',
                  }),
                  '*'
                );
                setIframeState(
                  iframeState === 'playing' ? 'paused' : 'playing'
                );
              }}
            >
              {iframeState === 'playing' ? 'Pause video' : 'Unpause video'}
            </button>
          </TextButton>
        )}
      </div>
    </div>
  );
};

export default VideoHero;
