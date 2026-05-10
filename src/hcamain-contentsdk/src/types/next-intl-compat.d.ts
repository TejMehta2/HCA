import type NextIntlClientProviderComponent from 'next-intl/dist/types/shared/NextIntlClientProvider';
import type defineRoutingFunction from 'next-intl/dist/types/routing/defineRouting';
import type {
  createTranslator as createTranslatorFunction,
  hasLocale as hasLocaleFunction,
} from 'use-intl/core';
import type {
  useLocale as useLocaleFunction,
  useMessages as useMessagesFunction,
  useTranslations as useTranslationsFunction,
} from 'use-intl/react';

declare module 'next-intl' {
  export const NextIntlClientProvider: typeof NextIntlClientProviderComponent;
  export const createTranslator: typeof createTranslatorFunction;
  export const hasLocale: typeof hasLocaleFunction;
  export const useLocale: typeof useLocaleFunction;
  export const useMessages: typeof useMessagesFunction;
  export const useTranslations: typeof useTranslationsFunction;
}

declare module 'next-intl/routing' {
  export const defineRouting: typeof defineRoutingFunction;
}
