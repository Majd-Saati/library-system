import { NavLink, Outlet } from 'react-router-dom'
import './Layout.css'

export function Layout() {
  return (
    <div className="layout">
      <header className="layout__header">
        <p className="layout__brand">Library System</p>
        <nav className="layout__nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/books">Books</NavLink>
        </nav>
      </header>
      <main className="layout__main">
        <Outlet />
      </main>
    </div>
  )
}
