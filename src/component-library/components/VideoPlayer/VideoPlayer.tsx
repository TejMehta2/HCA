import React, { useEffect, useState } from 'react';
import { VideoPlayerProps } from './VideoPlayer.types';
import styles from './VideoPlayer.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Button from '../../core-components/Button/Button';
import useWindowWidth from '../../hooks/useWindowWidth';

const VideoPlayer = (props: VideoPlayerProps): JSX.Element => {
  const { videoUrl, overlayImage } = props;

  const [videoSrc, setVideoSrc] = useState(videoUrl);
  const [hideOverlay, sethideOverlay] = useState(false);
  const [hideOnLoad, sethideOnLoad] = useState(true);

  //  medium screen breakpoint
  const isScreenM = useWindowWidth(600);

  const handlePlay = () => {
    //  mute is required by most browsers to autoplay
    const isYoutube = videoSrc.includes('www.youtube.com');
    const muteParam = isYoutube ? 'mute' : 'muted';
    //  this will only apply one mobile browsers
    const fullscreenParam = !isScreenM ? '&playsinline=0' : '';

    setVideoSrc(`${videoSrc}?autoplay=1&${muteParam}=1&${fullscreenParam}`);
    sethideOverlay(true);
  };

  //  slight delay to account for large images taking time to load
  useEffect(() => {
    setTimeout(() => {
      sethideOnLoad(false);
    }, 1000);
  }, []);

  return (
    <div className={styles.player}>
      <div
        className={[styles.overlay, hideOverlay ? styles['hide'] : ''].join(
          ' '
        )}
      >
        {overlayImage}
        <div className={[styles.play, hideOnLoad ? styles.hide : ''].join(' ')}>
          <Button theme="play" size="small">
            <button onClick={handlePlay} className={styles['overlay-button']}>
              <Icons iconName={'iconPlay'}></Icons>
            </button>
          </Button>
        </div>
      </div>

      <iframe
        src={videoSrc}
        allow="autoplay; fullscreen"
        allowFullScreen
        className={hideOnLoad ? styles.hide : ''}
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
