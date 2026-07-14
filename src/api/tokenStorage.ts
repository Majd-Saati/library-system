const TOKEN_KEY = 'library_auth_token'
const USER_KEY = 'library_auth_user'

export interface StoredUser {
  id: number
  email: string
  name: string
}

export const tokenStorage = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token)
  },

  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY)
  },

  getUser(): StoredUser | null {
    const raw = localStorage.getItem(USER_KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw) as StoredUser
    } catch {
      return null
    }
  },

  setUser(user: StoredUser): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  clearUser(): void {
    localStorage.removeItem(USER_KEY)
  },

  clear(): void {
    this.clearToken()
    this.clearUser()
  },
}
