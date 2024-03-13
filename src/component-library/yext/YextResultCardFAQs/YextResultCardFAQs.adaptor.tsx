import React from 'react';
import { CardProps } from '@yext/search-ui-react';
import YextResultCardFAQs from './YextResultCardFAQs';

// TODO - replace these props with Yext type generated interfaced
// https://hitchhikers.yext.com/docs/search/search-result-typing/?target=using-generated-types-in-your-project
interface YextArticleCardProps {}

const YextResultCardFAQsAdaptor = (
  props: CardProps<YextArticleCardProps>
): JSX.Element => {
  const {} = props;
  // TODO - unpack props to replace these static values once Yext type generation is available
  const title =
    'HCA Healthcare UK invests £7m in new fleet of state-of- the art da Vinci Xi robots';
  const content =
    'The announcement today includes the investment in the da Vinci&apos;s minimally invasive robotic capability at HCA Healthcare UK&apos;s The Lister Hospital for the first time. HCA Healthcare UK has invested in four new da Vinci Xi robots, confirming its status...';

  return <YextResultCardFAQs title={title}>{content}</YextResultCardFAQs>;
};

export default YextResultCardFAQsAdaptor;
