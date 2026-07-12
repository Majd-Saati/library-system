import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Book {
  id: string
  title: string
  author: string
}

interface BooksState {
  items: Book[]
}

const initialState: BooksState = {
  items: [
    { id: '1', title: 'Clean Code', author: 'Robert C. Martin' },
    { id: '2', title: 'The Pragmatic Programmer', author: 'Andrew Hunt' },
  ],
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Omit<Book, 'id'>>) => {
      state.items.push({
        id: crypto.randomUUID(),
        ...action.payload,
      })
    },
    removeBook: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((book) => book.id !== action.payload)
    },
  },
})

export const { addBook, removeBook } = booksSlice.actions
export default booksSlice.reducer
