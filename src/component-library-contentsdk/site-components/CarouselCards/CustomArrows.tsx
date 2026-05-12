'use client';

import React from 'react';
import { CustomArrowProps } from '@ant-design/react-slick';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';

/* Custom previous arrow */
export const PrevArrow = (props: CustomArrowProps) => {
  const { className, onClick } = props;
  return (
    <div className={className}>
      <Button size="small" variation="standard-carousel-dark">
        <button onClick={onClick} disabled={onClick === null && true}>
          <Icons iconName="iconArrowLeft" />
          <span className="sr-only">Previous Slide</span>
        </button>
      </Button>
    </div>
  );
};

/* Custom next arrow */
export const NextArrow = (props: CustomArrowProps) => {
  const { className, onClick } = props;
  return (
    <div className={className}>
      <Button size="small" variation="standard-carousel-dark">
        <button onClick={onClick} disabled={onClick === null && true}>
          <Icons iconName="iconArrowRight" />
          <span className="sr-only">Next Slide</span>
        </button>
      </Button>
    </div>
  );
};
