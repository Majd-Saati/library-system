import { ArrowLeft } from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface BackLinkProps {
  to: string
  children: ReactNode
}

export function BackLink({ to, children }: BackLinkProps) {
  const { i18n } = useTranslation()
  const isRtl = i18n.dir() === 'rtl'

  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-accent"
    >
      <ArrowLeft
        size={16}
        weight="bold"
        className={isRtl ? 'rotate-180' : undefined}
        aria-hidden
      />
      {children}
    </Link>
  )
}
