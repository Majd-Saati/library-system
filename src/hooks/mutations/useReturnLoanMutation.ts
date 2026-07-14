import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loansApi } from '../../api'
import { queryKeys } from '../../lib/queryKeys'

export function useReturnLoanMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (loanId: string) => loansApi.returnLoan(loanId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['books'] })
      void queryClient.invalidateQueries({ queryKey: queryKeys.loans.all })
    },
  })
}
