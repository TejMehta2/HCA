import React from 'react';
import { StepIntroProps } from './StepIntroProps.types';
import styles from './StepIntro.module.scss';
import ConsultantName from '../ConsultantName/ConsultantName';
import Icons from '../../foundation/Icons/Icons';
import TextButton from '../../core-components/TextButton/TextButton';
import Text from '../../foundation/Text/Text';
import Link from 'next/link';

const StepIntro = ({
    children,
    search,
    headline,
    buttons,
    popularSearch
}: StepIntroProps): JSX.Element => {
    return <div className={styles['step-intro']}>
        <div className={styles.headline}>{headline}</div>
        <form autoComplete="off">
            <div className={styles.search}>
                {search}
            </div>
            <div>{children}</div>
        </form>
        <div className={styles.buttons}>{buttons}</div>
        <div className={styles['popular-search']}>
            {popularSearch}
        </div>
    </div>;
};

export default StepIntro;
