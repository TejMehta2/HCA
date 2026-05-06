import React, { type JSX } from 'react';
import { NeedHelpProps } from './NeedHelp.types';
import styles from './NeedHelp.module.scss';
import Text from '../../foundation/Text/Text';
import TextLink from '../../core-components/TextLink/TextLink';

const NeedHelp = (props: NeedHelpProps): JSX.Element => {
  const {
    headline,
    subheadline,
    phoneNumber,
    workingHoursHeadline,
    workingHours,
    workingHoursTime,
  } = props;
  return (
    <div className={styles.help}>
      <div className={styles.headline}>
        <Text tag="h3" variation="body-bold-large">
          {headline}
        </Text>
      </div>
      <div className={styles.phone}>
        <Text tag="h3" variation="body-bold-small">
          {subheadline}
        </Text>
        <TextLink>
          <a href={`tel:${phoneNumber.replace(/\s/g, '')}`}>
            <Text tag="span" variation="display-6">
              {phoneNumber}
            </Text>
          </a>
        </TextLink>
      </div>
      <div className={styles['working-hours']}>
        <Text tag="h3" variation="body-bold-small">
          {workingHoursHeadline}
        </Text>
        <Text tag="p" variation="body-large">
          {workingHours}
        </Text>
        <Text tag="p" variation="body-large">
          {workingHoursTime}
        </Text>
      </div>
    </div>
  );
};

export default NeedHelp;
