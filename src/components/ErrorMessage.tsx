interface ErrorMessageProps {
  color: string
  error?: string | false
}

export function ErrorMessage({ color, error }: ErrorMessageProps) {
  if (!error) return null

  return (
    <p
      role="alert"
      className="mt-1.5 text-sm font-medium"
      style={{ color }}
    >
      {error}
    </p>
  )
}
