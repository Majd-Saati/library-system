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

export function hasActiveCatalogFilters(filters: CatalogFiltersState): boolean {
  return (
    filters.genre !== defaultCatalogFilters.genre ||
    filters.availability !== defaultCatalogFilters.availability ||
    filters.sort !== defaultCatalogFilters.sort
  )
}
