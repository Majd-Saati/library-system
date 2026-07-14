import { useMutation, useQueryClient } from '@tanstack/react-query'
import { booksApi, type CheckoutPayload } from '../../../api'
import { queryKeys } from '../../../lib/queryKeys'

interface BorrowVariables {
  bookId: string
  payload: CheckoutPayload
}

export function useBorrowMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ bookId, payload }: BorrowVariables) =>
      booksApi.borrow(bookId, payload),
    onSuccess: (data, variables) => {
      void queryClient.invalidateQueries({ queryKey: ['books'] })
      void queryClient.invalidateQueries({ queryKey: queryKeys.loans.all })
      queryClient.setQueryData(queryKeys.books.detail(variables.bookId), data.book)
    },
  })
}
