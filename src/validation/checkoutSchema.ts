import type { TFunction } from 'i18next'
import * as Yup from 'yup'

export type BookActionType = 'buy' | 'borrow'

export interface CheckoutFormValues {
  fullName: string
  email: string
  phone: string
  address: string
}

export const checkoutInitialValues: CheckoutFormValues = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
}

export function createCheckoutSchema(t: TFunction) {
  return Yup.object({
    fullName: Yup.string()
      .trim()
      .min(3, t('checkout.errors.fullNameMin'))
      .required(t('checkout.errors.fullNameRequired')),
    email: Yup.string()
      .trim()
      .email(t('checkout.errors.emailInvalid'))
      .required(t('checkout.errors.emailRequired')),
    phone: Yup.string()
      .trim()
      .matches(/^[+]?[\d\s()-]{8,20}$/, t('checkout.errors.phoneInvalid'))
      .required(t('checkout.errors.phoneRequired')),
    address: Yup.string()
      .trim()
      .min(5, t('checkout.errors.addressMin'))
      .required(t('checkout.errors.addressRequired')),
  })
}
