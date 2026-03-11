import React, { useCallback, useMemo, useState } from 'react';
import CardMap from '../../components/CardMap/CardMap';
import GoogleMapsEmbed from './GoogleMapsEmbed';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../foundation/Themes/Themes';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';
import styles from './GoogleMapsEmbed.stories.module.scss';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof GoogleMapsEmbed> = {
  title: 'core-components/GoogleMapsEmbed',
  component: GoogleMapsEmbed,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};
export default meta;

const DemoGoogleMapsEmbed = () => {
  const [cardVisible, setCardVisible] = useState(false);

  const callback = useCallback((map: google.maps.Map) => {
    // Map logic here
    const marker = new window.google.maps.Marker({
      position: {
        lat: 51.52036,
        lng: -0.14797,
      },
      map,
      title: 'Marker Title',
    });
    marker.addListener('click', () => {
      setCardVisible(true);
    });
  }, []);

  const mapMemo = useMemo(
    () => (
      <GoogleMapsEmbed
        apiKey={process.env.STORYBOOK_GOOGLE_MAPS_API_KEY || ''}
        center={{
          lat: 51.5072,
          lng: 0.1276,
        }}
        zoom={10}
        callback={callback}
      />
    ),
    [callback]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        {mapMemo}
        <div className={styles.children}>
          {cardVisible && (
            <CardMap
              title={
                <Text tag="h3" variation="heading-2">
                  The Harley Street Clinic
                </Text>
              }
              address={
                <Text tag="p" variation="body-large">
                  35 Weymouth Street W1G 8BJ London
                </Text>
              }
              ctas={{
                button1: (
                  <a href="#">
                    <span>
                      Learn <strong>more</strong>
                    </span>
                  </a>
                ),
                button2: (
                  <a href="#">
                    <span>
                      Get <strong>directions</strong>
                    </span>
                  </a>
                ),
                close: (
                  <button onClick={() => setCardVisible(false)}>
                    <span>Close</span>
                    <Icons iconName="iconCross" />
                  </button>
                ),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof GoogleMapsEmbed> = {
  render: DemoGoogleMapsEmbed,
  args: {},
  decorators: [
    (Story) => (
      <Themes theme={'D-HCA-Teal'}>
        <Story />
      </Themes>
    ),
  ],
};
