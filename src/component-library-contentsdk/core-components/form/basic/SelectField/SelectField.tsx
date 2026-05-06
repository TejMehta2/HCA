import React, { useRef, useState, useEffect } from 'react';
import { SelectFieldProps } from './SelectField.types';
import styles from './SelectField.module.scss';
import ModalDropdown from '../../../../components/ModalDropdown/ModalDropdown';
import Icons from '../../../../foundation/Icons/Icons';
import Text from '../../../../foundation/Text/Text';

const SelectField = (props: SelectFieldProps): JSX.Element => {
  const {
    id,
    label,
    placeholder,
    helpText,
    error,
    options,
    onChange,
    name,
    defaultValue,
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeValue, setActiveValue] = useState(defaultValue || { text: '' });

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent): void => {
      if (
        dialogRef?.current?.contains(event.target as Node) ||
        buttonRef?.current?.contains(event.target as Node)
      ) {
        return;
      }

      closeModal();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {label && <label htmlFor={id}>{label}</label>}
      <span className={styles.select}>
        <button
          id={id}
          ref={buttonRef}
          type="button"
          aria-label="open dropdown"
          aria-expanded="false"
          aria-controls="select-dropdown"
          onClick={toggleModal}
        >
          <span>{activeValue?.text || placeholder}</span>
        </button>
      </span>
      <ModalDropdown ref={dialogRef}>
        <div id="select-dropdown" className={styles.options}>
          {options.map((option, index) => (
            <React.Fragment
              key={`${name}-${option.value || option.text || index}`}
            >
              <input
                id={`${name}-${option.value || option.text}`}
                type="radio"
                className="sr-only"
                name={name}
                value={option.value || option.text}
                onChange={(event) => {
                  if (event.target.checked) {
                    setActiveValue(option); // set display value
                    onChange?.(option); // Notify parent of change
                  }
                }}
                onClick={(event) => {
                  const isNotKeyboard = event.clientX !== 0;
                  isNotKeyboard && closeModal();
                }}
                onKeyUp={(event) => {
                  if (['Tab', ' '].includes(event.key)) {
                    closeModal();
                  }
                }}
                defaultChecked={
                  defaultValue?.text === option.text ||
                  defaultValue?.value === option.value
                }
              />
              <label
                htmlFor={`${name}-${option.value || option.text}`}
                className={styles.option}
              >
                <Text tag="span" variation="body-medium-large">
                  {option.text}
                </Text>
              </label>
            </React.Fragment>
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

      {error && (
        <div className={styles['error-message']}>
          <Icons iconName="iconWarning" />
          <Text variation="body-medium-medium">{error}</Text>
        </div>
      )}
    </div>
  );
};

export default SelectField;
