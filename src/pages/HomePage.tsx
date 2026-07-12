import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { books, type Book } from '../data/books'
import { BookCard } from '../components/BookCard'
import { BookSearch } from '../components/BookSearch'
import { useBookSearch } from '../hooks/useBookSearch'

export function HomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [notice, setNotice] = useState<string | null>(null)
  const {
    query,
    setQuery,
    suggestions,
    filteredBooks,
    clearQuery,
    hasQuery,
  } = useBookSearch(books)

  function showNotice(message: string) {
    setNotice(message)
    window.setTimeout(() => setNotice(null), 2500)
  }

  function handleBuy(book: Book) {
    showNotice(t('book.purchaseStarted', { title: book.title }))
  }

  function handleBorrow(book: Book) {
    showNotice(t('book.borrowStarted', { title: book.title }))
  }

  function handleSelectSuggestion(book: Book) {
    navigate(`/book/${book.id}`)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          {t('home.eyebrow')}
        </p>
        <h1 className="font-display text-4xl text-ink sm:text-5xl">
          {t('home.title')}
        </h1>
        <p className="mt-3 text-base text-muted sm:text-lg">
          {t('home.subtitle')}
        </p>
      </div>

      <div className="mb-8">
        <BookSearch
          query={query}
          suggestions={suggestions}
          onQueryChange={setQuery}
          onSelect={handleSelectSuggestion}
          onClear={clearQuery}
        />
        <p className="mt-3 text-sm text-muted" aria-live="polite">
          {hasQuery
            ? t('home.resultsFor', {
                count: filteredBooks.length,
                query: query.trim(),
              })
            : t('home.catalogCount', { count: books.length })}
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
        <div className="rounded-2xl border border-dashed border-border bg-surface/70 px-6 py-16 text-center">
          <p className="text-lg font-semibold text-ink">
            {t('home.emptyTitle')}
          </p>
          <p className="mt-2 text-muted">{t('home.emptySubtitle')}</p>
          <button
            type="button"
            onClick={clearQuery}
            className="mt-5 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark dark:text-page dark:hover:bg-brand/80"
          >
            {t('home.clearSearch')}
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
