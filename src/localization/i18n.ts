import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
import en from "./locales/en";
import ja from "./locales/ja";

// Detect the device language
const getDeviceLanguage = (): string => {
  const locales = getLocales();
  return locales[0]?.languageCode || "ja";
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ja: { translation: ja },
  },
  lng: getDeviceLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
