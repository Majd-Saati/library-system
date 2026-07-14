import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { BookPage } from './pages/BookPage'
import { BooksPage } from './pages/BooksPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { ReturnPage } from './pages/ReturnPage'
import { useAppDispatch } from './store/hooks'
import { logout } from './store/slices/authSlice'
import { useTheme } from './theme/ThemeProvider'

function AppToaster() {
  const { resolvedTheme } = useTheme()

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          background: resolvedTheme === 'dark' ? '#15202b' : '#ffffff',
          color: resolvedTheme === 'dark' ? '#e8f1f8' : '#123652',
          border: `1px solid ${resolvedTheme === 'dark' ? '#2a3b4c' : '#d5dde5'}`,
        },
      }}
    />
  )
}

function AuthUnauthorizedListener() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    function onUnauthorized() {
      dispatch(logout())
    }

    window.addEventListener('auth:unauthorized', onUnauthorized)
    return () => window.removeEventListener('auth:unauthorized', onUnauthorized)
  }, [dispatch])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <AppToaster />
      <AuthUnauthorizedListener />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="books" element={<BooksPage />} />
          <Route path="book/:bookId" element={<BookPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="checkout/:bookId" element={<CheckoutPage />} />
            <Route path="return/:loanId" element={<ReturnPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
