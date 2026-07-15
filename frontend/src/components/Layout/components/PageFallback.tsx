import { useTranslation } from 'react-i18next'

export function PageFallback() {
  const { t } = useTranslation()

  return (
    <div
      className="mx-auto flex min-h-[40vh] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8"
      role="status"
      aria-live="polite"
      aria-label={t('app.loading')}
    >
      <div className="flex flex-col items-center gap-3">
        <span
          className="h-9 w-9 animate-spin rounded-full border-2 border-brand/25 border-t-brand"
          aria-hidden
        />
        <p className="text-sm font-medium text-muted">{t('app.loading')}</p>
      </div>
    </div>
  )
}
