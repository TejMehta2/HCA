import React from 'react';
import { AboutProps } from './About.types';
import styles from './About.module.scss';
import Text from '../../foundation/Text/Text';

const About = (props: AboutProps): JSX.Element => {
  const { children } = props;
  return (
    <div className={styles.about}>
      <div className={styles.reviews}>{children}</div>
      <div className={styles.headline}>
        <Text tag="h2" variation="heading-1">
          {props.title}
        </Text>
      </div>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: props.description }}
      ></div>
    </div>
  );
};

export default About;
