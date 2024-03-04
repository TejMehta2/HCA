import React from 'react';
import { render } from '@testing-library/react';
import YextResultCardArticles from './YextResultCardArticles';
import { YextResultCardArticlesProps } from './YextResultCardArticles.types';
import Text from '../../foundation/Text/Text';

const mockProps: YextResultCardArticlesProps = {
  title: (
    <Text tag="h3" variation={'heading-1'}>
      HCA Healthcare UK invests £7m in new fleet of state-of- the art da Vinci
      Xi robots
    </Text>
  ),
  description: (
    <Text tag="div" variation={'body-large'}>
      The announcement today includes the investment in the da Vinci&apos;s
      minimally invasive robotic capability at HCA Healthcare UK`&apos;s The
      Lister Hospital for the first time. HCA Healthcare UK has invested in four
      new da Vinci Xi robots, confirming its status...
    </Text>
  ),
  image: (
    <img
      alt={''}
      src={'/placeholders/children-playing.jpg'}
      width={140}
      height={140}
    />
  ),
};

describe('YextResultCardArticles', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<YextResultCardArticles {...mockProps} />);
    expect(
      getByText('The announcement today includes the investment')
    ).toBeVisible();
  });
});
