import React, { type JSX } from 'react';
import styles from './FunctionalCookiesBox.module.scss';
import Text from '../../foundation/Text/Text';
import TextButton from '../../core-components/TextButton/TextButton';
import { FunctionalCookiesBoxProps } from './FunctionalCookiesBox.types';

const FunctionalCookiesBox = (props: FunctionalCookiesBoxProps): JSX.Element => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.text}>
                    <Text tag="p" variation="body-medium">
                        {props.title || `Save this location for next time?`}
                    </Text>
                </div>
                <TextButton theme="light">
                    <a href="javascript:OneTrust.ToggleInfoDisplay()">
                        <Text tag="p" variation="body-bold-medium">
                            {props.label || `Activate functional cookies`}
                        </Text>
                    </a>
                </TextButton>
            </div>
        </div>
    );
};

export default FunctionalCookiesBox;