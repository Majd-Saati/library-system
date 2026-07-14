import { Eye, EyeSlash } from '@phosphor-icons/react'
import { Formik, Form, Field, type FieldProps } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { getErrorMessage } from '../../api'
import { ErrorMessage } from '../../components/ErrorMessage'
import { useAppSelector } from '../../store/hooks'
import { selectIsAuthenticated } from '../../store/slices/authSlice'
import { useLoginMutation } from './hooks/useLoginMutation'
import {
  createLoginSchema,
  loginInitialValues,
  type LoginFormValues,
} from './validation/loginSchema'

const ERROR_COLOR = '#c0392b'

export function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const loginMutation = useLoginMutation()
  const [showPassword, setShowPassword] = useState(false)

  const from =
    (location.state as { from?: string } | null)?.from ||
    new URLSearchParams(location.search).get('redirect') ||
    '/'

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  async function handleSubmit(values: LoginFormValues) {
    try {
      await loginMutation.mutateAsync({
        email: values.email.trim().toLowerCase(),
        password: values.password,
      })
      toast.success(t('login.toast.success'))
      navigate(from, { replace: true })
    } catch (error) {
      toast.error(getErrorMessage(error, t('login.toast.failed')))
    }
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="rounded-3xl bg-surface p-6 shadow-sm ring-1 ring-border sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
          {t('login.eyebrow')}
        </p>
        <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
          {t('login.title')}
        </h1>
        <p className="mt-2 text-muted">{t('login.subtitle')}</p>

        <Formik
          initialValues={loginInitialValues}
          validationSchema={createLoginSchema(t)}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="mt-8 space-y-4" noValidate>
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-1.5 block text-sm font-semibold text-ink"
                >
                  {t('login.fields.email')}
                </label>
                <Field name="email">
                  {({ field }: FieldProps) => (
                    <input
                      {...field}
                      id="login-email"
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
                <label
                  htmlFor="login-password"
                  className="mb-1.5 block text-sm font-semibold text-ink"
                >
                  {t('login.fields.password')}
                </label>
                <div className="relative">
                  <Field name="password">
                    {({ field }: FieldProps) => (
                      <input
                        {...field}
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        className="w-full rounded-xl border border-border bg-brand-light/30 px-3 py-2.5 pe-11 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                      />
                    )}
                  </Field>
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-e-0 top-0 flex h-full items-center px-3 text-muted transition hover:text-brand"
                    aria-label={
                      showPassword
                        ? t('login.hidePassword')
                        : t('login.showPassword')
                    }
                  >
                    {showPassword ? (
                      <EyeSlash size={20} weight="regular" aria-hidden />
                    ) : (
                      <Eye size={20} weight="regular" aria-hidden />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  color={ERROR_COLOR}
                  error={touched.password && errors.password}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || loginMutation.isPending}
                className="w-full rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60 dark:text-page"
              >
                {loginMutation.isPending || isSubmitting
                  ? t('login.submitting')
                  : t('login.submit')}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-6 text-center text-sm text-muted">
          <Link to="/" className="font-semibold text-brand hover:text-accent">
            {t('login.backHome')}
          </Link>
        </p>
      </div>
    </section>
  )
}
