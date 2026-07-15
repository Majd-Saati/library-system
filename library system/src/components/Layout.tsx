import { BookOpen, SignIn, SignOut } from '@phosphor-icons/react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { useLoansQuery } from '../hooks/useLoansQuery'
import { paths } from '../routes/paths'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  logout,
  selectAuthUser,
  selectIsAuthenticated,
} from '../store/slices/authSlice'
import { HeaderDropdown, HeaderMenuItem } from './HeaderDropdown'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeSwitcher } from './ThemeSwitcher'

function BrandMark() {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-[0_10px_24px_-12px_rgba(27,79,114,0.85)] transition duration-300 group-hover:scale-105 group-hover:bg-accent dark:text-page">
      <BookOpen size={20} weight="fill" aria-hidden />
    </span>
  )
}

export function Layout() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const user = useAppSelector(selectAuthUser)
  const { data: loans = [] } = useLoansQuery()
  const loanCount = loans.length

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'relative rounded-xl px-3.5 py-2 text-sm font-semibold transition duration-200',
      isActive
        ? 'bg-brand text-white shadow-sm dark:text-page'
        : 'text-ink/75 hover:bg-brand-light hover:text-brand',
    ].join(' ')

  function handleLogout() {
    dispatch(logout())
    toast.success(t('login.toast.logout'))
    navigate(paths.home)
  }

  const initials = user?.name
    ? user.name
        .split(/\s+/)
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : ''

  return (
    <div className="min-h-svh bg-page text-ink">
      <header className="sticky top-0 z-20 border-b border-border/80 bg-surface/80 shadow-[0_1px_0_0_rgba(27,79,114,0.04)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent" />

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <Link
            to={paths.home}
            className="group flex min-w-0 items-center gap-3 transition"
          >
            <BrandMark />
            <span className="min-w-0">
              <span className="block truncate font-display text-lg tracking-tight text-brand transition group-hover:text-accent sm:text-xl">
                {t('app.name')}
              </span>
              <span className="mt-0.5 hidden text-xs text-muted sm:block">
                {t('app.tagline')}
              </span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 rounded-2xl bg-brand-light/60 p-1 ring-1 ring-border/70 md:flex"
            aria-label={t('app.navLabel')}
          >
            <NavLink to={paths.home} end className={linkClass}>
              {t('app.home')}
            </NavLink>
            <NavLink to={paths.shelf} className={linkClass}>
              <span className="inline-flex items-center gap-2">
                {t('app.myShelf')}
                {loanCount > 0 && (
                  <span className="grid min-w-5 place-items-center rounded-full bg-accent px-1.5 py-0.5 text-[11px] font-bold leading-none text-white dark:text-page">
                    {loanCount}
                  </span>
                )}
              </span>
            </NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 md:flex">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>

            {isAuthenticated && user ? (
              <HeaderDropdown
                label={user.name}
                trigger={
                  <>
                    <span
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand font-display text-xs font-bold text-white dark:text-page"
                      aria-hidden
                    >
                      {initials}
                    </span>
                    <span className="hidden max-w-28 truncate sm:inline">
                      {user.name}
                    </span>
                  </>
                }
              >
                <div className="border-b border-border px-3 py-2">
                  <p className="truncate text-sm font-semibold text-ink">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-muted">{user.email}</p>
                </div>
                <HeaderMenuItem danger onClick={handleLogout}>
                  <SignOut size={16} weight="bold" aria-hidden />
                  {t('app.logout')}
                </HeaderMenuItem>
              </HeaderDropdown>
            ) : (
              <NavLink
                to={paths.login}
                className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_22px_-14px_rgba(196,122,44,0.9)] transition hover:bg-accent-dark dark:text-page"
              >
                <SignIn size={16} weight="bold" aria-hidden />
                {t('app.login')}
              </NavLink>
            )}
          </div>
        </div>

        <div className="border-t border-border/60 px-4 py-2 sm:px-6 md:hidden lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
            <nav className="flex items-center gap-1" aria-label={t('app.navLabel')}>
              <NavLink to={paths.home} end className={linkClass}>
                {t('app.home')}
              </NavLink>
              <NavLink to={paths.shelf} className={linkClass}>
                <span className="inline-flex items-center gap-2">
                  {t('app.myShelf')}
                  {loanCount > 0 && (
                    <span className="grid min-w-5 place-items-center rounded-full bg-accent px-1.5 py-0.5 text-[11px] font-bold leading-none text-white dark:text-page">
                      {loanCount}
                    </span>
                  )}
                </span>
              </NavLink>
            </nav>
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
