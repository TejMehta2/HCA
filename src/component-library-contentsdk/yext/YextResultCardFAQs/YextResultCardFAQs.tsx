'use client';

import React, { useState, type JSX } from 'react';
import Accordion from '../../components/Accordion/Accordion';
import { YextResultCardFAQsProps } from './YextResultCardFAQs.types';

const YextResultCardFAQs = (props: YextResultCardFAQsProps): JSX.Element => {
  const [active, setActive] = useState<boolean>(false);

  const handleShow = () => {
    setActive(!active);
  };

  const { title, children } = props;
  return (
    <Accordion
      title={title}
      children={children}
      onShow={handleShow}
      isActive={active}
    />
  );
};

export default YextResultCardFAQs;
