export const queryKeys = {
  books: {
    all: (query = '') => ['books', query] as const,
    detail: (id: string) => ['books', 'detail', id] as const,
  },
  auth: {
    me: ['auth', 'me'] as const,
  },
}
