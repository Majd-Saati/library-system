import { useDeferredValue, useMemo, useState } from 'react'
import {
  applyCatalogFilters,
  defaultCatalogFilters,
  extractGenres,
  hasActiveCatalogFilters,
  type CatalogFiltersState,
} from '../lib/catalogFilters'
import { useBooksQuery } from './useBooksQuery'

export function useBookSearch() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<CatalogFiltersState>(defaultCatalogFilters)
  const deferredQuery = useDeferredValue(query.trim())
  const hasQuery = query.trim().length > 0

  const booksQuery = useBooksQuery(deferredQuery)
  const books = booksQuery.data ?? []

  const genres = useMemo(() => extractGenres(booksQuery.data ?? []), [booksQuery.data])

  const filteredBooks = useMemo(
    () => applyCatalogFilters(books, filters),
    [books, filters],
  )

  const filtersActive = hasActiveCatalogFilters(filters)

  function clearQuery() {
    setQuery('')
  }

  function clearFilters() {
    setFilters(defaultCatalogFilters)
  }

  function clearAll() {
    clearQuery()
    clearFilters()
  }

  return {
    query,
    setQuery,
    filters,
    setFilters,
    genres,
    suggestions: hasQuery ? books.slice(0, 8) : [],
    filteredBooks,
    clearQuery,
    clearFilters,
    clearAll,
    hasQuery,
    filtersActive,
    isSearchLoading:
      hasQuery && (booksQuery.isFetching || query.trim() !== deferredQuery),
    isCatalogLoading: !hasQuery && booksQuery.isLoading,
    isCatalogError: booksQuery.isError,
    catalogError: booksQuery.error,
    refetchCatalog: booksQuery.refetch,
    resultCount: filteredBooks.length,
    catalogCount: books.length,
  }
}
