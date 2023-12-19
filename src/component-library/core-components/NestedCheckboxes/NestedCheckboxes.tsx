import React, { ReactNode, ChangeEvent, useState } from 'react';
import { NestedCheckboxesProps } from './NestedCheckboxes.types';
import Checkbox from '../Checkbox/Checkbox';

import styles from './NestedCheckboxes.module.scss';

const NestedCheckboxes = (props: NestedCheckboxesProps): JSX.Element => {
  const { items } = props;

  const childList: ReactNode[] | JSX.Element[] = [];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const listApartFromCurrent = childList.filter(
      (item) => item && item.props.children.props.id !== e.target.id
    );
    const listApartFromCurrentCheckedCount = listApartFromCurrent.filter(
      (item) => item && item.props.children.props.checked === true
    );
    console.log(listApartFromCurrent);
    console.log(listApartFromCurrentCheckedCount);
    childList.map((item) => console.log(item.props.children.props.checked));
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
        />

        <ul>{childList}</ul>
      </li>
    </ul>
  );
};

export default NestedCheckboxes;
