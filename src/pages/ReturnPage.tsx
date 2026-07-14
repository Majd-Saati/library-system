import { useTranslation } from 'react-i18next'
import { Navigate, useParams } from 'react-router-dom'
import { BackLink } from '../components/BackLink'
import { ReturnBookForm } from '../components/ReturnBookForm'
import { useBookQuery } from '../hooks/queries/useBookQuery'
import { useAppSelector } from '../store/hooks'
import { selectLoanById } from '../store/slices/loansSlice'

export function ReturnPage() {
  const { t, i18n } = useTranslation()
  const { loanId } = useParams<{ loanId: string }>()
  const loan = useAppSelector((state) =>
    loanId ? selectLoanById(state, loanId) : undefined,
  )
  const { data: book, isLoading, isError } = useBookQuery(loan?.bookId)

  if (!loan) {
    return <Navigate to="/books" replace />
  }

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mt-6 grid animate-pulse gap-8 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)]">
          <div className="aspect-[2/3] rounded-3xl bg-brand-light" />
          <div className="h-80 rounded-3xl bg-brand-light" />
        </div>
      </section>
    )
  }

  if (isError || !book) {
    return <Navigate to="/books" replace />
  }

  const borrowedDate = new Date(loan.borrowedAt).toLocaleDateString(
    i18n.language,
    { year: 'numeric', month: 'long', day: 'numeric' },
  )

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <BackLink to="/books">{t('return.backToShelf')}</BackLink>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-12">
        <div className="mx-auto w-full max-w-xs lg:mx-0">
          <div className="overflow-hidden rounded-3xl bg-brand-light shadow-[0_24px_50px_-28px_rgba(27,79,114,0.55)] ring-1 ring-border dark:shadow-[0_24px_50px_-28px_rgba(0,0,0,0.65)]">
            <img
              src={book.coverUrl}
              alt={t('book.coverAlt', { title: book.title })}
              className="aspect-[2/3] w-full object-cover"
            />
          </div>
          <p className="mt-4 font-display text-xl text-ink">{book.title}</p>
          <p className="mt-1 text-sm text-muted">{book.author}</p>
          <dl className="mt-4 space-y-2 text-sm">
            <div>
              <dt className="text-muted">{t('return.loan.borrower')}</dt>
              <dd className="font-semibold text-ink">{loan.fullName}</dd>
            </div>
            <div>
              <dt className="text-muted">{t('return.loan.borrowedAt')}</dt>
              <dd className="font-semibold text-ink">{borrowedDate}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-3xl bg-surface p-6 shadow-sm ring-1 ring-border sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            {t('return.eyebrow')}
          </p>
          <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            {t('return.pageTitle')}
          </h1>
          <p className="mt-2 text-muted">
            {t('return.subtitle', { title: book.title })}
          </p>

          <div className="mt-8">
            <ReturnBookForm book={book} loan={loan} />
          </div>
        </div>
      </div>
    </section>
  )
}
