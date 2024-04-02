import React from 'react';
import { FormBuilderProps } from './FormBuilder.types';

const FormBuilder = (props: FormBuilderProps): JSX.Element => {
  const { children } = props;
  return <div>{children}</div>;
};

export default FormBuilder;
