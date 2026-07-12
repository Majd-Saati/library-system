import type { Book } from '../data/books'

interface BookCardProps {
  book: Book
  onBuy: (book: Book) => void
  onBorrow: (book: Book) => void
}

export function BookCard({ book, onBuy, onBorrow }: BookCardProps) {
  const yearLabel = book.year < 0 ? `${Math.abs(book.year)} BCE` : String(book.year)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_12px_30px_-18px_rgba(27,79,114,0.45)] ring-1 ring-brand/10 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_-20px_rgba(196,122,44,0.45)] hover:ring-accent/30">
      <div className="relative aspect-[2/3] overflow-hidden bg-brand-light">
        <img
          src={book.coverUrl}
          alt={`Cover of ${book.title}`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold tracking-wide text-brand shadow-sm backdrop-blur">
          {book.genre}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          <h2 className="font-display text-lg leading-snug text-brand-dark">
            {book.title}
          </h2>
          <p className="mt-1 text-sm text-brand/70">
            {book.author} · {yearLabel}
          </p>
          <p className="mt-3 font-display text-xl text-accent">
            ${book.price.toFixed(2)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onBuy(book)}
            className="rounded-xl bg-accent px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Buy now
          </button>
          <button
            type="button"
            onClick={() => onBorrow(book)}
            className="rounded-xl bg-brand px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Borrow now
          </button>
        </div>
      </div>
    </article>
  )
}
