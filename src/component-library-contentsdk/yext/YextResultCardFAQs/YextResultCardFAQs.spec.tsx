import React from 'react';
import { render } from '@testing-library/react';
import YextResultCardFAQs from './YextResultCardFAQs';
import { YextResultCardFAQsProps } from './YextResultCardFAQs.types';

const mockProps: YextResultCardFAQsProps = {
  title: 'How long will I have to wait to book a hip pain appointment?',
  children: (
    <p>
      Eiusmod irure nostrud culpa veniam nisi incididunt nostrud commodo
      deserunt anim quis cupidatat irure duis. Eu voluptate pariatur non. Elit
      dolore consequat veniam et. Eiusmod consectetur sit dolor laborum
      excepteur laborum quis.
    </p>
  ),
};

describe('YextResultCardFAQs', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<YextResultCardFAQs {...mockProps} />);
    expect(getByText('Eiusmod irure nostrud')).toBeVisible();
  });
});
