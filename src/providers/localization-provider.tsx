"use client";

import React from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance, Resource } from "i18next";
import { initTranslations, LOCALIZATION_NAMESPACES } from "@/locales";

interface LocalizationProviderProps {
  children: React.ReactNode;
  locale: string;
  resources?: Resource;
}

export function LocalizationProvider(props: LocalizationProviderProps) {
  const { children, locale, resources } = props;
  const i18nInstance = createInstance();

  initTranslations(locale, LOCALIZATION_NAMESPACES, i18nInstance, resources);

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
