import React from 'react';
import { SpacingProps } from './Spacing.demo.types';
import styles from './Spacing.demo.module.scss';
const Spacing = (props: SpacingProps): JSX.Element => {
  const {} = props;
  return (
    <ul>
      {Array(14)
        .fill(0)
        .map((_, index) => (
          <li
            key={`demo-spacing-${index + 1}`}
            className={styles[`demo-spacing-${index + 1}`]}
          >
            Spacing {index + 1}
          </li>
        ))}
    </ul>
  );
};

export default Spacing;
