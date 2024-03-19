import React from 'react';
import { render } from '@testing-library/react';
import DiamondLine from './DiamondLine';
import { DiamondLineProps } from './DiamondLine.types';

const mockProps: DiamondLineProps = {
  side: 'left',
  theme: 'H-HCA-Tangerine',
};

describe('DiamondLine', () => {
  it('Renders svg', async () => {
    const { getByRole } = render(<DiamondLine {...mockProps} />);
    expect(getByRole('svg')).toBeInTheDocument();
  });
});
