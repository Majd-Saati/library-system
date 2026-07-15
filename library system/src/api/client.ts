import { tokenStorage } from './tokenStorage'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

export class ApiRequestError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = status
  }
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown
  auth?: boolean
}

export async function apiClient<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, auth = true, headers, ...rest } = options

  const requestHeaders = new Headers(headers)
  if (!requestHeaders.has('Content-Type') && body !== undefined) {
    requestHeaders.set('Content-Type', 'application/json')
  }

  if (auth) {
    const token = tokenStorage.getToken()
    if (token) {
      requestHeaders.set('Authorization', `Bearer ${token}`)
    }
  }

  const response = await fetch(`${baseURL}${path}`, {
    ...rest,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  let payload: unknown = null
  const contentType = response.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    payload = await response.json()
  }

  if (!response.ok) {
    const message =
      payload &&
      typeof payload === 'object' &&
      'message' in payload &&
      typeof (payload as { message: unknown }).message === 'string'
        ? (payload as { message: string }).message
        : `Request failed (${response.status})`

    if (response.status === 401) {
      tokenStorage.clear()
      window.dispatchEvent(new CustomEvent('auth:unauthorized'))
    }

    throw new ApiRequestError(message, response.status)
  }

  return payload as T
}

export function getErrorMessage(error: unknown, fallback = 'Something went wrong') {
  if (error instanceof ApiRequestError) return error.message
  if (error instanceof Error) return error.message
  return fallback
}
