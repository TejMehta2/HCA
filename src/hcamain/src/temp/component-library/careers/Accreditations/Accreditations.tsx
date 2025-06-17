import React from 'react';
import { AccreditationsProps } from './Accreditations.types';
import styles from './Accreditations.module.scss';
import Text from '../../foundation/Text/Text';

const Accreditations = (props: AccreditationsProps): JSX.Element => {
  const { items, columns = 2, contentVariation } = props;
  return (
    <div className={[styles.wrapper, styles[`columns-${columns}`]].join(' ')}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {items?.map(({ title, text, logo }, index) => (
            <div
              className={[
                styles.item,
                contentVariation === 'centered' ? styles['item-centered'] : '',
              ].join(' ')}
              key={index}
            >
              <div className={styles.logo}>{logo}</div>
              <div>
                {title && (
                  <div className={styles.title}>
                    <Text variation="heading-2">{title}</Text>
                  </div>
                )}
                <Text variation="body-large" tag="div">
                  {text}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accreditations;
