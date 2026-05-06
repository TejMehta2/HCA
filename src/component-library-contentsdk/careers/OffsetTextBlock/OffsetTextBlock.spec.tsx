import React from 'react';
import { render } from '@testing-library/react';
import OffsetTextBlock from './OffsetTextBlock';
import { OffsetTextBlockProps } from './OffsetTextBlock.types';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';

const mockProps: OffsetTextBlockProps = {
  title: (
    <Text tag="h2" variation="display-1">
      Caring for patients is more than a job: it&apos;s a&nbsp;
      <Text tag="span" variation="decorative">
        calling
      </Text>
      .
    </Text>
  ),
  bodyCopy: (
    <Text variation="body-large" tag="p">
      Life with us means taking pride in your team and delivering the highest
      quality care. We&apos;ll support your ongoing learning in an environment
      that features advanced equipment and practices, one of the best
      colleague-to-patient ratios in the UK and varied, interesting work. As
      part of HCA US, one of the nation&apos;s leading providers of healthcare
      services, we can also promise that you&apos;ll learn from experts in every
      department and that your opportunities will be endless. With us,
      you&apos;ll be empowered to achieve more in your career, and more for our
      patients.
    </Text>
  ),
  ctas: (
    <Button size="large" variation="full">
      <a href="#">Working at HCA UK</a>
    </Button>
  ),
};

describe('OffsetTextBlock', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<OffsetTextBlock {...mockProps} />);
    expect(getByText('Working at HCA UK')).toBeVisible();
  });
});
