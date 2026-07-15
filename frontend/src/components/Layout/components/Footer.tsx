import { BookOpen } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { paths } from '../../../routes/paths'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-auto border-t border-border/80 bg-surface/90">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent" />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-12 lg:px-8 lg:py-12">
        <div className="max-w-md">
          <Link to={paths.home} className="group inline-flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand text-white transition group-hover:bg-accent dark:text-page">
              <BookOpen size={20} weight="fill" aria-hidden />
            </span>
            <span>
              <span className="block font-display text-lg text-brand transition group-hover:text-accent">
                {t('app.name')}
              </span>
              <span className="block text-xs text-muted">{t('app.tagline')}</span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {t('footer.blurb')}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {t('footer.explore')}
          </p>
          <ul className="mt-3 space-y-2 text-sm font-semibold">
            <li>
              <Link
                to={paths.home}
                className="text-ink/80 transition hover:text-brand"
              >
                {t('app.home')}
              </Link>
            </li>
            <li>
              <a
                href="/#catalog"
                className="text-ink/80 transition hover:text-brand"
              >
                {t('footer.catalog')}
              </a>
            </li>
            <li>
              <Link
                to={paths.shelf}
                className="text-ink/80 transition hover:text-brand"
              >
                {t('app.myShelf')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {t('footer.account')}
          </p>
          <ul className="mt-3 space-y-2 text-sm font-semibold">
            <li>
              <Link
                to={paths.login}
                className="text-ink/80 transition hover:text-brand"
              >
                {t('app.login')}
              </Link>
            </li>
            <li>
              <Link
                to={paths.shelf}
                className="text-ink/80 transition hover:text-brand"
              >
                {t('footer.loans')}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>{t('footer.copyright', { year })}</p>
          <p>{t('footer.note')}</p>
        </div>
      </div>
    </footer>
  )
}
