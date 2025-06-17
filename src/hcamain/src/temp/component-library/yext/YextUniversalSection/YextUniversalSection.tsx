import { Result } from '@yext/search-headless-react';
import React from 'react';
import TextButton from '../../core-components/TextButton/TextButton';
import Icons from '../../foundation/Icons/Icons';
import styles from '../YextSearch/YextSearch.module.scss';
import useSetVertical from '../helpers/useSetVertical';
import { CardProps } from '@yext/search-ui-react';
import { VerticalKey } from '../YextSearch/YextSearch.types';

interface YextUniversalSectionProps<T> {
  results: Result<unknown>[];
  title: string;
  CardComponent: (props: CardProps<T>) => JSX.Element;
  verticalKey?: VerticalKey;
}

const YextUniversalSection = <T,>({
  results,
  CardComponent,
  title,
  verticalKey,
}: YextUniversalSectionProps<T>) => {
  const setVertical = useSetVertical();
  if (!CardComponent) {
    return <div>Missing Card Component</div>;
  }

  return (
    <div>
      <div className={styles.heading}>{title}</div>
      <div className={styles.vertical}>
        {results.map((result, index) => (
          <CardComponent key={index} result={result as Result<T>} />
        ))}
      </div>
      {verticalKey && (
        <TextButton>
          <button
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
              setTimeout(() => {
                setVertical(verticalKey);
              }, 1000);
            }}
          >
            <span>View all</span>
            <Icons iconName={'iconArrowRight'} />
          </button>
        </TextButton>
      )}
    </div>
  );
};

export default YextUniversalSection;
