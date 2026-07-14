import type { TFunction } from 'i18next'
import * as Yup from 'yup'

export interface LoginFormValues {
  email: string
  password: string
}

export const loginInitialValues: LoginFormValues = {
  email: '',
  password: '',
}

export function createLoginSchema(t: TFunction) {
  return Yup.object({
    email: Yup.string()
      .trim()
      .email(t('login.errors.emailInvalid'))
      .required(t('login.errors.emailRequired')),
    password: Yup.string()
      .min(6, t('login.errors.passwordMin'))
      .required(t('login.errors.passwordRequired')),
  })
}
