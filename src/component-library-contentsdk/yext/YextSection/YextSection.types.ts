import { type JSX } from 'react';
interface CardComponentProps {
  result: unknown;
}

export interface YextSectionProps {
  results: unknown[];
  header: JSX.Element;
  CardComponent: (props: CardComponentProps) => JSX.Element;
}
