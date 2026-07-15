import type { Book } from '../types/book'
import { apiClient } from './client'
import type { ApiSuccess } from './types'

export interface CheckoutPayload {
  fullName: string
  email: string
  phone: string
  address: string
}

export const booksApi = {
  getAll(query?: string) {
    const trimmed = query?.trim()
    const path = trimmed
      ? `/books?${new URLSearchParams({ q: trimmed }).toString()}`
      : '/books'

    return apiClient<
      ApiSuccess<{ query: string | null; count: number; books: Book[] }>
    >(path, {
      auth: false,
    }).then((res) => res.data.books)
  },

  getById(id: string) {
    return apiClient<ApiSuccess<{ book: Book }>>(`/books/${id}`, {
      auth: false,
    }).then((res) => res.data.book)
  },

  borrow(id: string, payload: CheckoutPayload) {
    return apiClient<ApiSuccess<{ loan: unknown; book: Book }>>(
      `/books/${id}/borrow`,
      {
        method: 'POST',
        body: payload,
      },
    ).then((res) => res.data)
  },

  buy(id: string, payload: CheckoutPayload) {
    return apiClient<ApiSuccess<{ purchase: unknown; book: Book }>>(
      `/books/${id}/buy`,
      {
        method: 'POST',
        body: payload,
      },
    ).then((res) => res.data)
  },
}
