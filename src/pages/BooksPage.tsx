import { useState, type FormEvent } from 'react'
import { addBook, removeBook } from '../store/slices/booksSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import './BooksPage.css'

export function BooksPage() {
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
    <section className="page">
      <h1>Books</h1>
      <p className="page__lead">
        Demo page wired to the <code>books</code> Redux slice.
      </p>

      <form className="books-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
        <button type="submit">Add book</button>
      </form>

      <ul className="books-list">
        {books.map((book) => (
          <li key={book.id} className="books-list__item">
            <div>
              <strong>{book.title}</strong>
              <span>{book.author}</span>
            </div>
            <button type="button" onClick={() => dispatch(removeBook(book.id))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
