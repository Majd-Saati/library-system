export const paths = {
  home: '/',
  login: '/login',
  shelf: '/shelf',
  book: (bookId: string) => `/books/${bookId}`,
  checkout: (bookId: string, action: 'buy' | 'borrow') =>
    `/checkout/${bookId}?action=${action}`,
  returnLoan: (loanId: string) => `/shelf/return/${loanId}`,
} as const

export const routePatterns = {
  home: '/',
  login: 'login',
  shelf: 'shelf',
  book: 'books/:bookId',
  checkout: 'checkout/:bookId',
  returnLoan: 'shelf/return/:loanId',
  /** Legacy redirects */
  legacyShelf: 'books',
  legacyBook: 'book/:bookId',
  legacyReturn: 'return/:loanId',
} as const
