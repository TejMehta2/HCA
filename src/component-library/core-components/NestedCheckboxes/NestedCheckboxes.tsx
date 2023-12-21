import React, { ReactNode, ChangeEvent, useState, useEffect } from 'react';
import { NestedCheckboxesProps } from './NestedCheckboxes.types';
import { CheckboxProps } from '../Checkbox/Checkbox.types';
import Checkbox from '../Checkbox/Checkbox';

import styles from './NestedCheckboxes.module.scss';

const NestedCheckboxes = (props: NestedCheckboxesProps): JSX.Element => {
  const { items } = props;

  const childList: ReactNode[] | JSX.Element[] = [];

  const [checkboxes, setCheckboxes] = useState<CheckboxProps[]>([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [mainChecked, setMainChecked] = useState(false);

  useEffect(() => {
    const checkboxList: CheckboxProps[] = [];
    items[0]?.subItems.map((item) => {
      checkboxList.push(item);
    });

    setCheckboxes(checkboxList);
  }, [items]);

  const handleNestedCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    //  update nested checkbox list
    const updateCheckboxes = checkboxes.map((item: CheckboxProps) => {
      if (item.id === e.target.id) {
        const targetChecked = e.target.checked;
        return { ...item, checked: targetChecked };
      }
      return item;
    });

    setCheckboxes(updateCheckboxes);

    //  determine if indeterminate

    const checkboxListLength: number = updateCheckboxes.length;
    const checkedNestedItems = updateCheckboxes.filter(
      (item) => item.checked === true
    );

    if (
      checkedNestedItems.length < checkboxListLength &&
      checkedNestedItems.length > 0
    ) {
      setIndeterminate(true);
    } else {
      setIndeterminate(false);
    }

    //  dertermine if main checkbox is checked

    if (checkedNestedItems.length === checkboxListLength) {
      setMainChecked(true);
    } else if (checkedNestedItems.length === 0) {
      setMainChecked(false);
    }
  };

  const handleMainCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    //  if indeterminate set all nested checkboxes to unchecked
    if (indeterminate === true) {
      setIndeterminate(false);
      setMainChecked(false);

      const updateNestedCheckboxes = checkboxes.map((item: CheckboxProps) => {
        return { ...item, checked: false };
      });
      setCheckboxes(updateNestedCheckboxes);
    } else if (e.target.checked === true) {
      // if main checkbox is checked set all nested checkboxes to checked
      setMainChecked(true);

      const updateNestedCheckboxes = checkboxes.map((item: CheckboxProps) => {
        return { ...item, checked: true };
      });

      setCheckboxes(updateNestedCheckboxes);
    } else {
      //  if main checkbox is unchecked set all nested checkboxes to unchecked
      setMainChecked(false);

      const updateNestedCheckboxes = checkboxes.map((item: CheckboxProps) => {
        return { ...item, checked: false };
      });

      setCheckboxes(updateNestedCheckboxes);
    }
  };

  checkboxes.map((item, index) => {
    const listItem = (
      <li key={index}>
        <Checkbox
          id={item.id}
          label={item.label}
          name={item.name}
          value={item.value}
          onChange={handleNestedCheckboxChange}
          checked={item.checked}
        />
      </li>
    );
    childList.push(listItem);
  });

  const mainCheckbox = items[0].mainCheckbox;

  return (
    <ul className={styles.list}>
      <li>
        <Checkbox
          id={mainCheckbox.id}
          label={mainCheckbox.label}
          name={mainCheckbox.name}
          value={mainCheckbox.value}
          indeterminate={indeterminate}
          checked={mainChecked}
          onChange={handleMainCheckboxChange}
        />

        <ul>{childList}</ul>
      </li>
    </ul>
  );
};

export default NestedCheckboxes;
