import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../store/slices/authSlice'
import { useTheme } from '../theme/ThemeProvider'

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

/** Root shell for router: global listeners + page outlet. */
export function RootLayout() {
  return (
    <>
      <AppToaster />
      <AuthUnauthorizedListener />
      <Outlet />
    </>
  )
}
