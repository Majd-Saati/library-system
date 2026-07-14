export type AvailabilityStatus = 'available' | 'checked_out'

export interface Book {
  id: string
  title: string
  author: string
  genre: string
  year: number
  price: number
  coverUrl: string
  description: string
  pages: number
  language: string
  publisher: string
  isbn: string
  availableCopies: number
  rating: number
  availabilityStatus?: AvailabilityStatus
}

export function formatBookYear(year: number, bceLabel = 'BCE'): string {
  return year < 0 ? `${Math.abs(year)} ${bceLabel}` : String(year)
}

export function getAvailabilityStatus(book: Book): AvailabilityStatus {
  if (book.availabilityStatus) return book.availabilityStatus
  return book.availableCopies > 0 ? 'available' : 'checked_out'
}
