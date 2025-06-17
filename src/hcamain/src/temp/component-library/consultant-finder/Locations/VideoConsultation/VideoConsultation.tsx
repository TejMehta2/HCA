/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { VideoConsultationProps } from './VideoConsultation.types';
import styles from './VideoConsultation.module.scss';
import Text from '../../../foundation/Text/Text';
import Icons from '../../../foundation/Icons/Icons';
import TextLink from '../../../core-components/TextLink/TextLink';

const VideoConsultation = (props: VideoConsultationProps): JSX.Element => {
  return (
    <div className={styles['video-consultation']}>
      <div className={styles.title}>
        <Text tag="p" variation="body-medium-extra-large">
          {props.title}
        </Text>
      </div>
      <div className={styles.text}>
        <Text tag="p" variation="body-medium-large">
          {props.text}
        </Text>
      </div>
      <TextLink>
        <a href={`tel:${props.phoneNumber}`}>
          <Icons iconName="iconPhone" />
          <span>{props.displayNumber}</span>
        </a>
      </TextLink>
    </div>
  );
};

export default VideoConsultation;
