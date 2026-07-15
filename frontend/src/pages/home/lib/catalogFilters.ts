export type AvailabilityFilter = 'all' | 'available' | 'checked_out'

export interface CatalogFiltersState {
  genre: string
  availability: AvailabilityFilter
}

export const defaultCatalogFilters: CatalogFiltersState = {
  genre: 'all',
  availability: 'all',
}

export function hasActiveCatalogFilters(filters: CatalogFiltersState): boolean {
  return (
    filters.genre !== defaultCatalogFilters.genre ||
    filters.availability !== defaultCatalogFilters.availability
  )
}
