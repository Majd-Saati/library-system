import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { BookCard } from '../components/BookCard'
import { BookGridSkeleton } from '../components/BookCardSkeleton'
import { BookSearch } from '../components/BookSearch'
import { useBookSearch } from '../hooks/useBookSearch'

export function HomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    query,
    setQuery,
    suggestions,
    filteredBooks,
    clearQuery,
    hasQuery,
    isSearchLoading,
    isCatalogLoading,
    isCatalogError,
    catalogError,
    refetchCatalog,
    catalogCount,
  } = useBookSearch()

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
          onSelect={(book) => navigate(`/book/${book.id}`)}
          onClear={clearQuery}
          disabled={isCatalogLoading}
          isLoading={isSearchLoading}
        />
        <p className="mt-3 text-sm text-muted" aria-live="polite">
          {isCatalogLoading
            ? t('home.loading')
            : isSearchLoading
              ? t('search.searching')
              : hasQuery
                ? t('home.resultsFor', {
                    count: filteredBooks.length,
                    query: query.trim(),
                  })
                : t('home.catalogCount', { count: catalogCount })}
        </p>
      </div>

      {isCatalogLoading || (hasQuery && isSearchLoading) ? (
        <BookGridSkeleton />
      ) : isCatalogError ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface/70 px-6 py-16 text-center">
          <p className="text-lg font-semibold text-ink">{t('home.errorTitle')}</p>
          <p className="mt-2 text-muted">
            {catalogError instanceof Error
              ? catalogError.message
              : t('home.errorSubtitle')}
          </p>
          <button
            type="button"
            onClick={() => void refetchCatalog()}
            className="mt-5 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark dark:text-page dark:hover:bg-brand/80"
          >
            {t('home.retry')}
          </button>
        </div>
      ) : filteredBooks.length === 0 ? (
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
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  )
}
