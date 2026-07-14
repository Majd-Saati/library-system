import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { selectIsAuthenticated } from '../store/slices/authSlice'

export function ProtectedRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    const redirect = `${location.pathname}${location.search}`
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: redirect }}
      />
    )
  }

  return <Outlet />
}
