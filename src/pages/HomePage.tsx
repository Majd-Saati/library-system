import { useState } from 'react'
import { books, type Book } from '../data/books'
import { BookCard } from '../components/BookCard'
import { BookSearch } from '../components/BookSearch'
import { useBookSearch } from '../hooks/useBookSearch'

export function HomePage() {
  const [notice, setNotice] = useState<string | null>(null)
  const {
    query,
    setQuery,
    suggestions,
    filteredBooks,
    selectBook,
    clearQuery,
    hasQuery,
  } = useBookSearch(books)

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
      <div className="mb-8 max-w-2xl">
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

      <div className="mb-8">
        <BookSearch
          query={query}
          suggestions={suggestions}
          onQueryChange={setQuery}
          onSelect={selectBook}
          onClear={clearQuery}
        />
        <p className="mt-3 text-sm text-brand/60" aria-live="polite">
          {hasQuery
            ? `${filteredBooks.length} result${filteredBooks.length === 1 ? '' : 's'} for “${query.trim()}”`
            : `${books.length} books in the catalog`}
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

      {filteredBooks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-brand/20 bg-white/70 px-6 py-16 text-center">
          <p className="text-lg font-semibold text-brand-dark">No books match your search</p>
          <p className="mt-2 text-brand/65">Try another title, author, or genre.</p>
          <button
            type="button"
            onClick={clearQuery}
            className="mt-5 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onBuy={handleBuy}
              onBorrow={handleBorrow}
            />
          ))}
        </div>
      )}
    </section>
  )
}
