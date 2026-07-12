import { Formik, Form, Field, type FieldProps } from 'formik'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import type { Book } from '../data/books'
import type { Loan } from '../store/slices/loansSlice'
import { returnBook } from '../store/slices/loansSlice'
import { useAppDispatch } from '../store/hooks'
import {
  createReturnSchema,
  returnInitialValues,
  type ReturnFormValues,
} from '../validation/returnSchema'
import { ErrorMessage } from './ErrorMessage'

interface ReturnBookFormProps {
  book: Book
  loan: Loan
}

const ERROR_COLOR = '#c0392b'

export function ReturnBookForm({ book, loan }: ReturnBookFormProps) {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const validationSchema = createReturnSchema(t, loan.email)

  function handleSubmit(values: ReturnFormValues) {
    console.log({
      action: 'return',
      loanId: loan.id,
      book: {
        id: book.id,
        title: book.title,
        author: book.author,
      },
      borrower: {
        fullName: loan.fullName,
        email: loan.email,
      },
      returnDetails: values,
    })

    dispatch(returnBook(loan.id))
    toast.success(t('return.toast.success', { title: book.title }))
    navigate('/books')
  }

  return (
    <Formik
      initialValues={returnInitialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
              {t('return.fields.email')}
            </label>
            <Field name="email">
              {({ field }: FieldProps) => (
                <input
                  {...field}
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t('return.fields.emailPlaceholder')}
                  className="w-full rounded-xl border border-border bg-brand-light/30 px-3 py-2.5 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              )}
            </Field>
            <ErrorMessage
              color={ERROR_COLOR}
              error={touched.email && errors.email}
            />
          </div>

          <div>
            <label
              htmlFor="conditionNotes"
              className="mb-1.5 block text-sm font-semibold text-ink"
            >
              {t('return.fields.conditionNotes')}
            </label>
            <Field name="conditionNotes">
              {({ field }: FieldProps) => (
                <textarea
                  {...field}
                  id="conditionNotes"
                  rows={4}
                  placeholder={t('return.fields.conditionNotesPlaceholder')}
                  className="w-full resize-y rounded-xl border border-border bg-brand-light/30 px-3 py-2.5 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              )}
            </Field>
            <ErrorMessage
              color={ERROR_COLOR}
              error={touched.conditionNotes && errors.conditionNotes}
            />
          </div>

          <div>
            <label className="flex items-start gap-3 text-sm text-ink">
              <Field name="confirmReturn">
                {({ field }: FieldProps) => (
                  <input
                    {...field}
                    type="checkbox"
                    checked={field.value}
                    className="mt-1 size-4 rounded border-border text-brand focus:ring-brand"
                  />
                )}
              </Field>
              <span>{t('return.fields.confirmReturn')}</span>
            </label>
            <ErrorMessage
              color={ERROR_COLOR}
              error={touched.confirmReturn && errors.confirmReturn}
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60 dark:text-page dark:hover:bg-brand/80"
            >
              {t('return.submit')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/books')}
              className="rounded-xl bg-brand-light px-5 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white dark:hover:text-page"
            >
              {t('return.cancel')}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
