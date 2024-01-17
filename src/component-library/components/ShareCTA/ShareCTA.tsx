import React, { useRef } from 'react';
import { ShareCTAProps } from './ShareCTA.types';
import styles from './ShareCTA.module.scss';
import Button from '../../core-components/Button/Button';
import Modals from '../Modals/Modals';
import Themes from '../../foundation/Themes/Themes';
import Icons from '../../foundation/Icons/Icons';

const ShareCTA = (props: ShareCTAProps): JSX.Element => {
  const { shareData, heading, subheading } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareData.url);
  };

  return (
    <>
      <Themes theme="F-HCA-White">
        <Button size="large" theme="outline">
          <button onClick={() => dialogRef.current?.showModal()}>
            <Icons iconName="iconShare"></Icons>
            <span>Share</span>
          </button>
        </Button>
      </Themes>
      <Themes theme="F-HCA-White">
        <Modals ref={dialogRef} defaultOpen={false}>
          <div className={styles['modal-wrapper']}>
            <div className={styles['modal-content']}>
              <div className={styles.headings}>
                {heading}
                {subheading}
              </div>
              <ul className={styles['share-buttons']}>
                <li>
                  <Button size="large" theme="square-outline">
                    <button onClick={handleCopy}>
                      <Icons iconName="iconEmail"></Icons>
                      <span>Copy Link</span>
                    </button>
                  </Button>
                </li>
                <li>
                  <Button size="large" theme="square-outline">
                    <a
                      href={`mailto:?subject=${shareData.title}&body=${shareData.text}${shareData.url}`}
                      title="Share by Email"
                    >
                      <Icons iconName="iconEmail"></Icons>
                      <span>Email</span>
                    </a>
                  </Button>
                </li>
                <li>
                  <Button size="large" theme="square-outline">
                    <a
                      href={`https://web.whatsapp.com/send?text=${shareData.url}`}
                      rel="nofollow noopener"
                      target="_blank"
                    >
                      <Icons iconName="iconWhatsapp"></Icons>
                      <span>WhatsApp</span>
                    </a>
                  </Button>
                </li>
                <li>
                  <Button size="large" theme="square-outline">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareData.url}`}
                    >
                      <Icons iconName="iconFacebook"></Icons>
                      <span>Facebook</span>
                    </a>
                  </Button>
                </li>
                <li>
                  <Button size="large" theme="square-outline">
                    <button>
                      <Icons iconName="iconMessenger"></Icons>
                      <span>Messenger</span>
                    </button>
                  </Button>
                </li>
                <li>
                  <Button size="large" theme="square-outline">
                    <button>
                      <Icons iconName="iconX"></Icons>
                      <span>X (Twitter)</span>
                    </button>
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
