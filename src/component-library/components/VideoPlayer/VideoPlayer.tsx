import React, { useState } from 'react';
import { VideoPlayerProps } from './VideoPlayer.types';
import styles from './VideoPlayer.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Button from '../../core-components/Button/Button';

const VideoPlayer = (props: VideoPlayerProps): JSX.Element => {
  const { videoUrl, overlayImage } = props;

  const [videoSrc, setVideoSrc] = useState(videoUrl);
  const [hideOverlay, sethideOverlay] = useState(false);

  const handlePlay = () => {
    const width = window.innerWidth;
    //  medium screen breakpoint
    const isScreenM = width > 600;
    //  mute is required by most browsers to autoplay
    const isYoutube = videoSrc.includes('www.youtube.com');
    const muteParam = isYoutube ? 'mute' : 'muted';
    //  this will only apply on mobile browsers
    const fullscreenParam = !isScreenM ? '&playsinline=0' : '';

    setVideoSrc(`${videoSrc}?autoplay=1&${muteParam}=1&${fullscreenParam}`);
    sethideOverlay(true);
  };

  return (
    <div className={styles.player}>
      <div
        className={[styles.overlay, hideOverlay ? styles['hide'] : ''].join(
          ' '
        )}
      >
        {overlayImage}
        <div className={styles.play}>
          <Button theme="play" size="small">
            <button onClick={handlePlay} className={styles['overlay-button']}>
              <Icons iconName={'iconPlay'}></Icons>
              <span className="sr-only">Play video</span>
            </button>
          </Button>
        </div>
      </div>

      <iframe
        src={videoSrc}
        allow="autoplay; fullscreen"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
