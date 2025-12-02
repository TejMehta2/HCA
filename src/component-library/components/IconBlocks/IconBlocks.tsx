import React from 'react';
import { IconBlocksProps } from './IconBlocksProps.types';
import styles from './IconBlocks.module.scss';
import Themes from '../../foundation/Themes/Themes';

const IconBlocks = (props: IconBlocksProps): JSX.Element => {
    const {
        title,
        id,
        theme,
        tableOfContentTitle,
        subtitle,
        bodyText,
        cards
    } = props;

    return (
        <Themes theme={theme || 'A-HCA-White'} id={id} tableOfContentTitle={tableOfContentTitle}>
            <div className={styles.wrapper}>

                <div className={styles.intro}>
                    <div className={styles.subtitle}>{subtitle}</div>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.body}>{bodyText}</div>
                </div>

                <div className={styles.cards}>
                    {cards?.map((card, index) => (
                        <div key={index} className={styles.card}>
                            {
                                card.icon &&
                                <div className={styles.icon}>
                                    {card.icon}
                                </div>
                            }
                            <div className={styles.content}>
                                {card.title && (
                                    <div className={styles['card-title']}>{card.title}</div>
                                )}

                                {card.bodyText && (
                                    <div>
                                        {card.bodyText}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </Themes>
    );
};

export default IconBlocks;
