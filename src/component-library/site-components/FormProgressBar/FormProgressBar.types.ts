interface Page {
  pageControl: JSX.Element;
  active?: boolean;
}

export interface FormProgressBarProps {
  pages: Page[];
}
