import React from 'react';
import { render } from '@testing-library/react';
import TemplateComponent from './TemplateComponent';
import { TemplateComponentProps } from './TemplateComponent.types';

const mockProps: TemplateComponentProps = {
  children: <p>Hello world</p>,
};

describe('TemplateComponent', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<TemplateComponent {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
