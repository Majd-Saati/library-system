import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './slices/booksSlice'
import counterReducer from './slices/counterSlice'
import loansReducer from './slices/loansSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    books: booksReducer,
    loans: loansReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
