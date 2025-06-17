import React from 'react';
import { CardDoctorProps } from './CardDoctor.types';
import styles from './CardDoctor.module.scss';
import Button from '../../core-components/Button/Button';
import Text from '../../foundation/Text/Text';

const CardDoctor = (props: CardDoctorProps): JSX.Element => {
  const { image, title, department, cta } = props;
  return (
    <div className={styles['card-doctor']}>
      <div className={styles.image}>{image}</div>
      <div className={styles.title}>{title}</div>
      <Text variation="subheading-1">{department}</Text>
      {cta && (
        <div className={styles.cta}>
          <Button size={'small'} variation={'full'} contentVariation="card">
            {cta}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CardDoctor;
