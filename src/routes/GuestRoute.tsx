import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { selectIsAuthenticated } from '../store/slices/authSlice'
import { paths } from './paths'

/** Redirects authenticated users away from guest-only pages (e.g. login). */
export function GuestRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const location = useLocation()

  if (isAuthenticated) {
    const from =
      (location.state as { from?: string } | null)?.from || paths.home
    return <Navigate to={from} replace />
  }

  return <Outlet />
}
