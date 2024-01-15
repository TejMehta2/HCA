import React from 'react';
import { FooterProps } from './Footer.types';
import styles from './Footer.module.scss';
import Themes from '../../foundation/Themes/Themes';
import TextLink from '../../core-components/TextLink/TextLink';
import Button from '../../core-components/Button/Button';
import Logo from '../../foundation/BrandAssets/Logo white.svg';
import LogoMark from '../../foundation/BrandAssets/Logo mark white.svg';

const Footer = (props: FooterProps): JSX.Element => {
  const { columns, legals, buttons } = props;
  const LogoIcon = Logo as () => JSX.Element;
  const LogoMarkIcon = LogoMark as () => JSX.Element;
  return (
    <Themes theme={'E-HCA-Dark-Grey'}>
      <footer className={styles.footer}>
        <div className={styles.inner}>
          <ul className={styles['top-row']}>
            <li
              className={[
                styles.logo,
                styles[`with-${Math.min(buttons.length, 5)}-buttons`],
              ].join(' ')}
            >
              <a href="/">
                <span className="sr-only">Home</span>
                <LogoIcon />
              </a>
            </li>
            {buttons.map((button, index) => (
              <li key={index} className={styles.button}>
                <Button size={'small'} theme={'outline'}>
                  {button}
                </Button>
              </li>
            ))}
          </ul>
          <hr className={styles.hr} />
          <div className={styles.columns}>
            {columns.map((column, index) => (
              <div key={index} className={styles.column}>
                {column.title && (
                  <div className={styles.subheading}>{column.title}</div>
                )}
                {column.links && (
                  <ul className={styles.links}>
                    {column?.links?.map((link, index) => (
                      <li key={index}>
                        <TextLink>{link}</TextLink>
                      </li>
                    ))}
                  </ul>
                )}
                {column.socials && (
                  <ul className={styles.socials} aria-label="Socials">
                    {column.socials.map((social, index) => (
                      <li key={index}>{social}</li>
                    ))}
                  </ul>
                )}
                {column.reviews && (
                  <ul className={styles.reviews} aria-label="Reviews">
                    {column.reviews}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <div className={styles['bottom-row']}>
            <div className={styles.icon}>
              <LogoMarkIcon />
            </div>
            <ul className={styles.legals}>
              {legals.map((legal, index) => (
                <>
                  {index > 0 && (
                    <li aria-hidden={true} className={styles.point}></li>
                  )}
                  <li key={index}>
                    <TextLink>{legal}</TextLink>
                  </li>
                </>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </Themes>
  );
};

export default Footer;
