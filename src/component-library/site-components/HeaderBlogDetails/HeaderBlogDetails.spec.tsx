import React from 'react';
import { render } from '@testing-library/react';
import HeaderBlogDetails from './HeaderBlogDetails';
import { HeaderBlogDetailsProps } from './HeaderBlogDetails.types';
import Tags from '../../core-components/Tags/Tags';
import Text from '../../foundation/Text/Text';

const mockProps: HeaderBlogDetailsProps = {
  theme: 'A-HCA-White',
  tag: (
    <Tags contentVariation="quote">
      <a href="#">Announcement</a>
    </Tags>
  ),
  date: <time dateTime="Sept 7, 2023">Sept 7, 2023</time>,
  title: (
    <Text tag="h1" variation="display-1">
      The Harley Street Clinic retain CQC &apos;Outstanding&apos; rating
    </Text>
  ),
};

describe('HeaderBlogDetails', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<HeaderBlogDetails {...mockProps} />);
    expect(getByText('The Harley Street Clinic retain CQC')).toBeVisible();
  });
});
