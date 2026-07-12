import { useState } from 'react'
import { books, type Book } from '../data/books'
import { BookCard } from '../components/BookCard'

export function HomePage() {
  const [notice, setNotice] = useState<string | null>(null)

  function showNotice(message: string) {
    setNotice(message)
    window.setTimeout(() => setNotice(null), 2500)
  }

  function handleBuy(book: Book) {
    showNotice(`Purchase started for “${book.title}”.`)
  }

  function handleBorrow(book: Book) {
    showNotice(`Borrow request placed for “${book.title}”.`)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Catalog
        </p>
        <h1 className="font-display text-4xl text-brand-dark sm:text-5xl">
          Discover your next read
        </h1>
        <p className="mt-3 text-base text-brand/75 sm:text-lg">
          Twenty curated titles ready to buy or borrow from the library shelf.
        </p>
      </div>

      {notice ? (
        <div
          role="status"
          className="mb-6 rounded-xl border border-accent/20 bg-accent-light px-4 py-3 text-sm font-medium text-accent-dark"
        >
          {notice}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onBuy={handleBuy}
            onBorrow={handleBorrow}
          />
        ))}
      </div>
    </section>
  )
}
