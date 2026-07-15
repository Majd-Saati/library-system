export const queryKeys = {
  books: {
    all: (query = '') => ['books', query] as const,
    detail: (id: string) => ['books', 'detail', id] as const,
  },
  loans: {
    all: ['loans'] as const,
    detail: (id: string) => ['loans', id] as const,
  },
  auth: {
    me: ['auth', 'me'] as const,
  },
}
