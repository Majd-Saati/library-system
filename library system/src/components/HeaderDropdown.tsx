import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { CaretDown } from '@phosphor-icons/react'

interface HeaderDropdownProps {
  label: string
  trigger: ReactNode
  children: ReactNode
  align?: 'start' | 'end'
  className?: string
}

export function HeaderDropdown({
  label,
  trigger,
  children,
  align = 'end',
  className = '',
}: HeaderDropdownProps) {
  const menuId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className={`relative ${className}`.trim()}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={label}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-light px-2.5 py-2 text-sm font-semibold text-brand transition hover:bg-brand-light/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        {trigger}
        <CaretDown
          size={12}
          weight="bold"
          aria-hidden
          className={[
            'shrink-0 text-brand/70 transition duration-200',
            open ? 'rotate-180' : '',
          ].join(' ')}
        />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          className={[
            'absolute top-full z-40 mt-2 min-w-40 overflow-hidden rounded-xl border border-border bg-surface p-1 shadow-[0_16px_36px_-18px_rgba(27,79,114,0.5)] dark:shadow-[0_16px_36px_-18px_rgba(0,0,0,0.65)]',
            align === 'end' ? 'end-0' : 'start-0',
          ].join(' ')}
        >
          <div onClick={() => setOpen(false)}>{children}</div>
        </div>
      ) : null}
    </div>
  )
}

interface HeaderMenuItemProps {
  children: ReactNode
  active?: boolean
  onClick?: () => void
  disabled?: boolean
  danger?: boolean
}

export function HeaderMenuItem({
  children,
  active = false,
  onClick,
  disabled = false,
  danger = false,
}: HeaderMenuItemProps) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={onClick}
      className={[
        'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-start text-sm font-semibold transition',
        danger
          ? 'text-red-700 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/40'
          : active
            ? 'bg-brand text-white dark:text-page'
            : 'text-ink hover:bg-brand-light hover:text-brand',
        disabled ? 'cursor-not-allowed opacity-50' : '',
      ].join(' ')}
    >
      {children}
    </button>
  )
}
