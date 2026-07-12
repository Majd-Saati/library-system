import { useTranslation } from 'react-i18next'
import { useTheme, type Theme } from '../theme/ThemeProvider'

const THEMES: Theme[] = ['light', 'dark', 'system']

export function ThemeSwitcher() {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()

  return (
    <div
      className="flex items-center gap-1 rounded-xl bg-brand-light p-1"
      role="group"
      aria-label={t('theme.label')}
    >
      {THEMES.map((option) => {
        const isActive = theme === option

        return (
          <button
            key={option}
            type="button"
            onClick={() => setTheme(option)}
            aria-pressed={isActive}
            title={t(`theme.${option}`)}
            className={[
              'rounded-lg px-2.5 py-1.5 text-sm font-semibold transition',
              isActive
                ? 'bg-brand text-white dark:text-page'
                : 'text-brand hover:bg-surface/80',
            ].join(' ')}
          >
            {t(`theme.${option}Short`)}
          </button>
        )
      })}
    </div>
  )
}
