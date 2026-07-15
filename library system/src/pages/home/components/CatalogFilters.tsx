import { useTranslation } from 'react-i18next'
import type {
  AvailabilityFilter,
  CatalogFiltersState,
  SortOption,
} from '../lib/catalogFilters'
import { hasActiveCatalogFilters } from '../lib/catalogFilters'

interface CatalogFiltersProps {
  filters: CatalogFiltersState
  genres: string[]
  onChange: (next: CatalogFiltersState) => void
  onClear: () => void
  disabled?: boolean
}

const selectClassName =
  'w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm font-semibold text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-60'

export function CatalogFilters({
  filters,
  genres,
  onChange,
  onClear,
  disabled = false,
}: CatalogFiltersProps) {
  const { t } = useTranslation()
  const showClear = hasActiveCatalogFilters(filters)

  function update<K extends keyof CatalogFiltersState>(
    key: K,
    value: CatalogFiltersState[K],
  ) {
    onChange({ ...filters, [key]: value })
  }

  return (
    <div
      className="rounded-2xl bg-brand-light/50 p-3 ring-1 ring-border/70 sm:p-4"
      role="group"
      aria-label={t('filters.label')}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
        <div>
          <label
            htmlFor="filter-genre"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted"
          >
            {t('filters.genre')}
          </label>
          <select
            id="filter-genre"
            value={filters.genre}
            disabled={disabled}
            onChange={(event) => update('genre', event.target.value)}
            className={selectClassName}
          >
            <option value="all">{t('filters.allGenres')}</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {t(`genres.${genre}`, { defaultValue: genre })}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="filter-availability"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted"
          >
            {t('filters.availability')}
          </label>
          <select
            id="filter-availability"
            value={filters.availability}
            disabled={disabled}
            onChange={(event) =>
              update('availability', event.target.value as AvailabilityFilter)
            }
            className={selectClassName}
          >
            <option value="all">{t('filters.allAvailability')}</option>
            <option value="available">{t('filters.available')}</option>
            <option value="checked_out">{t('filters.checkedOut')}</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="filter-sort"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted"
          >
            {t('filters.sort')}
          </label>
          <select
            id="filter-sort"
            value={filters.sort}
            disabled={disabled}
            onChange={(event) =>
              update('sort', event.target.value as SortOption)
            }
            className={selectClassName}
          >
            <option value="title">{t('filters.sortTitle')}</option>
            <option value="author">{t('filters.sortAuthor')}</option>
            <option value="year-desc">{t('filters.sortYearDesc')}</option>
            <option value="year-asc">{t('filters.sortYearAsc')}</option>
          </select>
        </div>

        {showClear ? (
          <button
            type="button"
            disabled={disabled}
            onClick={onClear}
            className="rounded-xl bg-surface px-4 py-2.5 text-sm font-semibold text-brand ring-1 ring-border transition hover:bg-brand hover:text-white disabled:cursor-not-allowed disabled:opacity-60 dark:hover:text-page lg:mb-0"
          >
            {t('filters.clear')}
          </button>
        ) : (
          <div className="hidden lg:block" aria-hidden />
        )}
      </div>
    </div>
  )
}
