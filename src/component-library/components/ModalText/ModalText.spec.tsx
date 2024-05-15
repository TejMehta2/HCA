import React from 'react';
import { render } from '@testing-library/react';
import ModalText from './ModalText';
import { ModalTextProps } from './ModalText.types';
import Text from '../../foundation/Text/Text';

const mockProps: ModalTextProps = {
  theme: 'A-HCA-White',
  defaultOpen: true,
  title1: (
    <Text tag="h4" variation="display-4">
      Included
    </Text>
  ),
  copy1: (
    <div>
      <h4>Before Admission</h4>
      <ul>
        <li>Pre-assessment</li>
      </ul>
      <h4>During your hospital stay</h4>
      <ul>
        <li>Accommodation in a standard room as quoted above</li>
        <li>Routine admission tests</li>
        <li>Patient meals are included but not transferable</li>
        <li>Nursing care and facilities</li>
        <li>Theatre fees, drugs and dressings</li>
        <li>Removal of stitches, dressing and plaster as required</li>
        <li>Take home medication&nbsp;</li>
      </ul>
      <p>&nbsp;</p>
      <p>
        For self-pay patients, please ask your consultant for information on our
        fixed price self-pay hip replacement packages.&nbsp; For peace of mind
        on your hospital and surgery costs, you may be eligible for one of the
        fixed price packages that are available.
      </p>
    </div>
  ),
  title2: (
    <Text tag="h4" variation="display-4">
      Not included
    </Text>
  ),
  copy2: (
    <ul>
      <li>Any additional nights in hospital not described in the above</li>
      <li>Specialist nursing above and beyond required level of care</li>
      <li>Any post-operative treatments/consultations which may be required</li>
      <li>
        Any readmission due to complications will result in additional charges
        in line with our standard prices
      </li>
      <li>
        Personal costs including visitors&rsquo; meals and drinks as well as
        newspapers
      </li>
      <li>Any costs not specified as included</li>
    </ul>
  ),
};

jest.mock('next-localization', () => ({
  useI18n: () => {
    return {
      t: (str: string) => str,
    };
  },
}));

describe('ModalText', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ModalText {...mockProps} />);
    expect(getByText('Before Admission')).toBeVisible();
  });
});
