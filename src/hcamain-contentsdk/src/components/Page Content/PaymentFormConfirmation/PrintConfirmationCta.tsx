'use client';

import { type JSX } from 'react';
import Button from '@component-library/core-components/Button/Button';
import Icons from '@component-library/foundation/Icons/Icons';

const PrintConfirmationCta = (): JSX.Element => (
  <Button variation="full-dark" size="large">
    <button
      onClick={() => {
        window.print();
      }}
    >
      <Icons iconName="iconPrint" />
      Print confirmation
    </button>
  </Button>
);

export default PrintConfirmationCta;
