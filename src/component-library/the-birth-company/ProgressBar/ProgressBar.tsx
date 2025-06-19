/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ProgressBarProps } from './ProgressBar.types';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import styles from './ProgressBar.module.scss';
import TextLink from '../../core-components/TextLink/TextLink';

const ProgressBar = (props: ProgressBarProps): JSX.Element => {
  const { steps, currentPage } = props;

  const searchParams = useSearchParams() || '';

  return (
    <div className={styles['progress-bar']}>
      {steps.map((step: any, index: number) => (
        <Fragment key={index}>
          <div className={styles.step}>
            <div
              className={`${styles['step-number']} ${
                step?.fields?.Selected?.value
                  ? styles['step-number--selected']
                  : ''
              }`}
            >
              {step?.fields?.Selected?.value &&
              currentPage !== step?.fields?.Order?.value ? (
                <Icons iconName="iconCheckSmall" />
              ) : (
                ((currentPage === step?.fields?.Order?.value &&
                  step?.fields?.Selected?.value) ||
                  !step?.fields?.Selected?.value) && (
                  <Text tag="p" variation="body-medium-small">
                    {step?.fields?.Order?.value}
                  </Text>
                )
              )}
            </div>
            <div className={styles['step-text']}>
              {(!step?.fields?.Selected?.value ||
                currentPage === step?.fields?.Order?.value ||
                currentPage === steps.length) && (
                <Text tag="p" variation="body-medium-small">
                  {step?.fields?.StepText?.value}
                </Text>
              )}
              {step?.fields?.Selected?.value &&
                currentPage !== step?.fields?.Order?.value &&
                currentPage !== steps.length && (
                  <TextLink>
                    <Link
                      href={`${
                        step?.fields?.Link?.value?.href
                      }?${searchParams.toString()}`}
                    >
                      <Text tag="span" variation="body-medium-small">
                        {step?.fields?.StepText?.value}
                      </Text>
                    </Link>
                  </TextLink>
                )}
            </div>
          </div>
          {index !== steps.length - 1 && <div className={styles.divider}></div>}
        </Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;
