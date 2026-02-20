import React from 'react';
import RichText from './RichText';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof RichText> = {
  title: 'core-components/RichText',
  component: RichText,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof RichText> = {
  args: {
    children: (
      <>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <p>
          <b>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor in ad non consequat esse. Sunt culpa
            adipisicing eiusmod ullamco eu esse laborum deserunt et officia
            reprehenderit. Aliquip laboris duis ex labore veniam labore do
            nostrud minim labore eiusmod voluptate sit commodo officia. Commodo
            tempor tempor magna deserunt sunt dolore dolore.
          </b>
        </p>

        <p>
          <i>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor in ad non consequat esse. Sunt culpa
            adipisicing eiusmod ullamco eu esse laborum deserunt et officia
            reprehenderit. Aliquip laboris duis ex labore veniam labore do
            nostrud minim labore eiusmod voluptate sit commodo officia. Commodo
            tempor tempor magna deserunt sunt dolore dolore.
          </i>
        </p>

        <p>
          <u>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor in ad non consequat esse. Sunt culpa
            adipisicing eiusmod ullamco eu esse laborum deserunt et officia
            reprehenderit. Aliquip laboris duis ex labore veniam labore do
            nostrud minim labore eiusmod voluptate sit commodo officia. Commodo
            tempor tempor magna deserunt sunt dolore dolore.
          </u>
        </p>

        <p>
          Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
          cillum mollit officia tempor in ad non consequat esse. Sunt culpa
          adipisicing eiusmod ullamco eu esse laborum deserunt et officia
          reprehenderit. Aliquip laboris duis ex labore veniam labore do nostrud
          minim labore eiusmod voluptate sit commodo officia. Commodo tempor
          tempor magna deserunt sunt dolore dolore.
        </p>
        <hr />
        <p>
          <small>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor in ad non consequat esse. Sunt culpa
            adipisicing eiusmod ullamco eu esse laborum deserunt et officia
            reprehenderit. Aliquip laboris duis ex labore veniam labore do
            nostrud minim labore eiusmod voluptate sit commodo officia. Commodo
            tempor tempor magna deserunt sunt dolore dolore.
          </small>
        </p>
        <ul>
          <li>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor in ad non consequat esse.&nbsp;
          </li>
          <li>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor.
          </li>
          <li>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor in ad non consequat esse.&nbsp;
          </li>
          <li>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor.
          </li>
          <li>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor in ad non consequat esse.&nbsp;
          </li>
          <li>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor.
          </li>
        </ul>
        <ol>
          <li>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor in ad non consequat esse.&nbsp;
          </li>
          <li>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor.
          </li>
          <li>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor in ad non consequat esse.&nbsp;
          </li>
          <li>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor.
          </li>
          <li>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor in ad non consequat esse.&nbsp;
          </li>
          <li>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor.
          </li>
        </ol>
        <ol className="circle">
          <li>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor in ad non consequat esse.&nbsp;
          </li>
          <li>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor.
          </li>
          <li>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor in ad non consequat esse.&nbsp;
          </li>
          <li>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor.
          </li>
          <li>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor in ad non consequat esse.&nbsp;
          </li>
          <li>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor.
          </li>
        </ol>
        <a href="#">Lorem ipsum</a>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AMH</td>
              <td>£110</td>
            </tr>
            <tr>
              <td>AMH</td>
              <td>£110</td>
            </tr>
            <tr>
              <td>AMH</td>
              <td>£110</td>
            </tr>
            <tr>
              <td>AMH</td>
              <td>£110</td>
            </tr>
            <tr>
              <td>AMH</td>
              <td>£110</td>
            </tr>
            <tr>
              <td>AMH</td>
              <td>£110</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <Themes theme={'A-HCA-White'}>
        <Story />
      </Themes>
    ),
  ],
};
