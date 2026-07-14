import { useMutation, useQueryClient } from '@tanstack/react-query'
import { booksApi, type CheckoutPayload } from '../../api'
import { queryKeys } from '../../lib/queryKeys'

interface BuyVariables {
  bookId: string
  payload: CheckoutPayload
}

export function useBuyMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ bookId, payload }: BuyVariables) =>
      booksApi.buy(bookId, payload),
    onSuccess: (data, variables) => {
      void queryClient.invalidateQueries({ queryKey: ['books'] })
      queryClient.setQueryData(queryKeys.books.detail(variables.bookId), data.book)
    },
  })
}
