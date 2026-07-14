import { Translate } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const currentLanguage = (i18n.resolvedLanguage ?? i18n.language).startsWith('ar')
    ? 'ar'
    : 'en'

  function changeLanguage(language: 'en' | 'ar') {
    void i18n.changeLanguage(language)
  }

  return (
    <div
      className="flex items-center gap-1 rounded-xl bg-brand-light p-1"
      role="group"
      aria-label={t('language.label')}
    >
      <span className="ps-2 text-brand" aria-hidden>
        <Translate size={16} weight="regular" />
      </span>
      {(['en', 'ar'] as const).map((language) => {
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
                ? 'bg-brand text-white dark:text-page'
                : 'text-brand hover:bg-surface/80',
            ].join(' ')}
          >
            {t(`language.${language}`)}
          </button>
        )
      })}
    </div>
  )
}
