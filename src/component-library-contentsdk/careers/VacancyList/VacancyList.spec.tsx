import React from 'react';
import { render } from '@testing-library/react';
import VacancyList from './VacancyList';
import { VacancyListProps } from './VacancyList.types';
import Button from '../../core-components/Button/Button';
import YextResultCardCareers from '../../yext/YextResultCardCareers/YextResultCardCareers';
import Text from '../../foundation/Text/Text';

const cardHeadings = [
  'EHR Registration Scheduling Change Lead',
  'Staff Nurse - Outpatients',
  'Senior Staff Nurse - Medical Ward',
  'Copywritter',
  'Taxation Accoutant',
  'Medical Laboratory Assistant (Grade 4)',
];

const mockProps: VacancyListProps = {
  title: <Text variation={'display-3'}>Latest vacancies</Text>,
  filters: <p>Filters</p>,
  cards: (
    <>
      {cardHeadings.map((title, index) => (
        <YextResultCardCareers
          key={index}
          title={<Text variation={'heading-1'}>{title}</Text>}
        />
      ))}
    </>
  ),
  cta: (
    <Button variation="full" size="large">
      <a href="#">
        <span>
          View <strong>all 251 vacancies</strong>
        </span>
      </a>
    </Button>
  ),
};

describe('VacancyList', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<VacancyList {...mockProps} />);
    expect(getByText('Latest vacancies')).toBeVisible();
  });
});
