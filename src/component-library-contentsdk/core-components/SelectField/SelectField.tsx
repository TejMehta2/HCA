import React, { useRef, useState, type JSX } from 'react';
import { SelectFieldProps } from './SelectField.types';
import styles from './SelectField.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import ModalDropdown from '../../components/ModalDropdown/ModalDropdown';

const SelectField = (props: SelectFieldProps): JSX.Element => {
  const { id, label, placeholder, helpText, required, errorMessage, options } =
    props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeValue, setActiveValue] = useState(placeholder || '');

  const openModal = () => {
    dialogRef?.current?.show();
    buttonRef.current?.setAttribute('aria-expanded', 'true');
  };

  const closeModal = () => {
    dialogRef?.current?.close();
    buttonRef.current?.setAttribute('aria-expanded', 'false');
  };

  const toggleModal = () =>
    dialogRef?.current?.open ? closeModal() : openModal();

  const selectItem = (event: React.MouseEvent) => {
    const selectedValue = (event.target as HTMLButtonElement).textContent;
    closeModal();

    if (!selectedValue) return;
    setActiveValue(selectedValue);
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {label && (
        <label htmlFor={id}>
          {label}
          {!required && ' (Optional)'}
        </label>
      )}
      <input
        type="text"
        value={activeValue === placeholder ? '' : activeValue}
        onChange={() => {}}
        required={required}
        className={styles['hidden-input']}
        name={activeValue === placeholder ? undefined : id}
        aria-label={label || id}
      />
      <span className={styles.select}>
        <button
          id={id}
          ref={buttonRef}
          type="button"
          role="combobox"
          aria-label="open dropdown"
          aria-haspopup="listbox"
          aria-expanded="false"
          aria-controls="select-dropdown"
          onClick={toggleModal}
        >
          <span>{activeValue}</span>
          <Icons iconName="iconArrowDropdown" />
        </button>
      </span>
      <ModalDropdown ref={dialogRef}>
        <button className={styles.close} onClick={closeModal} type="button">
          Close
        </button>
        <div role="listbox" id="select-dropdown" className={styles.options}>
          <div className={styles['options-inner-wrapper']}>
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={selectItem}
                role="option"
                aria-selected={option.text === activeValue}
                className={`${styles.option} ${
                  option.text === activeValue ? styles.active : ''
                }`}
              >
                <Text tag="span" variation="body-medium-large">
                  {option.text}
                </Text>
              </button>
            ))}
          </div>
        </div>
      </ModalDropdown>

      {helpText && (
        <div className={styles['help-text']}>
          <Text tag="small" variation="body-large">
            {helpText}
          </Text>
        </div>
      )}

      {required && (
        <div className={styles['error-message']}>
          <Icons iconName="iconWarning" />
          <Text variation="body-medium-medium">{errorMessage}</Text>
        </div>
      )}
    </div>
  );
};

export default SelectField;
