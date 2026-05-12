'use client';
import React, { useRef, type JSX } from 'react';
import Themes from '../../foundation/Themes/Themes';
import { ImageAndTextBlockProps } from './ImageAndTextBlock.types';
import styles from './ImageAndTextBlock.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import TextButton from '../../core-components/TextButton/TextButton';

const ImageAndTextBlock = (props: ImageAndTextBlockProps): JSX.Element => {
  const {
    children,
    image,
    header,
    subheader,
    ctas,
    imageAlignment = 'left',
    imageVerticalAlignment = 'top',
    imageWidth = 'standard',
    imageNoStretch,
    imageKeepAspectRatio = false,
    length = 'short',
    theme,
    ratings,
    iconList,
    hideImageOnMobile,
    hideImageOnDesktop,
    cfVariation,
    contentVariation,
    noOverflownHidden,
    id,
    tableOfContentTitle,
    locationCookies,
    showRegion,
    isInsideContainer = false,
  } = props;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const hasImage = Boolean(image);

  // If there is no image at all, avoid applying image-right desktop reordering rules.
  const effectiveImageAlignment = hasImage ? imageAlignment : 'left';

  // If image is missing OR hidden on desktop, make content behave like “mobile layout” on desktop (full width).
  const forceMobileLikeDesktopLayout = !hasImage || Boolean(hideImageOnDesktop);

  return (
    <Themes id={id} theme={theme} tableOfContentTitle={tableOfContentTitle}>
      <div className={noOverflownHidden ? '' : styles.background}>
        <div
          className={[
            styles.wrapper,
            isInsideContainer ? styles['use-container-queries'] : '',
            iconList ? styles['icon-list-wrapper'] : '',
            contentVariation ? styles[contentVariation] : '',
          ].join(' ')}
        >
          <div
            className={[
              styles.container,
              styles[length],
              styles[`image-${effectiveImageAlignment}`],
              styles[`image-${imageVerticalAlignment}`],
              styles[`image-${imageWidth}`],
              forceMobileLikeDesktopLayout ? styles['no-desktop-image'] : '',
            ].join(' ')}
          >
            {hasImage && (
              <div
                className={[
                  styles.image,
                  cfVariation ? styles['hide-on-mobile-cf'] : '',
                  hideImageOnMobile ? styles['hide-on-mobile'] : '',
                  hideImageOnDesktop ? styles['hide-on-desktop'] : '',
                  imageKeepAspectRatio ? styles['keep-aspect-ratio'] : '',
                  imageNoStretch ? styles['image-no-stretch'] : '',
                ].join(' ')}
                data-animate="s"
              >
                {image}
              </div>
            )}

            <div
              className={[
                styles.content,
                cfVariation ? styles['content-cf'] : '',
              ].join(' ')}
              data-animate="l"
            >
              {subheader && <div className={styles.subheader}>{subheader}</div>}

              {showRegion && (
                <div className={styles.location}>
                  <div className={styles.text}>
                    <Text tag="h3" variation="body-medium">
                      {`Showing consultants in ${locationCookies}`}
                    </Text>
                  </div>
                  <TextButton theme="dark">
                    <button onClick={() => dialogRef?.current?.show()}>
                      <Icons iconName="iconEdit" />
                      {'Change region'}
                    </button>
                  </TextButton>
                </div>
              )}
              {header && <div className={styles.header}>{header}</div>}
              {children && <div className={styles.children}>{children}</div>}

              {ctas && (
                <Themes theme={theme}>
                  <div className={styles.ctas}>{ctas}</div>
                </Themes>
              )}

              {ratings && <div className={styles.ratings}>{ratings}</div>}

              {iconList && (
                <ul className={styles['icon-list']}>
                  {iconList.map((item, index) => (
                    <li key={index}>
                      {item.icon}
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default ImageAndTextBlock;
