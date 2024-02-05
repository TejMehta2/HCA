import React, { useState, useEffect } from 'react';
import { SearchWrapperProps } from './SearchWrapper.types';
import styles from './SearchWrapper.module.scss';
import Themes from '../../foundation/Themes/Themes';
import Tabs from '../../core-components/Tabs/Tabs';
import { Tab } from '../../core-components/Tabs/Tabs.types';

const SearchWrapper = (props: SearchWrapperProps): JSX.Element => {
  const {
    header,
    children,
    searchDetail,
    showing,
    theme = 'F-HCA-White',
    tabbedResults,
  } = props;

  const [active, setActive] = useState<number>(0);
  const [tabContent, setTabContent] = useState(
    tabbedResults && tabbedResults[0].tabContent
  );

  const tabs: Tab[] = [];
  tabbedResults?.map((item) => {
    tabs.push(item.tab);
  });

  const tabChangeHandler = (newLabel: string) => {
    const newIndex = tabbedResults?.findIndex(
      (tabContent) => tabContent.tab.label === newLabel
    );

    if (typeof newIndex === 'number') {
      setActive(newIndex);
    }
  };

  useEffect(() => {
    setTabContent(tabbedResults && tabbedResults[active].tabContent);
  }, [active, tabbedResults]);

  return (
    <Themes theme={theme}>
      <div className={styles.wrapper}>
        <div className={styles.header}>{header}</div>
        <div className={styles['results-header']}>
          <div className={styles['search-detail']}>
            {searchDetail && <div>{searchDetail}</div>}
            {showing && <div>{showing}</div>}
          </div>
          {tabbedResults && (
            <Tabs tabs={tabs} callback={tabChangeHandler}></Tabs>
          )}
        </div>

        {tabbedResults
          ? tabContent
          : children && <div className={styles.children}>{children}</div>}
      </div>
    </Themes>
  );
};

export default SearchWrapper;
