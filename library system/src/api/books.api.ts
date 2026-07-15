import type { Book } from '../types/book'
import { apiClient } from './client'
import type { ApiSuccess } from './types'

export interface CheckoutPayload {
  fullName: string
  email: string
  phone: string
  address: string
}

export type BookAvailabilityFilter = 'all' | 'available' | 'checked_out'
export type BookSortOption = 'title' | 'author' | 'year-desc' | 'year-asc'

export interface BooksListParams {
  q?: string
  genre?: string
  availability?: BookAvailabilityFilter
  sort?: BookSortOption
}

export interface BooksListResult {
  query: string | null
  filters: {
    genre: string
    availability: BookAvailabilityFilter
    sort: BookSortOption
  }
  count: number
  total: number
  genres: string[]
  books: Book[]
}

function buildBooksQuery(params: BooksListParams = {}) {
  const search = new URLSearchParams()
  const q = params.q?.trim()
  if (q) search.set('q', q)
  if (params.genre && params.genre !== 'all') search.set('genre', params.genre)
  if (params.availability && params.availability !== 'all') {
    search.set('availability', params.availability)
  }
  if (params.sort && params.sort !== 'title') search.set('sort', params.sort)

  const query = search.toString()
  return query ? `/books?${query}` : '/books'
}

export const booksApi = {
  getAll(params: BooksListParams = {}) {
    return apiClient<ApiSuccess<BooksListResult>>(buildBooksQuery(params), {
      auth: false,
    }).then((res) => res.data)
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
