import { useQuery } from '@tanstack/react-query'
import { booksApi, type BooksListParams } from '../../../api'
import { queryKeys } from '../../../lib/queryKeys'

export function useBooksQuery(params: BooksListParams = {}) {
  const normalized: BooksListParams = {
    q: params.q?.trim() || undefined,
    genre: params.genre && params.genre !== 'all' ? params.genre : undefined,
    availability:
      params.availability && params.availability !== 'all'
        ? params.availability
        : undefined,
  }

  return useQuery({
    queryKey: queryKeys.books.all({
      q: normalized.q ?? '',
      genre: params.genre ?? 'all',
      availability: params.availability ?? 'all',
    }),
    queryFn: () => booksApi.getAll(normalized),
  })
}
