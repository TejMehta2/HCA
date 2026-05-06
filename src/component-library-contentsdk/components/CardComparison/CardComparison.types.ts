import { ReactNode, type JSX } from 'react';

export interface PricingVariants {
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
  description?: ReactNode | JSX.Element;
  featuresLabel?: ReactNode | JSX.Element;
  pricingVariants?: PricingVariants[];
  includedPackageItems?: PackageItem[];
  excludedPackageItems?: PackageItem[];
  cta?: ReactNode | JSX.Element;
  tag?: ReactNode | JSX.Element;
  tagVariant?: boolean;
}
