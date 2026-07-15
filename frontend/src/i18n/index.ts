import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import ar from '../locales/ar/translation.json'
import en from '../locales/en/translation.json'

export const SUPPORTED_LANGUAGES = ['en', 'ar'] as const
export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export function getDirection(language: string): 'ltr' | 'rtl' {
  return language.startsWith('ar') ? 'rtl' : 'ltr'
}

export function applyDocumentDirection(language: string) {
  const dir = getDirection(language)
  const lang = language.startsWith('ar') ? 'ar' : 'en'

  document.documentElement.lang = lang
  document.documentElement.dir = dir
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: 'en',
    supportedLngs: [...SUPPORTED_LANGUAGES],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

applyDocumentDirection(i18n.language)

i18n.on('languageChanged', (language) => {
  applyDocumentDirection(language)
})

export default i18n
