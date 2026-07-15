import { Translate } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'
import { HeaderDropdown, HeaderMenuItem } from './HeaderDropdown'

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const currentLanguage = (i18n.resolvedLanguage ?? i18n.language).startsWith(
    'ar',
  )
    ? 'ar'
    : 'en'

  function changeLanguage(language: 'en' | 'ar') {
    void i18n.changeLanguage(language)
  }

  return (
    <HeaderDropdown
      label={t('language.label')}
      trigger={
        <>
          <Translate size={16} weight="regular" aria-hidden />
          <span>{t(`language.${currentLanguage}`)}</span>
        </>
      }
    >
      {(['en', 'ar'] as const).map((language) => (
        <HeaderMenuItem
          key={language}
          active={currentLanguage === language}
          onClick={() => changeLanguage(language)}
        >
          {t(`language.${language}`)}
        </HeaderMenuItem>
      ))}
    </HeaderDropdown>
  )
}
