import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import type { Book } from '../data/books'

interface BookSearchProps {
  query: string
  suggestions: Book[]
  onQueryChange: (value: string) => void
  onSelect: (book: Book) => void
  onClear: () => void
}

export function BookSearch({
  query,
  suggestions,
  onQueryChange,
  onSelect,
  onClear,
}: BookSearchProps) {
  const listboxId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const showSuggestions = isOpen && query.trim().length > 0

  useEffect(() => {
    setActiveIndex(-1)
  }, [query])

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!showSuggestions) {
      if (event.key === 'ArrowDown' && suggestions.length > 0) {
        setIsOpen(true)
        setActiveIndex(0)
      }
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) =>
        index < suggestions.length - 1 ? index + 1 : 0,
      )
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) =>
        index > 0 ? index - 1 : suggestions.length - 1,
      )
      return
    }

    if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault()
      onSelect(suggestions[activeIndex])
      setIsOpen(false)
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      setIsOpen(false)
    }
  }

  function handleSelect(book: Book) {
    onSelect(book)
    setIsOpen(false)
  }

  return (
    <div ref={rootRef} className="relative w-full max-w-2xl">
      <label htmlFor="book-search" className="sr-only">
        Search books by title, author, or genre
      </label>

      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-brand/50"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </span>

        <input
          id="book-search"
          type="text"
          role="combobox"
          value={query}
          autoComplete="off"
          spellCheck={false}
          placeholder="Search by title, author, or genre…"
          aria-expanded={showSuggestions}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
          }
          onChange={(event) => {
            onQueryChange(event.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-2xl border border-brand/15 bg-white py-3.5 pr-20 pl-12 text-base text-brand-dark shadow-[0_10px_30px_-18px_rgba(27,79,114,0.45)] outline-none transition placeholder:text-brand/40 focus:border-brand focus:ring-4 focus:ring-brand/15"
        />

        {query ? (
          <button
            type="button"
            onClick={() => {
              onClear()
              setIsOpen(false)
            }}
            className="absolute inset-y-0 right-3 my-auto h-8 rounded-lg px-2.5 text-sm font-semibold text-brand/70 transition hover:bg-brand-light hover:text-brand"
            aria-label="Clear search"
          >
            Clear
          </button>
        ) : null}
      </div>

      {showSuggestions ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="Book suggestions"
          className="absolute z-30 mt-2 max-h-80 w-full overflow-auto rounded-2xl border border-brand/10 bg-white p-2 shadow-[0_18px_40px_-20px_rgba(27,79,114,0.55)]"
        >
          {suggestions.length === 0 ? (
            <li className="px-3 py-3 text-sm text-brand/60">
              No matching books found.
            </li>
          ) : (
            suggestions.map((book, index) => {
              const isActive = index === activeIndex

              return (
                <li key={book.id} role="presentation">
                  <button
                    id={`${listboxId}-option-${index}`}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => handleSelect(book)}
                    className={[
                      'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition',
                      isActive ? 'bg-brand-light text-brand-dark' : 'hover:bg-accent-light/70',
                    ].join(' ')}
                  >
                    <img
                      src={book.coverUrl}
                      alt=""
                      className="h-12 w-8 shrink-0 rounded object-cover ring-1 ring-brand/10"
                    />
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-brand-dark">
                        {book.title}
                      </span>
                      <span className="block truncate text-sm text-brand/65">
                        {book.author} · {book.genre}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })
          )}
        </ul>
      ) : null}
    </div>
  )
}
