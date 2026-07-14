import { useQuery } from '@tanstack/react-query'
import { loansApi } from '../api'
import { queryKeys } from '../lib/queryKeys'
import { useAppSelector } from '../store/hooks'
import { selectIsAuthenticated } from '../store/slices/authSlice'

export function useLoansQuery() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  return useQuery({
    queryKey: queryKeys.loans.all,
    queryFn: loansApi.getMine,
    enabled: isAuthenticated,
  })
}
