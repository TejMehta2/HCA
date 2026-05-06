import React, { forwardRef, type JSX } from 'react';
import { Contact, ModalCallUsProps } from './ModalCallUs.types';
import styles from './ModalCallUs.module.scss';
import Modals from '../Modals/Modals';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';
import Button from '../../core-components/Button/Button';
import TextButton from '../../core-components/TextButton/TextButton';

const ModalCallUs = (
  props: ModalCallUsProps,
  ref: React.MutableRefObject<HTMLDialogElement | null>
): JSX.Element => {
  const { contacts = [], defaultOpen = false, contentVariation } = props;

  const Contact = ({
    contact,
    isMain = false,
  }: {
    contact: Contact;
    isMain?: boolean;
  }): JSX.Element => (
    <div className={styles.contact}>
      <div className={styles.title}>
        <Text variation={'subheading-1'}>{contact?.title}</Text>
      </div>

      {contact?.phone && (
        <>
          <div className={styles.mobile} data-navigation-type="phoneCTAClick">
            {isMain ? (
              <Button size={'small'} variation={'full'}>
                <a href={`tel:${contact?.phone?.number}`}>
                  <Icons iconName="iconPhone" />
                  {contact?.phone?.text}
                </a>
              </Button>
            ) : (
              <TextButton theme="dark">
                <a href={`tel:${contact?.phone?.number}`}>
                  <Icons iconName="iconPhone" />
                  {contact?.phone?.text}
                </a>
              </TextButton>
            )}
          </div>

          <div className={styles.desktop}>
            <div className={styles.link}>
              <Text variation={isMain ? 'display-1' : 'display-5'}>
                <a href={`tel:${contact?.phone?.number}`}>
                  {contact?.phone?.text}
                </a>
              </Text>
            </div>
          </div>
        </>
      )}
      {contact?.availability && (
        <div className={styles.availability}>
          <Icons iconName={'iconClock'} />
          <Text variation={'body-medium-large'}>{contact.availability}</Text>
        </div>
      )}
    </div>
  );

  let contactList = (
    <>
      <div className={styles.main}>
        {contacts?.length > 0 && (
          <Contact contact={contacts[0]} isMain={true} />
        )}
      </div>
      {contacts?.length > 1 && (
        <div className={styles.background}>
          <div className={styles.additional}>
            {contacts.slice(1).map((contact, index) => (
              <React.Fragment key={index}>
                <hr />
                <Contact contact={contact} />
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </>
  );

  if (contentVariation === 'EqualSizeNumbers') {
    contactList = (
      <div className={styles.additional}>
        {contacts.map((contact, index) => (
          <React.Fragment key={index}>
            <hr />
            <Contact contact={contact} />
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <Modals ref={ref} defaultOpen={defaultOpen} contentVariation="call">
      <div
        className={[
          styles['modal-contact-us'],
          contentVariation === 'EqualSizeNumbers' ? styles['equal-size'] : '',
        ].join(' ')}
      >
        {contactList}
      </div>
    </Modals>
  );
};

export default forwardRef(ModalCallUs);
