import React from 'react';
import { CardComparisonProps, PackageItem } from './CardComparison.types';
import styles from './CardComparison.module.scss';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';
import Tooltips from '../Tooltips/Tooltips';
import Button from '../../core-components/Button/Button';

const CardComparison = (props: CardComparisonProps): JSX.Element => {
  const {
    title,
    pricingVariants,
    subtitle,
    includedPackageItems,
    excludedPackageItems,
    cta,
  } = props;

  const pricing: React.ReactNode[] = [];

  pricingVariants?.forEach((variant, index) => {
    if (index > 0) {
      // Add the separator before each item except the first
      pricing.push(<span className={styles['price-seperator']}>or</span>);
    }

    pricing.push(
      <span className={styles['price-group']} key={index}>
        {variant.price && (
          <Text variation="heading-2" tag="span">
            {variant.price}
          </Text>
        )}
        {variant.period && variant.period}
        {variant.discount && (
          <span className={styles.discount}>{variant.discount}</span>
        )}
      </span>
    );
  });

  const getPackageItems = (packageItems: PackageItem[], included = true) => {
    return packageItems.map((packageItem, index) => (
      <li key={index}>
        <span
          className={[
            styles.icon,
            included ? styles.included : styles.excluded,
          ].join(' ')}
        >
          <Icons iconName={included ? 'iconCheckSmall' : 'iconCrossSmall'} />
        </span>
        <div>
          {packageItem.label && (
            <Text variation="body-medium-extra-large" tag="div">
              {packageItem.label}{' '}
              {packageItem.info && (
                <Tooltips display="inline">{packageItem.info}</Tooltips>
              )}
            </Text>
          )}
          {packageItem.summary && (
            <Text variation="body-extra-large" tag="div">
              {packageItem.summary}
            </Text>
          )}
        </div>
      </li>
    ));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {title}
        <div className={styles.prices}>{pricing}</div>
      </div>
      <div className={styles.body}>
        {subtitle}
        <ul className={styles['packages-list']}>
          {includedPackageItems && getPackageItems(includedPackageItems)}
          {excludedPackageItems && getPackageItems(excludedPackageItems, false)}
        </ul>
        {cta && (
          <div className={styles.cta}>
            <Button size="large" variation="full" contentVariation="full-width">
              {cta}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardComparison;
