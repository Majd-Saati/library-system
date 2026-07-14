import { useTranslation } from 'react-i18next'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AvailabilityBadge } from '../../components/AvailabilityBadge'
import { BackLink } from '../../components/BackLink'
import { useBookQuery } from '../../hooks/useBookQuery'
import { formatBookYear, getAvailabilityStatus } from '../../types/book'

export function BookPage() {
  const { t } = useTranslation()
  const { bookId } = useParams<{ bookId: string }>()
  const { data: book, isLoading, isError } = useBookQuery(bookId)

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mt-6 grid animate-pulse gap-8 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:gap-12">
          <div className="mx-auto aspect-[2/3] w-full max-w-xs rounded-3xl bg-brand-light lg:mx-0" />
          <div className="space-y-4">
            <div className="h-4 w-24 rounded bg-brand-light" />
            <div className="h-10 w-3/4 rounded bg-brand-light" />
            <div className="h-5 w-1/2 rounded bg-brand-light" />
            <div className="h-24 w-full rounded bg-brand-light" />
          </div>
        </div>
      </section>
    )
  }

  if (isError || !book) {
    return <Navigate to="/" replace />
  }

  const yearLabel = formatBookYear(book.year, t('book.bce'))
  const genreLabel = t(`genres.${book.genre}`, { defaultValue: book.genre })
  const isAvailable = getAvailabilityStatus(book) === 'available'

  const details = [
    { label: t('book.details.author'), value: book.author },
    { label: t('book.details.genre'), value: genreLabel },
    { label: t('book.details.published'), value: yearLabel },
    { label: t('book.details.pages'), value: String(book.pages) },
    { label: t('book.details.language'), value: book.language },
    { label: t('book.details.publisher'), value: book.publisher },
    { label: t('book.details.isbn'), value: book.isbn },
    {
      label: t('book.details.availableCopies'),
      value: String(book.availableCopies),
    },
  ]

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <BackLink to="/">{t('book.backToCatalog')}</BackLink>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:gap-12">
        <div className="mx-auto w-full max-w-xs lg:mx-0">
          <div className="overflow-hidden rounded-3xl bg-brand-light shadow-[0_24px_50px_-28px_rgba(27,79,114,0.55)] ring-1 ring-border dark:shadow-[0_24px_50px_-28px_rgba(0,0,0,0.65)]">
            <img
              src={book.coverUrl}
              alt={t('book.coverAlt', { title: book.title })}
              className="aspect-[2/3] w-full object-cover"
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            {genreLabel}
          </p>
          <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">
            {book.title}
          </h1>
          <p className="mt-3 text-lg text-muted">
            {t('book.byAuthor', { author: book.author, year: yearLabel })}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <p className="font-display text-3xl text-accent">
              ${book.price.toFixed(2)}
            </p>
            <span className="rounded-full bg-accent-light px-3 py-1 text-sm font-semibold text-accent-dark">
              {t('book.rating', { rating: book.rating.toFixed(1) })}
            </span>
            <AvailabilityBadge book={book} />
            <span className="rounded-full bg-brand-light px-3 py-1 text-sm font-semibold text-brand">
              {t('book.copiesAvailable', { count: book.availableCopies })}
            </span>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/85 sm:text-lg">
            {book.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {isAvailable ? (
              <>
                <Link
                  to={`/checkout/${book.id}?action=buy`}
                  className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-page"
                >
                  {t('book.buyNow')}
                </Link>
                <Link
                  to={`/checkout/${book.id}?action=borrow`}
                  className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:text-page dark:hover:bg-brand/80"
                >
                  {t('book.borrowNow')}
                </Link>
              </>
            ) : (
              <>
                <span className="rounded-xl bg-accent-light px-5 py-3 text-sm font-semibold text-accent-dark">
                  {t('book.availability.outOfStock')}
                </span>
                <span className="rounded-xl bg-brand-light px-5 py-3 text-sm font-semibold text-muted">
                  {t('book.availability.checkedOut')}
                </span>
              </>
            )}
          </div>

          <dl className="mt-10 grid gap-4 sm:grid-cols-2">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="rounded-2xl bg-surface px-4 py-3 shadow-sm ring-1 ring-border"
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {detail.label}
                </dt>
                <dd className="mt-1 text-base font-semibold text-ink">
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
