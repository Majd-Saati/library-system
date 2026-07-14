import { useDeferredValue, useState } from 'react'
import { useBooksQuery } from './queries/useBooksQuery'

export function useBookSearch() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query.trim())
  const hasQuery = query.trim().length > 0

  const booksQuery = useBooksQuery(deferredQuery)
  const books = booksQuery.data ?? []

  function clearQuery() {
    setQuery('')
  }

  return {
    query,
    setQuery,
    suggestions: hasQuery ? books.slice(0, 8) : [],
    filteredBooks: books,
    clearQuery,
    hasQuery,
    isSearchLoading:
      hasQuery && (booksQuery.isFetching || query.trim() !== deferredQuery),
    isCatalogLoading: !hasQuery && booksQuery.isLoading,
    isCatalogError: booksQuery.isError,
    catalogError: booksQuery.error,
    refetchCatalog: booksQuery.refetch,
    catalogCount: books.length,
  }
}
