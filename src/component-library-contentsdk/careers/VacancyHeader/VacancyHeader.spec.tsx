import React from 'react';
import { render } from '@testing-library/react';
import VacancyHeader from './VacancyHeader';
import { VacancyHeaderProps } from './VacancyHeader.types';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';

const mockProps: VacancyHeaderProps = {
  title: <Text variation={'display-1'}>Staff Nurse - Imaging</Text>,
  location: 'Lister Hospital – London',
  clinical: 'Clinical',
  timing: 'Full time',
  vacancyCode: '0041819',
  cta: (
    <Button variation={'full-light'} size="large">
      <a href="#">
        <span>
          Apply <strong>now</strong>
        </span>
        <Icons iconName={'iconArrowRight'} />
      </a>
    </Button>
  ),
};

describe('VacancyHeader', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<VacancyHeader {...mockProps} />);
    expect(getByText('Full time')).toBeVisible();
  });
});
