import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { formatBookYear, getAvailabilityStatus, type Book } from '../types/book'
import { AvailabilityBadge } from './AvailabilityBadge'

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  const { t } = useTranslation()
  const yearLabel = formatBookYear(book.year, t('book.bce'))
  const genreLabel = t(`genres.${book.genre}`, { defaultValue: book.genre })
  const isAvailable = getAvailabilityStatus(book) === 'available'

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-[0_12px_30px_-18px_rgba(27,79,114,0.45)] ring-1 ring-border transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_-20px_rgba(196,122,44,0.45)] hover:ring-accent/30 dark:shadow-[0_12px_30px_-18px_rgba(0,0,0,0.55)]">
      <Link
        to={`/book/${book.id}`}
        className="relative block aspect-[2/3] overflow-hidden bg-brand-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <img
          src={book.coverUrl}
          alt={t('book.coverAlt', { title: book.title })}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute start-3 top-3 rounded-full bg-surface/90 px-2.5 py-1 text-xs font-semibold tracking-wide text-brand shadow-sm backdrop-blur">
          {genreLabel}
        </span>
        <span className="absolute end-3 top-3">
          <AvailabilityBadge book={book} className="bg-surface/90 shadow-sm backdrop-blur" />
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          <h2 className="font-display text-lg leading-snug text-ink">
            <Link
              to={`/book/${book.id}`}
              className="transition hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {book.title}
            </Link>
          </h2>
          <p className="mt-1 text-sm text-muted">
            {book.author} · {yearLabel}
          </p>
          <p className="mt-1 text-xs text-muted">ISBN {book.isbn}</p>
          <p className="mt-3 font-display text-xl text-accent">
            ${book.price.toFixed(2)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {isAvailable ? (
            <>
              <Link
                to={`/checkout/${book.id}?action=buy`}
                className="rounded-xl bg-accent px-3 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-page"
              >
                {t('book.buyNow')}
              </Link>
              <Link
                to={`/checkout/${book.id}?action=borrow`}
                className="rounded-xl bg-brand px-3 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:text-page dark:hover:bg-brand/80"
              >
                {t('book.borrowNow')}
              </Link>
            </>
          ) : (
            <>
              <span className="rounded-xl bg-accent-light px-3 py-2.5 text-center text-sm font-semibold text-accent-dark">
                {t('book.availability.outOfStock')}
              </span>
              <span className="rounded-xl bg-brand-light px-3 py-2.5 text-center text-sm font-semibold text-muted">
                {t('book.availability.checkedOut')}
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
