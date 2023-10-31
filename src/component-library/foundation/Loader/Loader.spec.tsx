import React from 'react'
import { render } from '@testing-library/react'
import Loader from './Loader'
import { LoaderProps } from './Loader.types'

const mockProps: LoaderProps = {
  children: <p>Hello world</p>,
}

describe('Loader', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Loader {...mockProps} />)
    expect(getByText('Hello world')).toBeVisible()
  })
})
