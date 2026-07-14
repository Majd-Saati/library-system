import { useQuery } from '@tanstack/react-query'
import { loansApi } from '../../../api'
import { queryKeys } from '../../../lib/queryKeys'
import { useAppSelector } from '../../../store/hooks'
import { selectIsAuthenticated } from '../../../store/slices/authSlice'

export function useLoanQuery(id: string | undefined) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  return useQuery({
    queryKey: queryKeys.loans.detail(id ?? ''),
    queryFn: () => loansApi.getById(id!),
    enabled: isAuthenticated && Boolean(id),
  })
}
