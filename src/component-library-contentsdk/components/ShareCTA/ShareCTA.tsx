import React, { useRef } from 'react';
import { ShareCTAProps } from './ShareCTA.types';
import styles from './ShareCTA.module.scss';
import Button from '../../core-components/Button/Button';
import Modals from '../Modals/Modals';
import Themes from '../../foundation/Themes/Themes';

const ShareCTA = (props: ShareCTAProps): JSX.Element => {
  const {
    shareData,
    shareCtaText,
    heading,
    subheading,
    children,
    shareCtaIcon,
  } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClick = () => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator?.userAgent
      );

    const handleMobileShare = async () => {
      if (navigator.share) {
        await navigator.share(shareData);
      }
    };
    if (isMobile) {
      handleMobileShare();
      navigator?.share(shareData);
    } else {
      dialogRef.current?.showModal();
    }
  };

  return (
    <>
      <Button size="large" variation="outline">
        <button onClick={handleClick}>
          {shareCtaIcon}
          {shareCtaText}
        </button>
      </Button>
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
