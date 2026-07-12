import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { formatBookYear, getBookById, type Book } from '../data/books'

export function BookPage() {
  const { bookId } = useParams<{ bookId: string }>()
  const book = bookId ? getBookById(bookId) : undefined
  const [notice, setNotice] = useState<string | null>(null)

  if (!book) {
    return <Navigate to="/" replace />
  }

  function showNotice(message: string) {
    setNotice(message)
    window.setTimeout(() => setNotice(null), 2500)
  }

  function handleBuy(selected: Book) {
    showNotice(`Purchase started for “${selected.title}”.`)
  }

  function handleBorrow(selected: Book) {
    showNotice(`Borrow request placed for “${selected.title}”.`)
  }

  const details = [
    { label: 'Author', value: book.author },
    { label: 'Genre', value: book.genre },
    { label: 'Published', value: formatBookYear(book.year) },
    { label: 'Pages', value: String(book.pages) },
    { label: 'Language', value: book.language },
    { label: 'Publisher', value: book.publisher },
    { label: 'ISBN', value: book.isbn },
    { label: 'Available copies', value: String(book.availableCopies) },
  ]

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-accent"
      >
        <span aria-hidden="true">←</span>
        Back to catalog
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:gap-12">
        <div className="mx-auto w-full max-w-xs lg:mx-0">
          <div className="overflow-hidden rounded-3xl bg-brand-light shadow-[0_24px_50px_-28px_rgba(27,79,114,0.55)] ring-1 ring-brand/10">
            <img
              src={book.coverUrl}
              alt={`Cover of ${book.title}`}
              className="aspect-[2/3] w-full object-cover"
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            {book.genre}
          </p>
          <h1 className="mt-2 font-display text-4xl text-brand-dark sm:text-5xl">
            {book.title}
          </h1>
          <p className="mt-3 text-lg text-brand/75">
            by {book.author} · {formatBookYear(book.year)}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <p className="font-display text-3xl text-accent">
              ${book.price.toFixed(2)}
            </p>
            <span className="rounded-full bg-accent-light px-3 py-1 text-sm font-semibold text-accent-dark">
              Rating {book.rating.toFixed(1)} / 5
            </span>
            <span className="rounded-full bg-brand-light px-3 py-1 text-sm font-semibold text-brand">
              {book.availableCopies} copies available
            </span>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-dark/85 sm:text-lg">
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
              className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Buy now
            </button>
            <button
              type="button"
              onClick={() => handleBorrow(book)}
              className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Borrow now
            </button>
          </div>

          <dl className="mt-10 grid gap-4 sm:grid-cols-2">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-brand/10"
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-brand/55">
                  {detail.label}
                </dt>
                <dd className="mt-1 text-base font-semibold text-brand-dark">
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
