import { type JSX } from 'react';
import { Accordions } from '../../components/Accordions/Accordions.types';

export interface FiltersProps {
  filters?: Accordions;
  resultsCount?: number;
  buttonIcon?: JSX.Element;
  buttonText?: JSX.Element;
  submitOnClose?: boolean;
  hideResultsCount?: boolean;
}
