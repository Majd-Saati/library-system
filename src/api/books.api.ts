import type { Book } from '../types/book'
import { apiClient } from './client'
import type { ApiSuccess } from './types'

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
}
