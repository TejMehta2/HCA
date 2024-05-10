import React from 'react';
import { render } from '@testing-library/react';
import TextBlock from './TextBlock';
import { TextBlockProps } from './TextBlock.types';
import Button from '../../core-components/Button/Button';
import Text from '../../foundation/Text/Text';

const mockProps: TextBlockProps = {
  title: <Text variation={'display-2'}>What does a CT scan show?</Text>,
  subheading: <Text variation={'subheading-1'}>Subheading</Text>,
  text: (
    <Text variation={'body-large'}>
      CT scans show detailed images of the many structures that make up our
      body. This includes images of bones, blood vessels and our internal
      organs. A CT scan can detect a significant and abnormal injury to the
      body, even in its early stages. CT scans are especially helpful for
      investigating orthopaedic injuries. This is due to its advanced
      capabilities such as detecting tears in bone tissue that an X-ray would be
      unable to identify. It is also used as part of cardiac
      diagnostics and virtual colonoscopy for gastrointestinal problems. The
      detailed imaging a CT scan provides imaging for orthopaedic conditions
      including spinal injuries. This is because it’s able to provide far
      detailed more information about the vertebrae and other spinal structures
      than a normal X-ray can. Our weight-bearing CT scanner for lower limb
      at Elstree Outpatients & Diagnostic Centre, and our weight-bearing CT
      scanner for foot, ankle and knee at HCA UK at The Shard, allow for highly
      advanced evaluations of dynamic bone deformities. Showing far improved
      visualisation of the joint than conventional weight bearing X-ray, the
      weight-bearing CT scanner ensures our specialists give patients a more
      accurate diagnosis and treatment plan possible.  The role of the CT
      scanner in health screening is particularly prevalent in bowel cancer
      screening and lung cancer screening. Screening is a key area for
      diagnosing conditions early
    </Text>
  ),
  ctas: (
    <>
      <Button size={'large'} variation={'full'}>
        <a href="#">Learn more</a>
      </Button>
      <Button size={'large'} variation={'outline'}>
        <a href="#">Learn more</a>
      </Button>
    </>
  ),
};

describe('TextBlock', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<TextBlock {...mockProps} />);
    expect(getByText('What does a CT scan show?')).toBeVisible();
  });
});
