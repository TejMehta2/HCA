import React, { type JSX } from 'react';
import { VideoBlockProps } from './VideoBlock.types';
import styles from './VideoBlock.module.scss';
import Themes from '../../foundation/Themes/Themes';

const VideoBlock = (props: VideoBlockProps): JSX.Element => {
  const {
    video,
    header,
    theme = 'A-HCA-White',
    variation = 'standard',
    id,
    tableOfContentTitle
  } = props;
  return (
    <Themes theme={theme} id={id} tableOfContentTitle={tableOfContentTitle}>
      <div className={[styles.wrapper, styles[variation]].join(' ')}>
        <div className={styles.content}>
          <div className={styles.header}>{header}</div>
          {video && <div className={styles.video}>{video}</div>}
        </div>
      </div>
    </Themes>
  );
};

export default VideoBlock;
