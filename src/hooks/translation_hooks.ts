import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AppString, AppStringKey } from "../constants/AppString";

export const useLocalization = () => {
  const { t, i18n } = useTranslation();

  const localizedStrings = useMemo(() => {
    const result = {} as Record<AppStringKey, string>;

    (Object.keys(AppString) as AppStringKey[]).forEach((key) => {
      result[key] = t(AppString[key]);
    });

    return result;
  }, [t, i18n.language]);
  const translate = (
    key: AppStringKey,
    values?: Record<string, string | number>,
  ) => {
    return t(AppString[key], values);
  };

  return {
    ...localizedStrings,
    translate,
    changeLanguage: (language: string) => i18n.changeLanguage(language),
  };
};
