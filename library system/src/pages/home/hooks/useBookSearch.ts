import { useDeferredValue, useState } from 'react'
import {
  defaultCatalogFilters,
  hasActiveCatalogFilters,
  type CatalogFiltersState,
} from '../lib/catalogFilters'
import { useBooksQuery } from './useBooksQuery'

export function useBookSearch() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<CatalogFiltersState>(defaultCatalogFilters)
  const deferredQuery = useDeferredValue(query.trim())
  const deferredFilters = useDeferredValue(filters)
  const hasQuery = query.trim().length > 0

  const booksQuery = useBooksQuery({
    q: deferredQuery,
    genre: deferredFilters.genre,
    availability: deferredFilters.availability,
    sort: deferredFilters.sort,
  })

  const books = booksQuery.data?.books ?? []
  const genres = booksQuery.data?.genres ?? []
  const resultCount = booksQuery.data?.count ?? books.length
  const catalogCount = booksQuery.data?.total ?? books.length
  const filtersActive = hasActiveCatalogFilters(filters)
  const filtersPending =
    filters.genre !== deferredFilters.genre ||
    filters.availability !== deferredFilters.availability ||
    filters.sort !== deferredFilters.sort
  const inputPending = query.trim() !== deferredQuery || filtersPending

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
    filteredBooks: books,
    clearQuery,
    clearFilters,
    clearAll,
    hasQuery,
    filtersActive,
    isSearchLoading:
      (hasQuery || filtersActive) && (booksQuery.isFetching || inputPending),
    isCatalogLoading: !hasQuery && !filtersActive && booksQuery.isLoading,
    isCatalogError: booksQuery.isError,
    catalogError: booksQuery.error,
    refetchCatalog: booksQuery.refetch,
    resultCount,
    catalogCount,
  }
}
