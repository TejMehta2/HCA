import React from 'react';
import { render } from '@testing-library/react';
import ModalText from './ModalText';
import { ModalTextProps } from './ModalText.types';

const mockProps: ModalTextProps = {
  children: <p>Hello world</p>,
};

describe('ModalText', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ModalText {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
