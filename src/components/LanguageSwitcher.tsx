import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES, type AppLanguage } from '../i18n'

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const currentLanguage = (i18n.resolvedLanguage ?? i18n.language).startsWith('ar')
    ? 'ar'
    : 'en'

  function changeLanguage(language: AppLanguage) {
    void i18n.changeLanguage(language)
  }

  return (
    <div
      className="flex items-center gap-1 rounded-xl bg-brand-light p-1"
      role="group"
      aria-label={t('language.label')}
    >
      {SUPPORTED_LANGUAGES.map((language) => {
        const isActive = currentLanguage === language

        return (
          <button
            key={language}
            type="button"
            onClick={() => changeLanguage(language)}
            aria-pressed={isActive}
            className={[
              'rounded-lg px-2.5 py-1.5 text-sm font-semibold transition',
              isActive
                ? 'bg-brand text-white'
                : 'text-brand hover:bg-white/80',
            ].join(' ')}
          >
            {t(`language.${language}`)}
          </button>
        )
      })}
    </div>
  )
}
