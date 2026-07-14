import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { tokenStorage, type AuthUser, type LoginResult } from '../../api'

interface AuthState {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
}

function loadInitialAuth(): AuthState {
  const token = tokenStorage.getToken()
  const user = tokenStorage.getUser()

  if (token && user) {
    return { token, user, isAuthenticated: true }
  }

  return { token: null, user: null, isAuthenticated: false }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialAuth(),
  reducers: {
    setCredentials(state, action: PayloadAction<LoginResult>) {
      const { token, user } = action.payload
      tokenStorage.setToken(token)
      tokenStorage.setUser({
        id: user.id,
        email: user.email,
        name: user.name,
      })
      state.token = token
      state.user = user
      state.isAuthenticated = true
    },
    logout(state) {
      tokenStorage.clear()
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated
export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user

export default authSlice.reducer
