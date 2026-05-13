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
    const isScreenM = width > 600;

    const isYoutube = videoUrl.includes('youtube.com');

    const url = new URL(videoUrl);

    // Preserve existing params and just add/update
    url.searchParams.set('autoplay', '1');
    url.searchParams.set(isYoutube ? 'mute' : 'muted', '1');

    if (!isScreenM) {
      url.searchParams.set('playsinline', '0');
    }

    // ensure enablejsapi stays
    if (isYoutube) {
      url.searchParams.set('enablejsapi', '1');
    }

    setVideoSrc(url.toString());
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
          <Button variation="play" size="small">
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
