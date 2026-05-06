import React, {
  useState,
  useEffect,
  forwardRef,
  MutableRefObject,
  type JSX,
} from 'react';
import { SearchWrapperProps } from './SearchWrapper.types';
import styles from './SearchWrapper.module.scss';
import Tabs from '../../core-components/Tabs/Tabs';
import { Tab } from '../../core-components/Tabs/Tabs.types';

const SearchWrapper = (
  props: SearchWrapperProps,
  ref: MutableRefObject<HTMLDivElement | null>
): JSX.Element => {
  const { children, searchDetail, showing, tabbedResults } = props;

  const [active, setActive] = useState<number>(0);
  const [tabContent, setTabContent] = useState(
    tabbedResults && tabbedResults[0].tabContent
  );

  const tabs: Tab[] = [];
  tabbedResults?.map((item) => {
    tabs.push(item.tab);
  });

  const tabChangeHandler = ({ label: newLabel }: { label: string }) => {
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
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles['results-header']}>
          <div className={styles['search-detail']} ref={ref}>
            {searchDetail && searchDetail}
            {showing && <div>{showing}</div>}
          </div>
          {tabbedResults && (
            <Tabs tabs={tabs} callback={tabChangeHandler}></Tabs>
          )}
        </div>
        {tabbedResults ? tabContent : children}
      </div>
    </div>
  );
};

export default forwardRef(SearchWrapper);
