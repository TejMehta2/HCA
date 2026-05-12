'use client';

import React, { ChangeEvent, useId, useRef, type JSX } from 'react';
import { SortingProps, SortingOptionProps } from './Sorting.types';
import styles from './Sorting.module.scss';
import Modals from '../Modals/Modals';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import ModalDropdown from '../ModalDropdown/ModalDropdown';
import Themes from '../../foundation/Themes/Themes';

const SortingInput = (props: SortingOptionProps) => {
  const {
    name = 'sorting',
    id,
    value = props.labelText,
    defaultChecked,
  } = props;
  return (
    <input
      className="sr-only"
      type="radio"
      id={id}
      name={name}
      value={value}
      defaultChecked={defaultChecked}
    />
  );
};

const SortingLabel = (props: SortingOptionProps): JSX.Element => {
  const { id, labelText } = props;
  return (
    <label htmlFor={id} className={styles.option}>
      <span className={styles.label}>{labelText}</span>
      <span className={styles.icon}>
        <Icons iconName={'iconCheck'} />
      </span>
    </label>
  );
};

const Sorting = (props: SortingProps): JSX.Element => {
  const {
    options = [],
    onChange,
    anchorDropdown = 'right',
    defaultOpen = false,
    buttonText = (
      <span>
        <strong>Sort</strong> by
      </span>
    ),
    buttonIcon = <Icons iconName={'iconArrowDown'} />,
  } = props;

  const mobileDialogRef = useRef<HTMLDialogElement>(null);
  const desktopDialogRef = useRef<HTMLDialogElement>(null);

  const openMobileModal = () => {
    mobileDialogRef?.current?.showModal();
    mobileDialogRef?.current?.querySelector('label')?.focus();
  };
  const openDesktopModal = () => {
    desktopDialogRef?.current?.show();
    desktopDialogRef?.current?.querySelector('label')?.focus();
  };
  const toggleMobileModal = () =>
    mobileDialogRef?.current?.open
      ? mobileDialogRef?.current?.close()
      : openMobileModal();
  const toggleDesktopModal = () =>
    desktopDialogRef?.current?.open
      ? desktopDialogRef?.current?.close()
      : openDesktopModal();
  const inputs = options.map((option) => (
    <SortingInput key={option.id} {...{ ...option }} />
  ));
  const labels = options.map((option) => (
    <SortingLabel key={option.id} {...{ ...option }} />
  ));
  const ctaContent = (
    <>
      {buttonIcon}
      {buttonText}
    </>
  );
  const labelId = useId();

  return (
    <div
      aria-labelledby={labelId}
      role={'radiogroup'}
      className={styles.wrapper}
      onChange={(event) => {
        mobileDialogRef?.current?.close();
        desktopDialogRef?.current?.close();
        onChange?.(event as ChangeEvent<HTMLInputElement>);
      }}
    >
      <div
        className={styles.desktop}
        onMouseLeave={() => {
          desktopDialogRef?.current?.close();
        }}
        onMouseEnter={() => {
          desktopDialogRef?.current?.show();
        }}
      >
        <div className={styles.button}>
          <Button size={'large'} variation={'full'}>
            <button onClick={toggleDesktopModal} type="button">
              {ctaContent}
            </button>
          </Button>
        </div>
        <div className={styles.modal}>
          <ModalDropdown
            ref={desktopDialogRef}
            defaultOpen={defaultOpen}
            contentVariation="no-transition"
          >
            <div className={[styles.fields, styles[anchorDropdown]].join(' ')}>
              {labels}
            </div>
          </ModalDropdown>
        </div>
      </div>
      <div className={styles.mobile}>
        <div className={styles.button}>
          <Button size={'large'} variation={'full'}>
            <button onClick={toggleMobileModal} type="button">
              {ctaContent}
            </button>
          </Button>
        </div>
        <Themes theme={'A-HCA-White'}>
          <Modals ref={mobileDialogRef} defaultOpen={defaultOpen}>
            <div className={styles.fieldset}>
              <div className={styles.legend}>
                <Text variation={'body-bold-extra-large'}>
                  <span id={labelId}>Sort by:</span>
                </Text>
              </div>
              <div className={styles.fields}>{labels}</div>
            </div>
          </Modals>
        </Themes>
      </div>
      {/* Share inputs between desktop and mobile modal labels, in case of e.g. portrait/landscape swap past breakpoint */}
      {inputs}
    </div>
  );
};

export default Sorting;
