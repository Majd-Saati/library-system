import { apiClient } from './client'
import type { ApiSuccess, LoginPayload, LoginResult } from './types'

export const authApi = {
  login(payload: LoginPayload) {
    return apiClient<ApiSuccess<LoginResult>>('/auth/login', {
      method: 'POST',
      body: payload,
      auth: false,
    }).then((res) => res.data)
  },
}
