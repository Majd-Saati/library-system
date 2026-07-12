import { useTranslation } from 'react-i18next'
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getBookById } from '../data/books'
import { BookActionForm } from '../components/BookActionForm'
import type { BookActionType } from '../validation/checkoutSchema'

function isBookAction(value: string | null): value is BookActionType {
  return value === 'buy' || value === 'borrow'
}

export function CheckoutPage() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { bookId } = useParams<{ bookId: string }>()
  const [searchParams] = useSearchParams()
  const actionParam = searchParams.get('action')
  const book = bookId ? getBookById(bookId) : undefined
  const isRtl = i18n.dir() === 'rtl'

  if (!book || !isBookAction(actionParam)) {
    return <Navigate to="/" replace />
  }

  const action = actionParam
  const backTo = `/book/${book.id}`

  function handleDone() {
    navigate(backTo)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to={backTo}
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-accent"
      >
        <span aria-hidden="true">{isRtl ? '→' : '←'}</span>
        {t('checkout.backToBook')}
      </Link>

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

          <div className="mt-8">
            <BookActionForm book={book} action={action} onClose={handleDone} />
          </div>
        </div>
      </div>
    </section>
  )
}
