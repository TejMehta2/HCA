import React from 'react';
import { render } from '@testing-library/react';
import VideoBlock from './VideoBlock';
import { VideoBlockProps } from './VideoBlock.types';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import TextButton from '../../core-components/TextButton/TextButton';
import AdvancedBlockHeader from '../../components/AdvancedBlockHeader/AdvancedBlockHeader';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import Image from 'next/image';

const mockProps: VideoBlockProps = {
  header: (
    <AdvancedBlockHeader
      subtitle={<Text variation={'subheading-1'}>Meta Title</Text>}
      title={<Text variation={'display-2'}>Video Block</Text>}
      body={
        <Text variation={'body-large'}>
          Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
          cillum mollit officia tempor in ad non consequat esse. Sunt culpa
          adipisicing eiusmod ullamco eu esse laborum deserunt et officia
          reprehenderit.
        </Text>
      }
      ctas={
        <>
          <Button size={'small'} variation={'full'}>
            <a href="#">
              <span>
                Learn more about <strong>self-pay</strong>
              </span>
            </a>
          </Button>
          <TextButton>
            <a href="#">
              <span>
                Access care with <strong>insurance</strong>
              </span>
            </a>
          </TextButton>
        </>
      }
    />
  ),

  video: (
    <VideoPlayer
      videoUrl="https://www.youtube.com/embed/M7lc1UVf-VE"
      overlayImage={
        <Image
          src="/placeholders/london.jpg"
          alt="london skyline"
          width="1120"
          height="631"
        />
      }
    ></VideoPlayer>
  ),
};

describe('VideoBlock', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<VideoBlock {...mockProps} />);
    expect(getByText('Video Block')).toBeVisible();
  });
});
