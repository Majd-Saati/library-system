import type { Book } from '../types/book'
import { apiClient } from './client'
import type { ApiSuccess } from './types'

export const booksApi = {
  getAll() {
    return apiClient<ApiSuccess<{ books: Book[] }>>('/books', {
      auth: false,
    }).then((res) => res.data.books)
  },

  getById(id: string) {
    return apiClient<ApiSuccess<{ book: Book }>>(`/books/${id}`, {
      auth: false,
    }).then((res) => res.data.book)
  },
}
