import React from 'react';
import { render } from '@testing-library/react';
import ModalDropdown from './ModalDropdown';
import { ModalDropdownProps } from './ModalDropdown.types';

const mockProps: ModalDropdownProps = {
  children: <p>Hello world</p>,
};

describe('ModalDropdown', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(
      <ModalDropdown {...mockProps} defaultOpen={true} />
    );
    expect(getByText('Hello world')).toBeVisible();
  });
  it('Renders an open dialog when prop defaultOpen set', async () => {
    const { getByTestId } = render(
      <ModalDropdown {...mockProps} defaultOpen={true} />
    );
    expect(getByTestId('dialog')).toHaveAttribute('open');
  });
  it('Renders a closed dialog when prop defaultOpen set', async () => {
    const { getByTestId } = render(<ModalDropdown {...mockProps} />);
    expect(getByTestId('dialog')).not.toHaveAttribute('open');
  });
});
