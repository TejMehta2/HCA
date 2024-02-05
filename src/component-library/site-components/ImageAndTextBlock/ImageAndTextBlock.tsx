import React from 'react';
import Themes from '../../foundation/Themes/Themes';
import { ImageAndTextBlockProps } from './ImageAndTextBlock.types';
import styles from './ImageAndTextBlock.module.scss';

const ImageAndTextBlock = (props: ImageAndTextBlockProps): JSX.Element => {
  const {
    children,
    image,
    header,
    subheader,
    ctas,
    imageAlignment = 'left',
    length = 'short',
    theme,
    ratings,
    iconList,
    contactList,
  } = props;

  return (
    <Themes theme={theme}>
      <div className={styles.background}>
        <div
          className={[
            styles['wrapper'],
            iconList ? styles['icon-list-wrapper'] : '',
          ].join(' ')}
        >
          <div
            className={[
              styles['container'],
              styles[`image-${imageAlignment}`],
            ].join(' ')}
          >
            <div className={[styles['image'], styles[length]].join(' ')}>
              {image}
            </div>
            <div className={styles['content']}>
              {subheader && (
                <div className={styles['subheader']}>{subheader}</div>
              )}
              <div className={styles['header']}>{header}</div>
              {children && <div>{children}</div>}

              {ctas && <div className={styles['ctas']}>{ctas}</div>}

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
              {contactList && (
                <div className={styles['contact-list']}>
                  {contactList.map((item, index) => (
                    <div key={index}>
                      {item.title}
                      <div className={styles.number}>{item.number}</div>
                      <div className={styles.hours}>
                        {item.icon}
                        {item.openingHours}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default ImageAndTextBlock;
