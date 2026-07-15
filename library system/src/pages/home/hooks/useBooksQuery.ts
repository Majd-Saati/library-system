import { useQuery } from '@tanstack/react-query'
import { booksApi } from '../../../api'
import { queryKeys } from '../../../lib/queryKeys'

export function useBooksQuery(query = '') {
  const trimmed = query.trim()

  return useQuery({
    queryKey: queryKeys.books.all(trimmed),
    queryFn: () => booksApi.getAll(trimmed || undefined),
  })
}
