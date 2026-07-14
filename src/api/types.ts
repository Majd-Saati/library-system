export interface ApiSuccess<T> {
  success: true
  message?: string
  data: T
}

export interface AuthUser {
  id: number
  email: string
  name: string
  createdAt?: string
  updatedAt?: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResult {
  user: AuthUser
  token: string
}
