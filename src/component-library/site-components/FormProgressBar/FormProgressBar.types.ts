interface Page {
  pageControl: JSX.Element;
  stage?: 'active' | 'inactive' | 'previous';
}

export interface FormProgressBarProps {
  pages: Page[];
}
