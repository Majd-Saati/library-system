import { useDeferredValue, useMemo, useState } from 'react'
import type { Book } from '../types/book'
import { searchBooks } from '../utils/searchBooks'

const SUGGESTION_LIMIT = 6

export function useBookSearch(catalog: Book[]) {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const results = useMemo(
    () => searchBooks(catalog, deferredQuery),
    [catalog, deferredQuery],
  )

  const suggestions = useMemo(
    () => searchBooks(catalog, query, SUGGESTION_LIMIT).map((result) => result.book),
    [catalog, query],
  )

  const filteredBooks = useMemo(
    () => (deferredQuery.trim() ? results.map((result) => result.book) : catalog),
    [catalog, deferredQuery, results],
  )

  function selectBook(book: Book) {
    setQuery(book.title)
  }

  function clearQuery() {
    setQuery('')
  }

  return {
    query,
    setQuery,
    suggestions,
    filteredBooks,
    selectBook,
    clearQuery,
    isSearching: query !== deferredQuery,
    hasQuery: query.trim().length > 0,
  }
}
