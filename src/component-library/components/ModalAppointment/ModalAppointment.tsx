import React, { forwardRef } from 'react';
import { ModalAppointmentProps } from './ModalAppointment.types';
import styles from './ModalAppointment.module.scss';
import Modals from '../Modals/Modals';
import Themes from '../../foundation/Themes/Themes';

const ModalAppointment = (
  props: ModalAppointmentProps,
  ref: React.MutableRefObject<HTMLDialogElement | null>
): JSX.Element => {
  const {
    title1,
    copy1,
    cta1,
    title2,
    copy2,
    cta2,
    defaultOpen = false,
  } = props;
  return (
    <Themes theme="A-HCA-White">
      <Modals ref={ref} defaultOpen={defaultOpen}>
        <div className={styles['modal-appointment']}>
          <div className={styles.grid}>
            <div className={styles.panel1}>
              <div className={styles.title}>{title1}</div>
              <div className={styles.copy}>{copy1}</div>
              <div className={styles.cta}>{cta1}</div>
            </div>
            {(title2 || cta2 || copy2) && (
              <>
                <div className={styles.hr}>
                  <hr />
                </div>
                <div className={styles.panel2}>
                  {title2 && <div className={styles.title}>{title2}</div>}
                  {copy2 && <div className={styles.copy}>{copy2}</div>}
                  {cta2 && <div className={styles.cta}>{cta2}</div>}
                </div>
              </>
            )}
          </div>
        </div>
      </Modals>
    </Themes>
  );
};

export default forwardRef(ModalAppointment);
