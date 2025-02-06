import React from 'react';
import { StatsCardsProps } from './StatsCards.types';
import styles from './StatsCards.module.scss';
import Themes from '../../foundation/Themes/Themes';
import Text from '../../foundation/Text/Text';

const StatsCards = (props: StatsCardsProps): JSX.Element => {
  const {
    theme = 'A-HCA-White',
    id,
    header,
    subheader,
    bodyCopy,
    stats,
  } = props;
  return (
    <Themes theme={theme} id={id}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.text}>
            <div>{subheader}</div>
            <div className={styles['header']}>{header}</div>
            <div className={styles['body-copy']}>{bodyCopy}</div>
          </div>
          <div className={styles.stats}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.stat}>
                <Text tag="p" variation="display-1">
                  {stat.stat}
                </Text>
                <Text tag="p" variation="body-large">
                  {stat.text}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default StatsCards;
