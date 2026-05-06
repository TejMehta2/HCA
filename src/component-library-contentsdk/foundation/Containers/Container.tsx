import React, { type JSX } from 'react';
import classNames from 'classnames';
import ContainerProps from './Container.types';
import styles from './Container.module.scss';

const Container = (props: ContainerProps): JSX.Element => {
  const {
    children,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    displayFlex,
    width,
    withButtons,
    customBtn,
    customBtnDesktop,
    gridLayout,
    alignItems
  } = props;

  const containerClasses = classNames(styles.container, {
    [styles[`margin-top-${marginTop}`]]: marginTop,
    [styles[`margin-bottom-${marginBottom}`]]: marginBottom,
    [styles[`margin-left-${marginLeft}`]]: marginLeft,
    [styles[`margin-right-${marginRight}`]]: marginRight,
    [styles['display-flex']]: displayFlex,
    [styles[`width-${width}`]]: width,
    [styles['with-buttons']]: withButtons,
    [styles['custom-btn']]: customBtn,
    [styles['custom-btn-desktop']]: customBtnDesktop,
    [styles['grid-layout']]: gridLayout,
    [styles['center-align']]: alignItems,
  });

  return <div className={containerClasses}>{children}</div>;
};

export default Container;
