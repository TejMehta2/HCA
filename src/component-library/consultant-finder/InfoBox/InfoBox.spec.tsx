import React from 'react';
import { render } from '@testing-library/react';
import InfoBox from './InfoBox';
import { InfoBoxProps } from './InfoBox.types';

const mockProps: InfoBoxProps = {
  icon: null,
  isShortInfo: true,
  shortText: 'short text',
  longTextTitle: 'long title',
  longText: 'long text',
  backgroundColour: 'green',
};

describe('InfoBox', () => {
  it('Renders short text when isShortInfo is true', async () => {
    const { getByText, queryByText } = render(<InfoBox {...mockProps} />);
    const shortTextElement = getByText('short text');
    const longTextElement = queryByText('long text');

    expect(shortTextElement).toBeVisible();
    expect(longTextElement).toBeNull();
  });

  it('Renders long text when isShortInfo is false', async () => {
    const propsWithLongText = { ...mockProps, isShortInfo: false };
    const { getByText, queryByText } = render(
      <InfoBox {...propsWithLongText} />
    );
    const longTextElement = getByText('long text');
    const shortTextElement = queryByText('short text');

    expect(longTextElement).toBeVisible();
    expect(shortTextElement).toBeNull();
  });
});
