import { WarningCircle } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { AvailabilityBadge } from '../../components/AvailabilityBadge'
import { BackLink } from '../../components/BackLink'
import { useBookQuery } from '../../hooks/useBookQuery'
import { paths } from '../../routes/paths'
import { getAvailabilityStatus } from '../../types/book'
import { BookActionForm } from './components/BookActionForm'
import type { BookActionType } from './validation/checkoutSchema'

function isBookAction(value: string | null): value is BookActionType {
  return value === 'buy' || value === 'borrow'
}

export function CheckoutPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { bookId } = useParams<{ bookId: string }>()
  const [searchParams] = useSearchParams()
  const actionParam = searchParams.get('action')
  const { data: book, isLoading, isError } = useBookQuery(bookId)

  if (!isBookAction(actionParam)) {
    return <Navigate to={paths.home} replace />
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
    return <Navigate to={paths.home} replace />
  }

  const action = actionParam
  const backTo = paths.book(book.id)
  const isAvailable = getAvailabilityStatus(book) === 'available'
  const blocked = !isAvailable

  function handleDone() {
    navigate(action === 'borrow' ? paths.shelf : backTo)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <BackLink to={backTo}>{t('checkout.backToBook')}</BackLink>

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
          <p className="mt-2 font-display text-2xl text-accent">
            ${book.price.toFixed(2)}
          </p>
          <div className="mt-3">
            <AvailabilityBadge book={book} />
          </div>
        </div>

        <div className="rounded-3xl bg-surface p-6 shadow-sm ring-1 ring-border sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            {action === 'buy' ? t('checkout.buyTitle') : t('checkout.borrowTitle')}
          </p>
          <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            {t('checkout.pageTitle')}
          </h1>
          <p className="mt-2 text-muted">
            {t('checkout.subtitle', { title: book.title })}
          </p>

          {blocked ? (
            <div className="mt-8 rounded-2xl border border-accent/30 bg-accent-light/60 px-4 py-5">
              <div className="flex items-start gap-3">
                <WarningCircle
                  size={24}
                  weight="fill"
                  className="mt-0.5 shrink-0 text-accent-dark"
                  aria-hidden
                />
                <div>
                  <p className="font-semibold text-ink">
                    {action === 'borrow'
                      ? t('checkout.blocked.borrowTitle')
                      : t('checkout.blocked.buyTitle')}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {action === 'borrow'
                      ? t('checkout.blocked.borrowBody', { title: book.title })
                      : t('checkout.blocked.buyBody', { title: book.title })}
                  </p>
                  <Link
                    to={paths.home}
                    className="mt-4 inline-flex rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark dark:text-page"
                  >
                    {t('checkout.blocked.browse')}
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <BookActionForm book={book} action={action} onClose={handleDone} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
