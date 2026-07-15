import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { AvailabilityBadge } from '../../components/AvailabilityBadge'
import { useLoansQuery } from '../../hooks/useLoansQuery'
import { paths } from '../../routes/paths'
import { useAppSelector } from '../../store/hooks'
import { selectIsAuthenticated } from '../../store/slices/authSlice'

export function BooksPage() {
  const { t, i18n } = useTranslation()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const { data: loans = [], isLoading, isError, refetch } = useLoansQuery()

  if (!isAuthenticated) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl text-ink">{t('shelf.title')}</h1>
        <p className="mt-2 text-muted">{t('shelf.loginRequired')}</p>
        <Link
          to={paths.login}
          state={{ from: paths.shelf }}
          className="mt-5 inline-flex rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark dark:text-page"
        >
          {t('app.login')}
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl text-ink">{t('shelf.title')}</h1>
      <p className="mt-2 text-muted">{t('shelf.subtitle')}</p>

      {isLoading ? (
        <ul className="mt-8 space-y-4">
          {Array.from({ length: 3 }, (_, index) => (
            <li
              key={index}
              className="flex animate-pulse gap-4 rounded-2xl bg-surface p-4 ring-1 ring-border"
            >
              <div className="h-28 w-20 rounded-lg bg-brand-light" />
              <div className="flex-1 space-y-3 py-2">
                <div className="h-5 w-1/2 rounded bg-brand-light" />
                <div className="h-4 w-1/3 rounded bg-brand-light" />
              </div>
            </li>
          ))}
        </ul>
      ) : isError ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface/70 px-6 py-16 text-center">
          <p className="text-lg font-semibold text-ink">{t('shelf.errorTitle')}</p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-5 inline-flex rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white dark:text-page"
          >
            {t('home.retry')}
          </button>
        </div>
      ) : loans.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface/70 px-6 py-16 text-center">
          <p className="text-lg font-semibold text-ink">{t('shelf.emptyTitle')}</p>
          <p className="mt-2 text-muted">{t('shelf.emptySubtitle')}</p>
          <Link
            to={paths.home}
            className="mt-5 inline-flex rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark dark:text-page dark:hover:bg-brand/80"
          >
            {t('shelf.browseCatalog')}
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {loans.map((loan) => {
            const book = loan.book
            if (!book) return null

            const borrowedDate = new Date(loan.borrowedAt).toLocaleDateString(
              i18n.language,
              { year: 'numeric', month: 'short', day: 'numeric' },
            )

            return (
              <li
                key={loan.id}
                className="flex flex-col gap-4 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex gap-4">
                  <img
                    src={book.coverUrl}
                    alt={t('book.coverAlt', { title: book.title })}
                    className="h-28 w-20 shrink-0 rounded-lg object-cover ring-1 ring-border"
                  />
                  <div>
                    <Link
                      to={paths.book(book.id)}
                      className="font-display text-xl text-ink transition hover:text-accent"
                    >
                      {book.title}
                    </Link>
                    <p className="mt-1 text-sm text-muted">{book.author}</p>
                    <p className="mt-3 text-sm text-muted">
                      {t('shelf.borrowedBy', {
                        name: loan.fullName,
                        date: borrowedDate,
                      })}
                    </p>
                    <div className="mt-2">
                      <AvailabilityBadge book={book} />
                    </div>
                  </div>
                </div>

                <Link
                  to={paths.returnLoan(loan.id)}
                  className="inline-flex items-center justify-center rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark dark:text-page dark:hover:bg-brand/80"
                >
                  {t('shelf.returnBook')}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
