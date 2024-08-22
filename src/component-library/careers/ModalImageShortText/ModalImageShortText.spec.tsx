import React from 'react';
import { render } from '@testing-library/react';
import ModalImageShortText from './ModalImageShortText';
import { ModalImageShortTextProps } from './ModalImageShortText.types';
import Text from '../../foundation/Text/Text';

const mockProps: ModalImageShortTextProps = {
  defaultOpen: true,
  image: <></>,
  subheader: (
    <Text variation={'subheading-1'}>staff nurse (return to practice)</Text>
  ),
  header: <Text variation={'display-2'}>All about Linda</Text>,
  copy: (
    <Text tag="div" variation={'body-large'}>
      “This has been a brilliant place to refresh my skills because there&apos;s
      such a diverse range of advanced care. The high standards are inspiring -
      every day, I want to improve.
      <br></br>
      <br></br>HCA UK aren&apos;t just employing me during the &apos;Return to
      Practice&apos; programme, they&apos;re also covering the fees. As soon as
      I get my Nursing and Midwifery Council (NMC) PIN, I&apos;ll be able to
      start as a permanent staff nurse.
      <br></br>
      <br></br>
      The incredible support is the main reason I&apos;d encourage people to
      apply.”
    </Text>
  ),
};

describe('ModalImageShortText', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ModalImageShortText {...mockProps} />);
    expect(getByText('All about Linda')).toBeVisible();
  });
});
