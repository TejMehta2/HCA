import React from 'react';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import YextResultCardArticles from '../YextResultCardArticles/YextResultCardArticles';
import { CardProps } from '@yext/search-ui-react';

// TODO - replace these props with Yext type generated interfaced
// https://hitchhikers.yext.com/docs/search/search-result-typing/?target=using-generated-types-in-your-project
interface YextArticleCardProps {}

const YextResultCardLinksAdaptor = (
  props: CardProps<YextArticleCardProps>
): JSX.Element => {
  const {} = props;
  // TODO - unpack props to replace these static values once Yext type generation is available
  const title = 'Private Colonoscopy London';
  const description =
    'You could be referred by your GP or physician for a colonoscopy if you&apos;ve had blood in your stool or noticed any changes in your bowel habits. It&apos;s an effective diagnostic procedure that allows our consultant to examine your bowel in detail. You might have a colonoscopy as part of a biopsy...';
  const image = {
    alt: '',
    src: '/placeholders/children-playing.jpg',
    width: 140,
    height: 140,
  };
  const cta = {
    url: '#',
    label: 'Learn more',
  };
  const email = {
    label: 'Email us',
    emailAddress: '#',
  };
  return (
    <YextResultCardArticles
      image={
        <>
          <Image {...image} />
        </>
      }
      title={
        <Text tag="h3" variation={'heading-1'}>
          {title}
        </Text>
      }
      copy={
        <Text tag="div" variation={'body-large'}>
          {description}
        </Text>
      }
      ctas={{
        button: <a href={cta.url}>{cta.label}</a>,
        textButton: <a href={`mailto:${email.emailAddress}`}>{email.label}</a>,
      }}
    />
  );
};

export default YextResultCardLinksAdaptor;
