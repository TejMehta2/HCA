import React from 'react';
import Themes from '../../foundation/Themes/Themes';
import TextLink from '../../core-components/TextLink/TextLink';
import { FooterSmallProps } from './FooterSmall.types';
import styles from './FooterSmall.module.scss';

const FooterSmall = (props: FooterSmallProps): JSX.Element => {
  const { theme = 'B-HCA-Navy-Blue', logo, ctas, copyright } = props;
  return (
    <Themes theme={theme}>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <div>{logo}</div>
          <div className={styles.content}>
            {ctas && (
              <ul
                data-navigation-type="footerNavigationText"
                className={styles.links}
              >
                {ctas?.map((cta, index) => (
                  <li key={index}>
                    <TextLink>{cta}</TextLink>
                  </li>
                ))}
              </ul>
            )}
            <span>{copyright}</span>
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default FooterSmall;
