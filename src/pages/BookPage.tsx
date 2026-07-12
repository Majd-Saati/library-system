import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, useParams } from 'react-router-dom'
import { formatBookYear, getBookById, type Book } from '../data/books'

export function BookPage() {
  const { t, i18n } = useTranslation()
  const { bookId } = useParams<{ bookId: string }>()
  const book = bookId ? getBookById(bookId) : undefined
  const [notice, setNotice] = useState<string | null>(null)
  const isRtl = i18n.dir() === 'rtl'

  if (!book) {
    return <Navigate to="/" replace />
  }

  function showNotice(message: string) {
    setNotice(message)
    window.setTimeout(() => setNotice(null), 2500)
  }

  function handleBuy(selected: Book) {
    showNotice(t('book.purchaseStarted', { title: selected.title }))
  }

  function handleBorrow(selected: Book) {
    showNotice(t('book.borrowStarted', { title: selected.title }))
  }

  const yearLabel = formatBookYear(book.year, t('book.bce'))
  const genreLabel = t(`genres.${book.genre}`, { defaultValue: book.genre })

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
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-accent"
      >
        <span aria-hidden="true">{isRtl ? '→' : '←'}</span>
        {t('book.backToCatalog')}
      </Link>

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
            <span className="rounded-full bg-brand-light px-3 py-1 text-sm font-semibold text-brand">
              {t('book.copiesAvailable', { count: book.availableCopies })}
            </span>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/85 sm:text-lg">
            {book.description}
          </p>

          {notice ? (
            <div
              role="status"
              className="mt-6 rounded-xl border border-accent/20 bg-accent-light px-4 py-3 text-sm font-medium text-accent-dark"
            >
              {notice}
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => handleBuy(book)}
              className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-page"
            >
              {t('book.buyNow')}
            </button>
            <button
              type="button"
              onClick={() => handleBorrow(book)}
              className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:text-page dark:hover:bg-brand/80"
            >
              {t('book.borrowNow')}
            </button>
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
