import type { Book } from '../types/book'

export interface BookSearchResult {
  book: Book
  score: number
}

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ')
}

function scoreField(field: string, query: string): number {
  const value = normalize(field)
  if (!value || !query) return 0
  if (value === query) return 100
  if (value.startsWith(query)) return 80
  if (value.includes(` ${query}`)) return 60
  if (value.includes(query)) return 40
  return 0
}

function scoreBook(book: Book, query: string): number {
  const tokens = normalize(query).split(' ').filter(Boolean)
  if (tokens.length === 0) return 0

  return tokens.reduce((total, token) => {
    const titleScore = scoreField(book.title, token) * 3
    const authorScore = scoreField(book.author, token) * 2
    const genreScore = scoreField(book.genre, token)
    return total + Math.max(titleScore, authorScore, genreScore)
  }, 0)
}

export function searchBooks(
  catalog: Book[],
  query: string,
  limit?: number,
): BookSearchResult[] {
  const normalizedQuery = normalize(query)
  if (!normalizedQuery) {
    return catalog.map((book) => ({ book, score: 0 }))
  }

  const ranked = catalog
    .map((book) => ({ book, score: scoreBook(book, normalizedQuery) }))
    .filter((result) => result.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return a.book.title.localeCompare(b.book.title)
    })

  return typeof limit === 'number' ? ranked.slice(0, limit) : ranked
}
