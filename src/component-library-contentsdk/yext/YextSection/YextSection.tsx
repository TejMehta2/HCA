import React, { type JSX } from 'react';
import { YextSectionProps } from './YextSection.types';
import styles from './YextSection.module.scss';
import Text from '../../foundation/Text/Text';

const YextSection = (props: YextSectionProps): JSX.Element => {
  const { results, header, CardComponent } = props;
  return (
    <div className={styles.wrapper}>
      <Text variation={'heading-1'} tag={'div'}>
        {header.props.label}
      </Text>
      {results.map((result, index) => (
        <CardComponent key={index} result={result} />
      ))}
    </div>
  );
};

export default YextSection;
