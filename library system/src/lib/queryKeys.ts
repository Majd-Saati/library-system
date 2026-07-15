export const queryKeys = {
  books: {
    all: (params: {
      q?: string
      genre?: string
      availability?: string
    } = {}) =>
      [
        'books',
        {
          q: params.q ?? '',
          genre: params.genre ?? 'all',
          availability: params.availability ?? 'all',
        },
      ] as const,
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
