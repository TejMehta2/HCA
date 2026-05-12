'use client';

import React, { useRef, useState, type JSX } from 'react';
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

  const isYoutube =
    videoSrc?.includes('youtube') || videoSrc?.includes('youtu.be');

  const [iframeState, setIframeState] = useState<'' | 'playing' | 'paused'>(
    videoSrc ? 'playing' : ''
  );

  const videoUrl = videoSrc ? new URL(videoSrc) : null;

  if (isYoutube) {
    videoUrl?.searchParams.append('autoplay', '1');
    videoUrl?.searchParams.append('mute', '1');
    videoUrl?.searchParams.append('showinfo', '0');
    videoUrl?.searchParams.append('rel', '0');
    videoUrl?.searchParams.append('enablejsapi', '1');

    // Enable looping via playlist hack
    videoUrl?.searchParams.append('loop', '1');
    const youtubeId = videoSrc?.match(/embed\/([^?]+)/)?.[1] || '';
    videoUrl?.searchParams.append('playlist', youtubeId);
  } else {
    videoUrl?.searchParams.append('background', '1');
    videoUrl?.searchParams.append('muted', '1');
    videoUrl?.searchParams.append('api', '1');
    videoUrl?.searchParams.append('loop', '1');
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
            seamless
          ></iframe>
        </div>
      )}
      <div className={styles.overlay}></div>
      <div className={styles.inner}>
        <div className={styles.content}>
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
          {title && <div className={styles.title}>{title}</div>}
          {copy && <div className={styles.copy}>{copy}</div>}
        </div>
        {children && <div className={styles.children}>{children}</div>}
      </div>
      <div className={styles.toggle}>
        {!!iframeState && (
          <TextButton>
            <button
              onClick={() => {
                const iframe = iframeRef?.current as HTMLIFrameElement | null;
                if (!iframe) return;
                const playMethod = isYoutube ? 'playVideo' : 'play';
                const pauseMethod = isYoutube ? 'pauseVideo' : 'pause';
                const method =
                  iframeState === 'playing' ? pauseMethod : playMethod;
                const packet = isYoutube
                  ? {
                      event: 'command',
                      func: method,
                    }
                  : {
                      method,
                    };
                iframe.contentWindow?.postMessage(JSON.stringify(packet), '*');
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
