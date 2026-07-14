import { useTranslation } from 'react-i18next'
import { getAvailabilityStatus, type Book } from '../types/book'

interface AvailabilityBadgeProps {
  book: Book
  className?: string
}

export function AvailabilityBadge({ book, className = '' }: AvailabilityBadgeProps) {
  const { t } = useTranslation()
  const status = getAvailabilityStatus(book)
  const isAvailable = status === 'available'

  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
        isAvailable
          ? 'bg-brand-light text-brand'
          : 'bg-accent-light text-accent-dark',
        className,
      ].join(' ')}
    >
      {isAvailable
        ? t('book.availability.available')
        : t('book.availability.checkedOut')}
    </span>
  )
}
