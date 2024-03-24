import React from 'react';
import { render } from '@testing-library/react';
import ArticleCategories from './ArticleCategories';
import { ArticleCategoriesProps } from './ArticleCategories.types';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';

const mockProps: ArticleCategoriesProps = {
  theme: 'H-HCA-Tangerine',
  title: (
    <Text variation="display-3" tag="h3">
      Article categories
    </Text>
  ),
  categories: [
    <a href="#" key={1}>
      <Icons iconName="iconFilterCircle" />
      <span>General Health</span>
    </a>,
    <a href="#" key={2}>
      <Icons iconName="iconFilterCircle" />
      <span>Cardiac Care</span>
    </a>,
    <a href="#" key={3}>
      <Icons iconName="iconFilterCircle" />
      <span>Cancer Care</span>
    </a>,
    <a href="#" key={4}>
      <Icons iconName="iconFilterCircle" />
      <span>Orthopaedic Care</span>
    </a>,
    <a href="#" key={5}>
      <Icons iconName="iconFilterCircle" />
      <span>Woman&apos;s Health</span>
    </a>,
    <a href="#" key={6}>
      <Icons iconName="iconFilterCircle" />
      <span>Men&apos;s Health</span>
    </a>,
    <a href="#" key={7}>
      <Icons iconName="iconFilterCircle" />
      <span>Paediatrics</span>
    </a>,
    <a href="#" key={8}>
      <Icons iconName="iconFilterCircle" />
      <span>Clinical neurosciences</span>
    </a>,
    <a href="#" key={9}>
      <Icons iconName="iconFilterCircle" />
      <span>Consultant Q&A</span>
    </a>,
  ],
};

describe('ArticleCategories', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ArticleCategories {...mockProps} />);
    expect(getByText('Article categories')).toBeVisible();
  });
});
