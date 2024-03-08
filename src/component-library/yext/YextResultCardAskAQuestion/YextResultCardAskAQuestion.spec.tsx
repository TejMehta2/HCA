import React from 'react';
import { render } from '@testing-library/react';
import YextResultCardAskAQuestion from './YextResultCardAskAQuestion';
import { YextResultCardAskAQuestionProps } from './YextResultCardAskAQuestion.types';

const mockProps: YextResultCardAskAQuestionProps = {
  children: <p>Hello world</p>,
};

describe('YextResultCardAskAQuestion', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<YextResultCardAskAQuestion {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
