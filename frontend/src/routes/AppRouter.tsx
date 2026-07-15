import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navigate, useParams } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { GuestRoute } from './GuestRoute'
import {
  BookPage,
  BooksPage,
  CheckoutPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  ReturnPage,
} from './lazyPages'
import { ProtectedRoute } from './ProtectedRoute'
import { RootLayout } from './RootLayout'
import { paths, routePatterns } from './paths'
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

          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]

const router = createBrowserRouter(appRoutes)

export function AppRouter() {
  return <RouterProvider router={router} />
}
