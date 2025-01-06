import React from 'react';
import { render } from '@testing-library/react';
import CareersSearchResults from './CareersSearchResults';
import { CareersSearchResultsProps } from './CareersSearchResults.types';
import Button from '../../core-components/Button/Button';
import Text from '../../foundation/Text/Text';
import YextResultCardCareers from '../../yext/YextResultCardCareers/YextResultCardCareers';
import Icons from '../../foundation/Icons/Icons';

const mockProps: CareersSearchResultsProps = {
  count: (
    <>
      <Text variation="heading-1">{123} vacancies</Text>
      <Text variation="body-bold-medium">Showing 1 - 12</Text>
    </>
  ),
  results: (
    <>
      <YextResultCardCareers
        key={'job.data.id'}
        location={'job.data.jobLocation'}
        clinical={'job.data.jobFunction'}
        timing={'job.data.employmentType'}
        title={<Text variation={'heading-1'}>{'job.data.name'}</Text>}
        cta={
          <Button
            contentVariation={'full-width'}
            variation={'full'}
            size={'small'}
          >
            <a href={'job.data.applicationUrl'}>Read More & Apply</a>
          </Button>
        }
      />
    </>
  ),
  cta: (
    <Button size={'large'} variation={'full'}>
      <button onClick={() => {}}>
        <Icons iconName="iconPlus" />
        <span>
          Show <b>more</b>
        </span>
      </button>
    </Button>
  ),
};

describe('CareersSearchResults', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CareersSearchResults {...mockProps} />);
    expect(getByText('Read More & Apply')).toBeVisible();
  });
});
