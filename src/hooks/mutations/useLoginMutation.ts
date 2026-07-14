import { useMutation } from '@tanstack/react-query'
import { authApi, type LoginPayload } from '../../api'
import { useAppDispatch } from '../../store/hooks'
import { setCredentials } from '../../store/slices/authSlice'

export function useLoginMutation() {
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (data) => {
      dispatch(setCredentials(data))
    },
  })
}
