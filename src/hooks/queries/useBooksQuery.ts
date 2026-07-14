import { useQuery } from '@tanstack/react-query'
import { booksApi } from '../../api'
import { queryKeys } from '../../lib/queryKeys'

export function useBooksQuery() {
  return useQuery({
    queryKey: queryKeys.books.all,
    queryFn: booksApi.getAll,
  })
}
