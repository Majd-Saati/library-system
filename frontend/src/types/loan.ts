import type { Book } from './book'

export interface Loan {
  id: string
  bookId: string
  userId: number
  fullName: string
  email: string
  phone: string
  address: string
  borrowedAt: string
  returnedAt: string | null
  book?: Book | null
}
