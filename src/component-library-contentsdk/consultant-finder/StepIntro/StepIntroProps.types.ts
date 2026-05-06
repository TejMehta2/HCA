import { ReactNode, type JSX } from 'react';

export interface StepIntroProps {
    children?: ReactNode | JSX.Element;
    search?: ReactNode | JSX.Element;
    headline?: ReactNode | JSX.Element;
    buttons?: ReactNode | JSX.Element;
    popularSearch?: ReactNode | JSX.Element;
}
