import React from 'react';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import YextResultCardArticles from './YextResultCardArticles';
import Button from '../../core-components/Button/Button';
import { CardProps } from '@yext/search-ui-react';

// TODO - replace these props with Yext type generated interfaced
// https://hitchhikers.yext.com/docs/search/search-result-typing/?target=using-generated-types-in-your-project
interface YextArticleCardProps {}

const YextResultCardArticlesAdaptor = (
  props: CardProps<YextArticleCardProps>
): JSX.Element => {
  const {} = props;
  // TODO - unpack props to replace these static values once Yext type generation is available
  const title =
    'HCA Healthcare UK invests £7m in new fleet of state-of- the art da Vinci Xi robots';
  const description =
    'The announcement today includes the investment in the da Vinci&apos;s minimally invasive robotic capability at HCA Healthcare UK&apos;s The Lister Hospital for the first time. HCA Healthcare UK has invested in four new da Vinci Xi robots, confirming its status...';
  const image = {
    alt: '',
    src: '/placeholders/children-playing.jpg',
    width: 140,
    height: 140,
  };
  const cta = {
    url: '#',
    label: 'Read more',
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
      description={
        <Text tag="div" variation={'body-large'}>
          {description}
        </Text>
      }
      cta={
        <Button size={'large'} variation={'full'}>
          <a href={cta.url}>{cta.label}</a>
        </Button>
      }
    />
  );
};

export default YextResultCardArticlesAdaptor;
