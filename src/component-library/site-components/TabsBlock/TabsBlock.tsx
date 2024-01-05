import React from 'react';
import { TabsBlockProps } from './TabsBlock.types';
import styles from './TabsBlock.module.scss';
import Themes from '../../foundation/Themes/Themes';
import Tabs from '../../core-components/Tabs/Tabs';

const TabsBlock = (props: TabsBlockProps): JSX.Element => {
  const { theme, title, tabs /*, tabsContent */ } = props;

  const tabChangeHandler = (newLabel: string) => {
    console.log(newLabel);
  };

  return (
    <Themes theme={theme}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.heading}>{title}</div>
          <Tabs tabs={tabs} callback={tabChangeHandler} />
          <div>CONTENT</div>
        </div>
      </div>
    </Themes>
  );
};

export default TabsBlock;
