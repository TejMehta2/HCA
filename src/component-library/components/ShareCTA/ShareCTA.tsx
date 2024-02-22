import React, { useRef } from 'react';
import { ShareCTAProps } from './ShareCTA.types';
import styles from './ShareCTA.module.scss';
import Button from '../../core-components/Button/Button';
import Modals from '../Modals/Modals';
import Themes from '../../foundation/Themes/Themes';
import Icons from '../../foundation/Icons/Icons';

const ShareCTA = (props: ShareCTAProps): JSX.Element => {
  const { shareData, shareCtaText, heading, subheading, children, theme } =
    props;
  const dialogRef = useRef<HTMLDialogElement>(null);

  const isMobile = () => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleMobileShare = async () => {
    if (navigator.share) {
      await navigator.share(shareData);
    }
  };

  return (
    <>
      <Themes theme={theme}>
        <Button size="large" theme="outline">
          <button
            onClick={
              isMobile()
                ? handleMobileShare
                : () => dialogRef.current?.showModal()
            }
          >
            <Icons iconName="iconShare"></Icons>
            {shareCtaText}
          </button>
        </Button>
      </Themes>
      <Themes theme="A-HCA-White">
        <Modals ref={dialogRef} defaultOpen={false}>
          <div className={styles['modal-wrapper']}>
            <div className={styles['modal-content']}>
              <div className={styles.headings}>
                {heading}
                {subheading && subheading}
              </div>
              <div className={styles['share-buttons']}>{children}</div>
            </div>
          </div>
        </Modals>
      </Themes>
    </>
  );
};

export default ShareCTA;
