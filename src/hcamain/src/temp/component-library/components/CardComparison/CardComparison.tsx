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
    description,
    featuresLabel,
    pricingVariants,
    includedPackageItems,
    excludedPackageItems,
    cta,
    tag,
    tagVariant,
  } = props;

  const pricing: React.ReactNode[] = [];

  pricingVariants?.forEach((variant, index) => {
    pricing.push(
      <div className={styles['price-group']} key={index}>
        {variant.price &&
          (index === 0 ? (
            <Text variation="display-5" tag="span">
              {variant.price}
            </Text>
          ) : (
            <Text variation="body-medium" tag="span">
              {index > 0 && 'or '}
              {variant.price}
            </Text>
          ))}
        {variant.period && variant.period}
        {variant.discount && (
          <Text variation="body-bold-medium" tag="span">
            ({variant.discount})
          </Text>
        )}
      </div>
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
        {description}
        <div className={styles.prices}>{pricing}</div>
        {cta && (
          <div className={styles.cta}>
            <Button size="large" variation="full" contentVariation="full-width">
              {cta}
            </Button>
          </div>
        )}
        {tag && (
          <div
            className={[styles.tag, tagVariant && styles['tag-alternate']].join(
              ' '
            )}
          >
            {tag}
          </div>
        )}
      </div>
      <div className={styles.body}>
        {featuresLabel}
        <ul className={styles['packages-list']}>
          {includedPackageItems && getPackageItems(includedPackageItems)}
          {excludedPackageItems && getPackageItems(excludedPackageItems, false)}
        </ul>
      </div>
    </div>
  );
};

export default CardComparison;
