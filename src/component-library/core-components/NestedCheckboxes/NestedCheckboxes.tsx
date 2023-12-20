import React, { ReactNode, ChangeEvent, useState, useEffect } from 'react';
import { NestedCheckboxesProps } from './NestedCheckboxes.types';
import Checkbox from '../Checkbox/Checkbox';

import styles from './NestedCheckboxes.module.scss';

const NestedCheckboxes = (props: NestedCheckboxesProps): JSX.Element => {
  const { items } = props;

  const childList: ReactNode[] | JSX.Element[] = [];

  const [checkboxes, setCheckboxes] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [mainChecked, setMainChecked] = useState(false);

  useEffect(() => {
    const checkboxList = [];
    items[0]?.subItems.map((item) => {
      checkboxList.push(item);
    });

    setCheckboxes(checkboxList);
  }, [items]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //  update nested checkbox list
    const updateCheckboxes = checkboxes.map((item) => {
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

  items[0]?.subItems.map((item, index) => {
    const listItem = (
      <li key={index}>
        <Checkbox
          id={item.id}
          label={item.label}
          name={item.name}
          value={item.value}
          onChange={handleChange}
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
        />

        <ul>{childList}</ul>
      </li>
    </ul>
  );
};

export default NestedCheckboxes;
