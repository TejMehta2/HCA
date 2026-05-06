import React from 'react';
import { FooterProps } from './Footer.types';
import styles from './Footer.module.scss';
import Themes from '../../foundation/Themes/Themes';
import TextLink from '../../core-components/TextLink/TextLink';
import Logo from '../../foundation/BrandAssets/Logo white.svg';
import Text from '../../foundation/Text/Text';

const Footer = (props: FooterProps): JSX.Element => {
  const {
    logo,
    noLogo,
    columns,
    legals,
    buttons,
    copyright,
    contact,
    theme = 'B-HCA-Navy-Blue',
  } = props;
  const LogoIcon = Logo as () => JSX.Element;

  return (
    <Themes theme={theme}>
      <footer className={styles.footer} data-event="navigationClick">
        <div className={styles.inner}>
          <div
            data-navigation-type="footerNavigationButton"
            className={styles['top-row']}
            data-animate="xs"
          >
            <div className={styles['logo-section']}>
              {
                !noLogo &&
                <a className={styles.logo} href="/">
                  <span className="sr-only">Home</span>
                  {logo || <LogoIcon />}
                </a>
              }
              {contact?.phoneNumber && (
                <div className={styles.phone}>
                  <Text tag="span" variation="body-extra-large">
                    {contact.unitName}:&nbsp;
                    <a href={`tel:${contact?.internationalPhoneNumber}`}>
                      <strong>{contact?.phoneNumber}</strong>
                    </a>
                  </Text>
                </div>
              )}
            </div>
            {buttons}
          </div>
          <hr className={styles.hr} />
          <div className={styles.columns} data-animate="xs" data-animate-delay>
            {columns.map((column, index) => (
              <div key={index} className={styles.column}>
                {column.title && (
                  <div className={styles.subheading}>{column.title}</div>
                )}
                {column.links && (
                  <ul
                    data-navigation-type="footerNavigationText"
                    className={styles.links}
                  >
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
                  <div className={styles.reviews} aria-label="Reviews">
                    {column.reviews}
                  </div>
                )}
              </div>
            ))}
          </div>
          {legals && (
            <div className={styles['bottom-row']}>
              <ul className={styles.legals}>
                {legals.map((legal, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <li aria-hidden={true} className={styles.point}></li>
                    )}
                    <li>
                      <TextLink>{legal}</TextLink>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </div>
          )}
          {!!copyright && (
            <>
              <hr className={styles.hr} />
              {copyright}
            </>
          )}
        </div>
      </footer>
    </Themes>
  );
};

export default Footer;
