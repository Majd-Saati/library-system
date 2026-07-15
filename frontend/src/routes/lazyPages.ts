import { lazy } from 'react'

export const HomePage = lazy(() =>
  import('../pages/home').then((m) => ({ default: m.HomePage })),
)
export const BookPage = lazy(() =>
  import('../pages/book').then((m) => ({ default: m.BookPage })),
)
export const BooksPage = lazy(() =>
  import('../pages/shelf').then((m) => ({ default: m.BooksPage })),
)
export const LoginPage = lazy(() =>
  import('../pages/login').then((m) => ({ default: m.LoginPage })),
)
export const CheckoutPage = lazy(() =>
  import('../pages/checkout').then((m) => ({ default: m.CheckoutPage })),
)
export const ReturnPage = lazy(() =>
  import('../pages/return').then((m) => ({ default: m.ReturnPage })),
)
export const NotFoundPage = lazy(() =>
  import('../pages/not-found').then((m) => ({ default: m.NotFoundPage })),
)
