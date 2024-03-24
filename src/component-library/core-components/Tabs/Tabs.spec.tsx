import React from 'react';
import { render, act } from '@testing-library/react';
import Tabs from './Tabs';
import { TabsProps } from './Tabs.types';

const mockProps = {
  callback: (args: {
    label: string;
    value: string;
    name: string;
    index: number;
  }) => console.log(args.label),
  tabs: [
    { icon: 'iconOneOff', label: 'One-off' },
    { icon: 'iconFlexible', label: 'Flexi' },
    { icon: 'iconCalendar', label: 'Annual' },
  ],
};

describe('Tabs', () => {
  it('Renders the tabs', async () => {
    const { getByText } = render(<Tabs {...(mockProps as TabsProps)} />);
    expect(getByText(mockProps.tabs[0].label)).toBeVisible();
    expect(getByText(mockProps.tabs[1].label)).toBeVisible();
    expect(getByText(mockProps.tabs[2].label)).toBeVisible();
  });
  it('Calls the callback function with the label of a clicked tab', async () => {
    let tab = '';
    const callback = ({
      label,
    }: {
      label: string;
      value: string;
      name: string;
      index: number;
    }) => {
      tab = label;
    };
    const { getByText } = render(
      <Tabs {...(mockProps as TabsProps)} callback={callback} />
    );

    await act(async () => {
      await getByText(mockProps.tabs[1].label).click(); // Click the second item
    });

    await expect(tab).toBe(mockProps.tabs[1].label);

    await act(async () => {
      await getByText(mockProps.tabs[2].label).click(); // Click the third item
    });

    await expect(tab).toBe(mockProps.tabs[2].label);
  });
  it('Does not call the callback function when the current tab is clicked', async () => {
    let tab = '';
    const callback = ({
      label,
    }: {
      label: string;
      value: string;
      name: string;
      index: number;
    }) => {
      tab = label;
    };
    const { getByText } = render(
      <Tabs {...(mockProps as TabsProps)} callback={callback} />
    );
    await act(async () => {
      await getByText(mockProps.tabs[0].label).click();
    });

    await expect(tab).not.toBe(mockProps.tabs[0].label);
  });
});
