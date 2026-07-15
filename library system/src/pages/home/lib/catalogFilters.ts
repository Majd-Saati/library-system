import { getAvailabilityStatus, type Book } from '../../../types/book'

export type AvailabilityFilter = 'all' | 'available' | 'checked_out'
export type SortOption = 'title' | 'author' | 'year-desc' | 'year-asc'

export interface CatalogFiltersState {
  genre: string
  availability: AvailabilityFilter
  sort: SortOption
}

export const defaultCatalogFilters: CatalogFiltersState = {
  genre: 'all',
  availability: 'all',
  sort: 'title',
}

export function extractGenres(books: Book[]): string[] {
  return [...new Set(books.map((book) => book.genre))].sort((a, b) =>
    a.localeCompare(b),
  )
}

export function applyCatalogFilters(
  books: Book[],
  filters: CatalogFiltersState,
): Book[] {
  let next = books

  if (filters.genre !== 'all') {
    next = next.filter((book) => book.genre === filters.genre)
  }

  if (filters.availability !== 'all') {
    next = next.filter(
      (book) => getAvailabilityStatus(book) === filters.availability,
    )
  }

  const sorted = [...next]
  sorted.sort((a, b) => {
    switch (filters.sort) {
      case 'author':
        return a.author.localeCompare(b.author) || a.title.localeCompare(b.title)
      case 'year-asc':
        return a.year - b.year || a.title.localeCompare(b.title)
      case 'year-desc':
        return b.year - a.year || a.title.localeCompare(b.title)
      case 'title':
      default:
        return a.title.localeCompare(b.title)
    }
  })

  return sorted
}

export function hasActiveCatalogFilters(filters: CatalogFiltersState): boolean {
  return (
    filters.genre !== defaultCatalogFilters.genre ||
    filters.availability !== defaultCatalogFilters.availability ||
    filters.sort !== defaultCatalogFilters.sort
  )
}
