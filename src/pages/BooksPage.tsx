import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { addBook, removeBook } from '../store/slices/booksSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export function BooksPage() {
  const { t } = useTranslation()
  const books = useAppSelector((state) => state.books.items)
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!title.trim() || !author.trim()) return

    dispatch(addBook({ title: title.trim(), author: author.trim() }))
    setTitle('')
    setAuthor('')
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl text-ink">{t('shelf.title')}</h1>
      <p className="mt-2 text-muted">{t('shelf.subtitle')}</p>

      <form
        className="mt-8 flex flex-col gap-3 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border sm:flex-row"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder={t('shelf.titlePlaceholder')}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="flex-1 rounded-xl border border-border bg-brand-light/40 px-3 py-2.5 text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        <input
          type="text"
          placeholder={t('shelf.authorPlaceholder')}
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          className="flex-1 rounded-xl border border-border bg-brand-light/40 px-3 py-2.5 text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        <button
          type="submit"
          className="rounded-xl bg-accent px-4 py-2.5 font-semibold text-white transition hover:bg-accent-dark dark:text-page"
        >
          {t('shelf.addBook')}
        </button>
      </form>

      <ul className="mt-6 space-y-3">
        {books.map((book) => (
          <li
            key={book.id}
            className="flex items-center justify-between gap-4 rounded-2xl bg-surface px-4 py-3 shadow-sm ring-1 ring-border"
          >
            <div>
              <strong className="block text-ink">{book.title}</strong>
              <span className="text-sm text-muted">{book.author}</span>
            </div>
            <button
              type="button"
              onClick={() => dispatch(removeBook(book.id))}
              className="rounded-lg bg-brand-light px-3 py-1.5 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white dark:hover:text-page"
            >
              {t('shelf.remove')}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
