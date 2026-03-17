import React from 'react';
import Link from 'next/link';
import styles from './PopularSearchesBox.module.scss';
import Text from '../../foundation/Text/Text';
import { PopularSearchesBoxProps } from './PopularSearchesBox.types';
import TextLink from '../../core-components/TextLink/TextLink';

const PopularSearchesBox = (props: PopularSearchesBoxProps): JSX.Element => {
    const { popularSearches, popularSearchesTtitle } = props;

    return (
        <div className={styles.wrapper} aria-label="Popular searches">
            <div className={styles.title}>
                <Text tag="h3" variation="subheading-2">
                    {popularSearchesTtitle}
                </Text>
            </div>

            {popularSearches?.length > 0 && (
                <div className={styles.popularSearches} role="navigation" aria-label="Popular searches links">
                    {popularSearches.map((item: any, index: number) => (
                        <React.Fragment key={`${item?.label ?? 'item'}-${index}`}>
                            <TextLink>
                                <Link
                                    href={item.href}
                                    className={styles.links}
                                >
                                    {item.label}
                                </Link>
                            </TextLink>

                            {index !== popularSearches.length - 1 && (
                                <span className={styles.separator} aria-hidden="true">
                                    ·
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PopularSearchesBox;
