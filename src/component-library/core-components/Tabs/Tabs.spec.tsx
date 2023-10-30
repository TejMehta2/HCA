import React from 'react'
import { render } from '@testing-library/react'
import Tabs from './Tabs'
import { TabsProps } from './Tabs.types'

const mockProps: TabsProps = {
  callback: (name: string) => console.log(name),
  tabs: [
    { icon: 'iconOneOff', label: 'One-off' },
    { icon: 'iconFlexible', label: 'Flexi' },
    { icon: 'iconCalendar', label: 'Annual' },
  ],
}

describe('Tabs', () => {
  it('Renders the tabs', async () => {
    const { getByText } = render(<Tabs {...mockProps} />)
    expect(getByText(mockProps.tabs[0].label)).toBeVisible()
    expect(getByText(mockProps.tabs[1].label)).toBeVisible()
    expect(getByText(mockProps.tabs[2].label)).toBeVisible()
  })
  it('Calls the callback function with the label of a clicked tab', async () => {
    let tab = ''
    const callback = (label: string) => {
      tab = label
    }
    const { getByText } = render(<Tabs {...mockProps} callback={callback} />)
    await getByText(mockProps.tabs[1].label).click() // Click the second item
    await expect(tab).toBe(mockProps.tabs[1].label)

    await getByText(mockProps.tabs[2].label).click() // Click the third item
    await expect(tab).toBe(mockProps.tabs[2].label)
  })
  it('Does not call the callback function when the current tab is clicked', async () => {
    let tab = ''
    const callback = (label: string) => {
      tab = label
    }
    const { getByText } = render(<Tabs {...mockProps} callback={callback} />)
    await getByText(mockProps.tabs[0].label).click()
    await expect(tab).not.toBe(mockProps.tabs[0].label)
  })
})
