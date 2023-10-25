import React from 'react'
import Tags from './Tags'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Tags> = {
  title: 'core-components/Tags',
  component: Tags,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
}

export default meta

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Green: StoryObj<typeof Tags> = {
  args: {
    children: <a>Green</a>,
  },
}
export const DarkBlue: StoryObj<typeof Tags> = {
  args: {
    theme: 'dark-blue',
    children: <a>Dark Blue</a>,
  },
}
export const Orange: StoryObj<typeof Tags> = {
  args: {
    theme: 'orange',
    children: <a>Orange</a>,
  },
}
export const White: StoryObj<typeof Tags> = {
  args: {
    theme: 'white',
    children: <a>White</a>,
  },
  parameters: {
    backgrounds: {
      default: 'orange',
      values: [{ name: 'orange', value: '#F9C099' }],
    },
  },
}
export const MainTurquoise: StoryObj<typeof Tags> = {
  args: {
    theme: 'main-turquoise',
    children: <a>Main Turquoise</a>,
  },
}
