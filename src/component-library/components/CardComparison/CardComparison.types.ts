import { ReactNode } from 'react';

interface PricingVariants {
  price?: ReactNode | JSX.Element;
  period?: ReactNode | JSX.Element;
  discount?: ReactNode | JSX.Element;
}

export interface PackageItem {
  label?: ReactNode | JSX.Element;
  summary?: ReactNode | JSX.Element;
  info?: ReactNode | JSX.Element;
}

export interface CardComparisonProps {
  title?: ReactNode | JSX.Element;
  subtitle?: ReactNode | JSX.Element;
  pricingVariants?: PricingVariants[];
  includedPackageItems?: PackageItem[];
  excludedPackageItems?: PackageItem[];
  cta?: ReactNode | JSX.Element;
}
