import { Link, NavLink, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeSwitcher } from './ThemeSwitcher'

export function Layout() {
  const { t } = useTranslation()

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'rounded-lg px-3 py-2 text-sm font-semibold transition',
      isActive
        ? 'bg-brand text-white dark:text-page'
        : 'text-ink/80 hover:bg-brand-light hover:text-brand',
    ].join(' ')

  return (
    <div className="min-h-svh bg-page text-ink">
      <header className="sticky top-0 z-20 border-b border-border bg-surface/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="font-display text-xl tracking-tight text-brand transition hover:text-accent sm:text-2xl"
          >
            {t('app.name')}
          </Link>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <nav className="flex items-center gap-1 sm:gap-2">
              <NavLink to="/" end className={linkClass}>
                {t('app.home')}
              </NavLink>
              <NavLink to="/books" className={linkClass}>
                {t('app.myShelf')}
              </NavLink>
            </nav>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
