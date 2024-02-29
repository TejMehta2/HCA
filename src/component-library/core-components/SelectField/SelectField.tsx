import React, { useRef, useState } from 'react';
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

  const handleClickOutside = (event: MouseEvent | TouchEvent): void => {
    event.preventDefault();

    if (wrapperRef?.current?.contains(event.target as HTMLDivElement)) return;

    closeModal();
  };

  document.addEventListener('mousedown', handleClickOutside);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {label && (
        <label htmlFor={id}>
          {label}
          {!required && ' (Optional)'}
        </label>
      )}
      <input type="hidden" value={activeValue} required={required} />
      <span className={styles.select}>
        <button
          id={id}
          ref={buttonRef}
          role="combobox"
          aria-label="open dropdown"
          aria-haspopup="listbox"
          aria-expanded="false"
          aria-controls="select-dropdown"
          onClick={toggleModal}
        >
          {activeValue}
        </button>
        <span className={styles.arrow}>
          <Icons iconName="iconArrowDropdown" />
        </span>
      </span>
      <ModalDropdown ref={dialogRef}>
        <div role="listbox" id="select-dropdown" className={styles.options}>
          {options.map((option, index) => (
            <button
              key={index}
              onClick={selectItem}
              role="option"
              aria-selected={option.text === activeValue}
              className={option.text === activeValue ? styles.active : ''}
            >
              <Text tag="span" variation="body-medium-large">
                {option.text}
              </Text>
            </button>
          ))}
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
