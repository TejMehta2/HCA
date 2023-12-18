import React, { ReactNode, ChangeEvent, useState } from 'react';
import { NestedCheckboxesProps } from './NestedCheckboxes.types';
import Checkbox from '../Checkbox/Checkbox';

import styles from './NestedCheckboxes.module.scss';

const NestedCheckboxes = (props: NestedCheckboxesProps): JSX.Element => {
  const { items } = props;

  const CHECKBOX_STATES = {
    Checked: 'Checked',
    Indeterminate: 'Indeterminate',
    Empty: 'Empty',
  };

  const childList: ReactNode[] | JSX.Element[] = [];

  const [checked, setChecked] = useState(CHECKBOX_STATES.Empty);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
    childList.map((item) => console.log(item));
  };

  items[0]?.subItems.map((item, index) => {
    const listItem = (
      <li key={index}>
        <Checkbox
          label={item.label}
          name={item.name}
          value={item.value}
          checked={false}
          onChange={handleChange}
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
