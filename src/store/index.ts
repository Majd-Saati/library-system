import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import booksReducer from './slices/booksSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    books: booksReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
