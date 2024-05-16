import React from 'react';
import { render } from '@testing-library/react';
import Modals from './Modals';
import { ModalsProps } from './Modals.types';

const dummyText = 'Hello world';
const mockProps: ModalsProps = {
  children: <p>{dummyText}</p>,
};

jest.mock('next-localization', () => ({
  useI18n: () => {
    return {
      t: (str: string) => str,
    };
  },
}));

describe('Modals', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Modals {...mockProps} defaultOpen={true} />);
    expect(getByText(dummyText)).toBeVisible();
  });
  it('Renders an open dialog when prop defaultOpen set', async () => {
    const { getByTestId } = render(
      <Modals {...mockProps} defaultOpen={true} />
    );
    expect(getByTestId('dialog')).toHaveAttribute('open');
  });
  it('Renders a closed dialog when prop defaultOpen set', async () => {
    const { getByTestId } = render(<Modals {...mockProps} />);
    expect(getByTestId('dialog')).not.toHaveAttribute('open');
  });
});
