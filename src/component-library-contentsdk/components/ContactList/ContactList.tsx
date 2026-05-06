import React, { type JSX } from 'react';
import { ContactListProps } from './ContactList.types';
import styles from './ContactList.module.scss';

const ContactList = (props: ContactListProps): JSX.Element => {
  const { items } = props;
  return (
    <div className={styles['contact-list']}>
      {items.map((item, index) => (
        <div className={styles['contact-item']} key={index}>
          {item.title}
          <div className={styles.number}>{item.number}</div>
          <div className={styles.hours}>
            {item.icon}
            {item.openingHours}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
