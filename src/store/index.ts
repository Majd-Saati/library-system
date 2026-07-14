import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import booksReducer from './slices/booksSlice'
import counterReducer from './slices/counterSlice'
import loansReducer from './slices/loansSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    books: booksReducer,
    loans: loansReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
