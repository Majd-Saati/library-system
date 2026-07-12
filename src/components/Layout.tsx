import { NavLink, Outlet } from 'react-router-dom'

export function Layout() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'rounded-lg px-3 py-2 text-sm font-semibold transition',
      isActive
        ? 'bg-brand text-white'
        : 'text-brand-dark/80 hover:bg-brand-light hover:text-brand',
    ].join(' ')

  return (
    <div className="min-h-svh">
      <header className="sticky top-0 z-20 border-b border-brand/10 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <p className="font-display text-xl tracking-tight text-brand sm:text-2xl">
            Library System
          </p>
          <nav className="flex items-center gap-1 sm:gap-2">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/books" className={linkClass}>
              My shelf
            </NavLink>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
