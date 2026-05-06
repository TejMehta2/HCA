/* eslint-disable prettier/prettier */
import React, { type JSX } from 'react';
import { AccordionsBlockProps } from './AccordionsBlock.types';
import styles from './AccordionsBlock.module.scss';
import Accordions from '../../components/Accordions/Accordions';
import Themes from '../../foundation/Themes/Themes';
import AdvancedBlockHeader from '../../components/AdvancedBlockHeader/AdvancedBlockHeader';

const AccordionsBlock = (props: AccordionsBlockProps): JSX.Element => {
  const { theme, subtitle, header, body, accordions, ctas, id, tableOfContentTitle } = props;

  return (
    <Themes theme={theme} id={id} tableOfContentTitle={tableOfContentTitle}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.content}>
            <AdvancedBlockHeader
              subtitle={subtitle}
              title={header}
              body={body}
              ctas={ctas}
            >
              <Accordions accordions={accordions} />
            </AdvancedBlockHeader>
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default AccordionsBlock;
