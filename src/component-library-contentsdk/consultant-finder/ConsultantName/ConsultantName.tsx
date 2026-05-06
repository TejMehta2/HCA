import React, { type JSX } from 'react';
import { useRouter } from 'next/router';
import { ConsultantNameProps } from './ConsultantName.types';
import styles from './ConsultantName.module.scss';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';

const ConsultantName = ({
    name,
    variation,
    resultsLink,
    search,
    keywordId
}: ConsultantNameProps): JSX.Element => {
    const router = useRouter();

    return <div
        className={`${styles.name} ${variation === 'light' ? styles['name-light'] : ''
            }`}
    >
        <div className={styles.consultant}>
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
                router.push(
                    `${resultsLink
                    }?search=${search || ''}&keywordId=${keywordId || ''
                    }&sortType=relevance&lat=51.507217&lon=-0.1275862&distance=0&limit=12&offset=0`
                );
            }}
        >
            <Icons iconName="iconEdit" />
        </button>
    </div>;
};

export default ConsultantName;