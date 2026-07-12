import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { BookPage } from './pages/BookPage'
import { BooksPage } from './pages/BooksPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { HomePage } from './pages/HomePage'
import { ReturnPage } from './pages/ReturnPage'
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

function App() {
  return (
    <BrowserRouter>
      <AppToaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="books" element={<BooksPage />} />
          <Route path="book/:bookId" element={<BookPage />} />
          <Route path="checkout/:bookId" element={<CheckoutPage />} />
          <Route path="return/:loanId" element={<ReturnPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
