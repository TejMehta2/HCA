import React, { type JSX } from 'react';
import { AboutProps } from './About.types';
import styles from './About.module.scss';
import Text from '../../foundation/Text/Text';

const About = (props: AboutProps): JSX.Element => {
  return (
    <div className={styles.about}>
      {props.title && (
        <div className={styles.headline}>
          <Text tag="h2" variation="heading-1">
            {props.title}
          </Text>
        </div>
      )}
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: props.description }}
      ></div>
    </div>
  );
};

export default About;
