'use client';

import React, { useRef, type JSX } from 'react';
import { TabsBlockProps } from './TabsBlock.types';
import styles from './TabsBlock.module.scss';
import Themes from '../../foundation/Themes/Themes';
import Tabs from '../../core-components/Tabs/Tabs';
import Slider, { Settings } from '@ant-design/react-slick';
import { Tab } from '../../core-components/Tabs/Tabs.types';

const TabsBlock = (props: TabsBlockProps): JSX.Element => {
  const { theme = 'D-HCA-Teal', title, tabsContent = [], id, tableOfContentTitle } = props;
  const sliderRef = useRef<Slider>(null);

  /* Carousel settings */
  const settings: Settings = {
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    swipe: false,
    arrows: false,
    waitForAnimate: false,
    accessibility: false,
    className: styles['slick-wrapper'],
  };

  const tabChangeHandler = ({ label: newLabel }: { label: string }) => {
    const newIndex = tabsContent.findIndex(
      (tabContent) => tabContent.tab.label === newLabel
    );
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(newIndex);
    }
  };

  const tabs: Tab[] = [];
  const tabsContainer = tabsContent.map((tabContent, index) => {
    tabs.push(tabContent.tab);

    return (
      <div key={index} className={styles['tab-wrapper']}>
        <div className={styles['tab-content']}>
          {tabContent.image}
          <div>
            {tabContent.title}
            {tabContent.bodyCopy}
          </div>
        </div>
      </div>
    );
  });

  const slider = (
    // eslint-disable-next-line
    // @ts-ignore
    <Slider {...settings} ref={sliderRef}>
      {tabsContainer}
    </Slider>
  );

  return (
    <Themes theme={theme} id={id} tableOfContentTitle={tableOfContentTitle}>
      <div
        className={styles.wrapper}
        data-navigation-type="inpageNavigationClick"
      >
        <div className={styles.container}>
          <div className={styles.heading}>
            {title && <span className={styles.title}>{title}</span>}
            <Tabs tabs={tabs} callback={tabChangeHandler} />
          </div>
          {slider}
        </div>
      </div>
    </Themes>
  );
};

export default TabsBlock;
