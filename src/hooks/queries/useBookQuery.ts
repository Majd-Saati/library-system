import { useQuery } from '@tanstack/react-query'
import { booksApi } from '../../api'
import { queryKeys } from '../../lib/queryKeys'

export function useBookQuery(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.books.detail(id ?? ''),
    queryFn: () => booksApi.getById(id!),
    enabled: Boolean(id),
  })
}
