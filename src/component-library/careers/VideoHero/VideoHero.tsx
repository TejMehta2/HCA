import React, { useRef, useState, useMemo } from 'react';
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

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoState, setVideoState] = useState<
    '' | 'playing' | 'paused'
  >(videoSrc ? 'playing' : '');

  const isYoutube =
    !!videoSrc &&
    (videoSrc.includes('youtube.com') ||
      videoSrc.includes('youtu.be'));

  const isVimeo =
    !!videoSrc &&
    videoSrc.includes('vimeo.com');

  const useIframe = isYoutube || isVimeo;

  const embedUrl = useMemo(() => {
    if (!videoSrc || !useIframe) return null;

    let url = videoSrc;

    // Convert YouTube watch/share URLs - embed URL
    if (isYoutube) {
      const youtubeId =
        videoSrc.match(
          /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/,
        )?.[1] ||
        videoSrc.match(/embed\/([^?]+)/)?.[1];

      url = `https://www.youtube.com/embed/${youtubeId}`;

      const embed = new URL(url);

      embed.searchParams.set('autoplay', '1');
      embed.searchParams.set('mute', '1');
      embed.searchParams.set('controls', '0');
      embed.searchParams.set('loop', '1');
      embed.searchParams.set('playlist', youtubeId || '');
      embed.searchParams.set('enablejsapi', '1');
      embed.searchParams.set('rel', '0');

      return embed.href;
    }

    // Vimeo
    if (isVimeo) {
      const embed = new URL(videoSrc);

      embed.searchParams.set('background', '1');
      embed.searchParams.set('muted', '1');
      embed.searchParams.set('loop', '1');
      embed.searchParams.set('autoplay', '1');

      return embed.href;
    }

    return url;
  }, [videoSrc, isYoutube, isVimeo, useIframe]);

  const togglePlayback = () => {
    if (useIframe) {
      const iframe = iframeRef.current;
      if (!iframe) return;

      if (isYoutube) {
        iframe.contentWindow?.postMessage(
          JSON.stringify({
            event: 'command',
            func:
              videoState === 'playing'
                ? 'pauseVideo'
                : 'playVideo',
            args: [],
          }),
          '*'
        );
      }

      if (isVimeo) {
        iframe.contentWindow?.postMessage(
          {
            method:
              videoState === 'playing'
                ? 'pause'
                : 'play',
          },
          '*'
        );
      }

      setVideoState(
        videoState === 'playing'
          ? 'paused'
          : 'playing'
      );

      return;
    }

    // Native video
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setVideoState('playing');
    } else {
      video.pause();
      setVideoState('paused');
    }
  };

  return (
    <div
      className={styles.outer}
      style={{
        ['--aspect-ratio' as string]:
          videoAspectRatio,
      }}
    >
      {image && (
        <div className={styles.image}>
          {image}
        </div>
      )}

      {videoSrc && (
        <div
          className={[
            styles.video,
            styles[videoState],
          ].join(' ')}
        >
          {useIframe ? (
            <iframe
              ref={iframeRef}
              src={embedUrl || ''}
              onLoad={() =>
                setVideoState('playing')
              }
              allow="autoplay; fullscreen"
              allowFullScreen
              aria-hidden="true"
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onPlay={() =>
                setVideoState('playing')
              }
              onPause={() =>
                setVideoState('paused')
              }
            >
              <source
                src={videoSrc}
                type="video/mp4"
              />
            </video>
          )}
        </div>
      )}

      <div className={styles.overlay} />

      <div className={styles.inner}>
        <div className={styles.content}>
          {subtitle && (
            <div className={styles.subtitle}>
              {subtitle}
            </div>
          )}

          {title && (
            <div className={styles.title}>
              {title}
            </div>
          )}

          {copy && (
            <div className={styles.copy}>
              {copy}
            </div>
          )}
        </div>

        {children && (
          <div className={styles.children}>
            {children}
          </div>
        )}
      </div>

      {!!videoState && (
        <div className={styles.toggle}>
          <TextButton>
            <button onClick={togglePlayback}>
              {videoState === 'playing'
                ? 'Pause video'
                : 'Play video'}
            </button>
          </TextButton>
        </div>
      )}
    </div>
  );
};

export default VideoHero;