import { Formik, Form, Field, type FieldProps } from 'formik'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import type { Book } from '../data/books'
import {
  checkoutInitialValues,
  createCheckoutSchema,
  type BookActionType,
  type CheckoutFormValues,
} from '../validation/checkoutSchema'
import { ErrorMessage } from './ErrorMessage'

interface BookActionFormProps {
  book: Book
  action: BookActionType
  onClose: () => void
}

const ERROR_COLOR = '#c0392b'

export function BookActionForm({ book, action, onClose }: BookActionFormProps) {
  const { t } = useTranslation()
  const validationSchema = createCheckoutSchema(t)

  function handleSubmit(values: CheckoutFormValues) {
    console.log({
      action,
      book: {
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
      },
      user: values,
    })

    toast.success(
      action === 'buy'
        ? t('checkout.toast.buySuccess', { title: book.title })
        : t('checkout.toast.borrowSuccess', { title: book.title }),
    )

    onClose()
  }

  return (
    <Formik
      initialValues={checkoutInitialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-4" noValidate>
          <div>
            <label htmlFor="fullName" className="mb-1.5 block text-sm font-semibold text-ink">
              {t('checkout.fields.fullName')}
            </label>
            <Field name="fullName">
              {({ field }: FieldProps) => (
                <input
                  {...field}
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  className="w-full rounded-xl border border-border bg-brand-light/30 px-3 py-2.5 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              )}
            </Field>
            <ErrorMessage
              color={ERROR_COLOR}
              error={touched.fullName && errors.fullName}
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
              {t('checkout.fields.email')}
            </label>
            <Field name="email">
              {({ field }: FieldProps) => (
                <input
                  {...field}
                  id="email"
                  type="email"
                  autoComplete="email"
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
            <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-ink">
              {t('checkout.fields.phone')}
            </label>
            <Field name="phone">
              {({ field }: FieldProps) => (
                <input
                  {...field}
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  className="w-full rounded-xl border border-border bg-brand-light/30 px-3 py-2.5 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              )}
            </Field>
            <ErrorMessage
              color={ERROR_COLOR}
              error={touched.phone && errors.phone}
            />
          </div>

          <div>
            <label htmlFor="address" className="mb-1.5 block text-sm font-semibold text-ink">
              {t('checkout.fields.address')}
            </label>
            <Field name="address">
              {({ field }: FieldProps) => (
                <textarea
                  {...field}
                  id="address"
                  rows={3}
                  autoComplete="street-address"
                  className="w-full resize-y rounded-xl border border-border bg-brand-light/30 px-3 py-2.5 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              )}
            </Field>
            <ErrorMessage
              color={ERROR_COLOR}
              error={touched.address && errors.address}
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark disabled:opacity-60 dark:text-page"
            >
              {t('checkout.submit')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-brand-light px-5 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white dark:hover:text-page"
            >
              {t('checkout.cancel')}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
