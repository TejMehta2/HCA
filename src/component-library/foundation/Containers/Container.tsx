import React from 'react';
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
  } = props;

  const containerClasses = classNames(styles.container, {
    [styles[`marginTop-${marginTop}`]]: marginTop,
    [styles[`marginBottom-${marginBottom}`]]: marginBottom,
    [styles[`marginLeft-${marginLeft}`]]: marginLeft,
    [styles[`marginRight-${marginRight}`]]: marginRight,
    [styles.displayFlex]: displayFlex,
    [styles[`width-${width}`]]: width,
    [styles['with-buttons']]: withButtons,
  });

  return <div className={containerClasses}>{children}</div>;
};

export default Container;
