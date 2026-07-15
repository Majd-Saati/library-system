import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navigate, useParams } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { GuestRoute } from './GuestRoute'
import { ProtectedRoute } from './ProtectedRoute'
import { RootLayout } from './RootLayout'
import { paths, routePatterns } from './paths'

const HomePage = lazy(() =>
  import('../pages/home').then((m) => ({ default: m.HomePage })),
)
const BookPage = lazy(() =>
  import('../pages/book').then((m) => ({ default: m.BookPage })),
)
const BooksPage = lazy(() =>
  import('../pages/shelf').then((m) => ({ default: m.BooksPage })),
)
const LoginPage = lazy(() =>
  import('../pages/login').then((m) => ({ default: m.LoginPage })),
)
const CheckoutPage = lazy(() =>
  import('../pages/checkout').then((m) => ({ default: m.CheckoutPage })),
)
const ReturnPage = lazy(() =>
  import('../pages/return').then((m) => ({ default: m.ReturnPage })),
)

function LegacyBookRedirect() {
  const { bookId } = useParams<{ bookId: string }>()
  return <Navigate to={paths.book(bookId!)} replace />
}

function LegacyReturnRedirect() {
  const { loanId } = useParams<{ loanId: string }>()
  return <Navigate to={paths.returnLoan(loanId!)} replace />
}

const appRoutes = [
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: routePatterns.book, element: <BookPage /> },
          { path: routePatterns.shelf, element: <BooksPage /> },

          {
            element: <GuestRoute />,
            children: [{ path: routePatterns.login, element: <LoginPage /> }],
          },

          {
            element: <ProtectedRoute />,
            children: [
              { path: routePatterns.checkout, element: <CheckoutPage /> },
              { path: routePatterns.returnLoan, element: <ReturnPage /> },
            ],
          },

          {
            path: routePatterns.legacyShelf,
            element: <Navigate to={paths.shelf} replace />,
          },
          {
            path: routePatterns.legacyBook,
            element: <LegacyBookRedirect />,
          },
          {
            path: routePatterns.legacyReturn,
            element: <LegacyReturnRedirect />,
          },

          { path: '*', element: <Navigate to={paths.home} replace /> },
        ],
      },
    ],
  },
]

const router = createBrowserRouter(appRoutes)

export function AppRouter() {
  return <RouterProvider router={router} />
}
