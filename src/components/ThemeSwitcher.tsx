import { Desktop, Moon, Sun } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'
import { useTheme, type Theme } from '../theme/ThemeProvider'
import { HeaderDropdown, HeaderMenuItem } from './HeaderDropdown'

const THEMES: Theme[] = ['light', 'dark', 'system']

const THEME_ICONS = {
  light: Sun,
  dark: Moon,
  system: Desktop,
} as const

export function ThemeSwitcher() {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()
  const ActiveIcon = THEME_ICONS[theme]

  return (
    <HeaderDropdown
      label={t('theme.label')}
      trigger={
        <>
          <ActiveIcon size={16} weight="fill" aria-hidden />
          <span className="hidden sm:inline">{t(`theme.${theme}`)}</span>
        </>
      }
    >
      {THEMES.map((option) => {
        const Icon = THEME_ICONS[option]
        const isActive = theme === option

        return (
          <HeaderMenuItem
            key={option}
            active={isActive}
            onClick={() => setTheme(option)}
          >
            <Icon size={16} weight={isActive ? 'fill' : 'regular'} aria-hidden />
            {t(`theme.${option}`)}
          </HeaderMenuItem>
        )
      })}
    </HeaderDropdown>
  )
}
