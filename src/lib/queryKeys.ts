export const queryKeys = {
  books: {
    all: ['books'] as const,
    detail: (id: string) => ['books', id] as const,
  },
  auth: {
    me: ['auth', 'me'] as const,
  },
}
