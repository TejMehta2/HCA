import React, { useRef } from 'react';
import { ShareCTAProps } from './ShareCTA.types';
import styles from './ShareCTA.module.scss';
import Button from '../../core-components/Button/Button';
import Modals from '../Modals/Modals';
import Themes from '../../foundation/Themes/Themes';

const ShareCTA = (props: ShareCTAProps): JSX.Element => {
  const { shareData, children } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <Themes theme="F-HCA-White">
        <Button size="large" theme="outline">
          <button onClick={() => dialogRef.current?.showModal()}>
            <span>Share</span>
          </button>
        </Button>
      </Themes>
      <Themes theme="F-HCA-White">
        <Modals ref={dialogRef} defaultOpen={false}>
          <div className={styles['modal-wrapper']}>
            <div className={styles['modal-content']}>
              {children}
              <ul className={styles['share-buttons']}>
                <li>
                  <Button size="large" theme="square-outline">
                    <button>Copy Link</button>
                  </Button>
                </li>
                <li>
                  <Button size="large" theme="square-outline">
                    <button>Email</button>
                  </Button>
                </li>
                <li>
                  <Button size="large" theme="square-outline">
                    <button>WhatsApp</button>
                  </Button>
                </li>
                <li>
                  <Button size="large" theme="square-outline">
                    <button>Facebook</button>
                  </Button>
                </li>
                <li>
                  <Button size="large" theme="square-outline">
                    <button>Messenger</button>
                  </Button>
                </li>
                <li>
                  <Button size="large" theme="square-outline">
                    <button>X (Twitter)</button>
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </Modals>
      </Themes>
    </>
  );
};

export default ShareCTA;
