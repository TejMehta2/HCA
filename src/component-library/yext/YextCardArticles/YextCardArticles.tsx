import React from 'react';
import { YextCardArticlesProps } from './YextCardArticles.types';
import styles from './YextCardArticles.module.scss';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import Button from '../../core-components/Button/Button';
import TextButton from '../../core-components/TextButton/TextButton';
import Icons from '../../foundation/Icons/Icons';

// TODO - generate types using `yext types generate pages` with a stream object setup.
// eslint-disable-next-line
const Adaptor = (props: any) => {
  const { result } = props;
  return (
    <YextCardArticles
      image={
        result.rawData.c_primaryImage?.sourceUrl && (
          <Image
            alt={''}
            src={result.rawData.c_primaryImage?.sourceUrl}
            width={140}
            height={140}
          />
        )
      }
      title={result.name}
      description={result.rawData.s_snippet}
      cta1={
        <Button size={'large'} variation={'full'}>
          <a href={result.landingPageUrl}>Read more</a>
        </Button>
      }
      cta2={
        <TextButton>
          <a href={result.landingPageUrl}>
            <span>
              <Icons iconName={'iconEmail'} />
            </span>
            <span>Email us</span>
          </a>
        </TextButton>
      }
    />
  );
};
const YextCardArticles = (props: YextCardArticlesProps): JSX.Element => {
  const { image, title, description, cta1, cta2 } = props;
  return (
    <div className={styles.wrapper}>
      {image && <div className={styles.image}>{image}</div>}
      <div className={styles.content}>
        {title && (
          <div className={styles.title}>
            <Text tag="h3" variation={'heading-1'}>
              {title}
            </Text>
          </div>
        )}
        {description && (
          <div className={styles.description}>
            <Text tag="div" variation={'body-large'}>
              {description}
            </Text>
          </div>
        )}
      </div>
      <div className={styles.buttons}>
        {cta1 && <div className={styles.cta1}>{cta1}</div>}
        {cta2 && <div className={styles.cta2}>{cta2}</div>}
      </div>
    </div>
  );
};

export default Adaptor;
