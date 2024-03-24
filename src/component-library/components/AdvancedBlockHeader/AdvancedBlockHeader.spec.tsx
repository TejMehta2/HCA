import React from 'react';
import { render } from '@testing-library/react';
import AdvancedBlockHeader from './AdvancedBlockHeader';
import { AdvancedBlockHeaderProps } from './AdvancedBlockHeader.types';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import TextButton from '../../core-components/TextButton/TextButton';

const mockProps: AdvancedBlockHeaderProps = {
  subtitle: <Text variation={'subheading-1'}>Sub title</Text>,
  title: <Text variation={'display-2'}>Advanced block</Text>,
  body: (
    <Text variation={'body-large'}>
      Quis laboris proident sint amet id cillum do dolor in tempor est.
      Exercitation aute sint tempor eu ut aliquip commodo enim nulla et laborum
      et culpa minim. Commodo ex laboris pariatur labore nostrud dolore ad sit
      occaecat. Qui ipsum in minim. Nostrud duis cupidatat sunt lorem ut.
    </Text>
  ),
  ctas: (
    <>
      <Button size={'small'} variation={'full'}>
        <span>
          Click <strong>me</strong>
        </span>
      </Button>
      <TextButton>
        <span>
          Click <strong>me</strong>
        </span>
      </TextButton>
    </>
  ),
};

describe('AdvancedBlockHeader', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<AdvancedBlockHeader {...mockProps} />);
    expect(getByText('Sub title')).toBeVisible();
    expect(getByText('Advanced block')).toBeVisible();
  });
});
