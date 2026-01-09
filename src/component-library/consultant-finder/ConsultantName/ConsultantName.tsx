import React from 'react';
import { ConsultantNameProps } from './ConsultantName.types';
import styles from './ConsultantName.module.scss';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';

const ConsultantName = ({
    name,
    variation
}: ConsultantNameProps): JSX.Element => {
    return <div
        className={`${styles.name} ${variation === 'light' ? styles['name-light'] : ''
            }`}
    >
        <div>
            <Text tag="p" variation="body-medium-small">
                {'Consultant'}
            </Text>
            <Text tag="p" variation="body-large">
                {name}
            </Text>
        </div>
        <button
            className={styles.button}
            onClick={(e) => {
                e.preventDefault();
                //   router.push(
                //     `${props.liveBookingFormStepLocationSelect}?slug=${props.slug}&name=${encodeURIComponent(props.name || '')}&gmcNumber=${props.gmcNumber}&isFollowOnAppointment=${props.isFollowUpAppointment}&reviewsTotal=${props.reviewsTotal}`
                //   );
            }}
        >
            <Icons iconName="iconEdit" />
        </button>
    </div>;
};

export default ConsultantName;