import React from 'react'
import { render } from '@testing-library/react'
import Icons from './Icons'

describe('Icons', () => {
  it('Renders', async () => {
    const { getByAltText } = render(<Icons iconName="iconCheck" />)
    expect(getByAltText('')).toBeVisible()
  })
})
