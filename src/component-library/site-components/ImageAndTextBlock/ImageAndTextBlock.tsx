import React, { useRef, useState } from 'react';
import Themes from '../../foundation/Themes/Themes';
import { ImageAndTextBlockProps } from './ImageAndTextBlock.types';
import styles from './ImageAndTextBlock.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import TextButton from '../../core-components/TextButton/TextButton';
import Modals from '../../components/Modals/Modals';
import Button from '../../core-components/Button/Button';
import Container from '../../foundation/Containers/Container';

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
    hideImageOnDesktop, // ✅ NEW
    cfVariation,
    contentVariation,
    noOverflownHidden,
    id,
    tableOfContentTitle,
    locationCookies,
    setLocation,
    hasFunctionalConsentCookie,
    showRegion
  } = props;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [saveLocation, setShowLocation] = useState(false);

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
              forceMobileLikeDesktopLayout ? styles['no-desktop-image'] : '', // ✅ NEW
            ].join(' ')}
          >
            {hasImage && (
              <div
                className={[
                  styles.image,
                  cfVariation ? styles['hide-on-mobile-cf'] : '',
                  hideImageOnMobile ? styles['hide-on-mobile'] : '',
                  hideImageOnDesktop ? styles['hide-on-desktop'] : '', // ✅ NEW
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
              {subheader && (
                <div className={styles.subheader}>{subheader}</div>
              )}

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

              {showRegion && !hasFunctionalConsentCookie && (
                <div className={styles['save-location']}>
                  <div className={styles['save-content']}>
                    <Text tag="h3" variation="body-medium">
                      {`Save this location for next time? This requires functional cookies`}
                    </Text>
                  </div>
                  <TextButton theme="dark">
                    <a href="javascript:OneTrust.ToggleInfoDisplay()">Cookie settings</a>
                  </TextButton>
                </div>
              )}

              <div className={styles.header}>{header}</div>
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

      <Modals ref={dialogRef} alignContent="center">
        {props.locationCookies !== 'London' && (
          <Container marginRight="spacing-4" marginLeft="spacing-4">
            <Button size="small" variation="full-dark" contentVariation="full-width">
              <button
                onClick={() => {
                  dialogRef?.current?.close();
                  setShowLocation(true);
                  setLocation('London');
                }}
              >
                <span>{'London'}</span>
              </button>
            </Button>
          </Container>
        )}

        {props.locationCookies !== 'Manchester' && (
          <Container marginRight="spacing-4" marginLeft="spacing-4">
            <Button size="small" variation="full-dark" contentVariation="full-width">
              <button
                onClick={() => {
                  dialogRef?.current?.close();
                  setShowLocation(true);
                  setLocation('Manchester');
                }}
              >
                <span>{'Manchester'}</span>
              </button>
            </Button>
          </Container>
        )}

        {props.locationCookies !== 'Birmingham' && (
          <Container marginRight="spacing-4" marginLeft="spacing-4">
            <Button size="small" variation="full-dark" contentVariation="full-width">
              <button
                onClick={() => {
                  dialogRef?.current?.close();
                  setShowLocation(true);
                  setLocation('Birmingham');
                }}
              >
                <span>{'Birmingham'}</span>
              </button>
            </Button>
          </Container>
        )}
      </Modals>
    </Themes>
  );
};

export default ImageAndTextBlock;
