import React from 'react';
import BlogContent from './BlogContent';
import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';
import QuoteBlock from '../../components/QuoteBlock/QuoteBlock';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof BlogContent> = {
  title: 'site-components/BlogContent',
  component: BlogContent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const BlogText: StoryObj<typeof BlogContent> = {
  args: {
    theme: 'A-HCA-White',
    children: (
      <div>
        <h1>&quot;Nothing but excellent&quot;</h1>
        <p>
          The CQC highlighted a &quot;strong, visible person-centred
          culture&quot; at London Bridge Hospital, where colleagues are highly
          motivated to offer kind and compassionate care. According to the
          report, relatives of patients described staff as “nothing but
          excellent” and found them to be very caring and &quot;always
          smiling&quot;.
        </p>
        <p>
          After inspecting the hospital&apos;s level 3 22- bed Critical Care
          Unit,&nbsp; the CQC also noted that staff were &quot;proud to work in
          critical care&quot;, &quot;enthusiastic about the care and services
          they provided&quot;, and &quot;felt valued and supported by the team
          members and management.&quot;
        </p>
        <p>
          Looking more closely at leadership, the CQC reported that London
          Bridge Hospital&apos;s leadership team &quot;demonstrated high levels
          of experience and capability to deliver sustainable care&quot;. Staff
          spoke highly of management, commenting on the &quot;friendliness and
          visibility of the senior leaders&quot; and stating that &quot;leaders
          demonstrated a passion for developing, upskilling and supporting
          staff.&quot;
        </p>
        <p>
          In addition to championing London Bridge Hospital&apos;s staff and
          leadership, the CQC also complimented its patient-centred processes
          and initiatives, including;
        </p>
        <ul>
          <li>
            the 24-hour, 7 day a week medical concierge and triage service,
            which accepted urgent, unplanned admissions into London Bridge
            Hospit
          </li>
          <li>
            the development of a bespoke pain scoring tool for liver transplant
            patients,
          </li>
          <li>
            and the hospital&apos;s commitment to ensuring international
            patients from all over the world had their needs met, by providing
            carers with the same cultural and religious orientation who could
            relate to a patient needs and reassure them and their families.
          </li>
        </ul>
      </div>
    ),
  },
};

export const BlogImage: StoryObj<typeof BlogContent> = {
  args: {
    theme: 'A-HCA-White',
    children: (
      <figure>
        <Image
          src="/placeholders/children-playing.jpg"
          alt="children playing"
          width="1120"
          height="523"
        />
      </figure>
    ),
  },
};

export const BlogVideo: StoryObj<typeof BlogContent> = {
  args: {
    theme: 'A-HCA-White',
    children: (
      <figure>
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
      </figure>
    ),
  },
};

export const BlogQuote: StoryObj<typeof BlogContent> = {
  args: {
    theme: 'A-HCA-White',
    contentVariation: 'quote',
    children: (
      <QuoteBlock
        author={{
          name: 'John Smith',
          image: (
            <Image
              src="/placeholders/quote-block-author.png"
              alt="author of quote"
              width="70"
              height="70"
            />
          ),
          tag: <a href="#">Orthopaedics Consultant</a>,
        }}
      >
        &quot;The personal savings allowance enables most people to earn
        interest tax-free across various savings options.&quot;
      </QuoteBlock>
    ),
  },
};
