import React, { type JSX } from 'react';
import { MasonryCardProps, MasonryCardsProps } from './MasonryCards.types';
import styles from './MasonryCards.module.scss';
import AdvancedBlockHeader from '../../components/AdvancedBlockHeader/AdvancedBlockHeader';
import Themes from '../../foundation/Themes/Themes';

export const MasonryCard = (props: MasonryCardProps): JSX.Element => {
  const { title, copy, cta, image, rows, columns } = props;
  return (
    <div
      style={{ ['--rows' as string]: rows, ['--columns' as string]: columns }}
      className={styles.card}
    >
      <div className={styles.image}>{image}</div>
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        {copy && <div className={styles.copy}>{copy}</div>}
        {cta && <div className={styles.cta}>{cta}</div>}
      </div>
    </div>
  );
};

const MasonryCards = (props: MasonryCardsProps): JSX.Element => {
  const {
    subtitle,
    title,
    children,
    id,
    cta,
    body,
    theme = 'A-HCA-White',
    tableOfContentTitle
  } = props;
  return (
    <Themes theme={theme} id={id} tableOfContentTitle={tableOfContentTitle}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <AdvancedBlockHeader
            paddingSize="none"
            subtitle={subtitle}
            title={title}
            ctas={cta}
            body={body}
          >
            {children && <div className={styles.children}>{children}</div>}
          </AdvancedBlockHeader>
        </div>
      </div>
    </Themes>
  );
};

export default MasonryCards;
