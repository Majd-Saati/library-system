import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loansApi } from '../../../api'
import { queryKeys } from '../../../lib/queryKeys'

export function useReturnLoanMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      loanId,
      body,
    }: {
      loanId: string
      body: {
        email: string
        conditionNotes?: string
        confirmReturn: boolean
      }
    }) => loansApi.returnLoan(loanId, body),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: ['books'] })
      void queryClient.invalidateQueries({ queryKey: queryKeys.loans.all })
      if (data.book?.id) {
        queryClient.setQueryData(
          queryKeys.books.detail(data.book.id),
          data.book,
        )
      }
    },
  })
}
