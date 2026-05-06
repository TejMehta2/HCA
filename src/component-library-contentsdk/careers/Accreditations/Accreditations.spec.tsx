import React from 'react';
import { render } from '@testing-library/react';
import Accreditations from './Accreditations';
import { AccreditationsProps } from './Accreditations.types';

const mockProps: AccreditationsProps = {
  items: [
    {
      text: <>Hello world</>,
      logo: <></>,
    },
    {
      text: (
        <>
          We take our quality of care very seriously as every one of our
          facilities is monitored, inspected and regulated by CQC. They’ve rated
          90% of them either Good or Outstanding.
        </>
      ),
      logo: <></>,
    },
    {
      text: (
        <>
          HCA UK are delighted to receive the Best in Class Interactive Media
          Award in the &quot;Recruiting&quot; category for our careers website.
        </>
      ),
      logo: <></>,
    },
    {
      text: (
        <>
          HCA UK is proud to be part of the Disability confident scheme which
          supports employers to successfully employ and retain disabled people
          and those with health conditions.
        </>
      ),
      logo: <></>,
    },
  ],
};

describe('Accreditations', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Accreditations {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
