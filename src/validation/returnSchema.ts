import type { TFunction } from 'i18next'
import * as Yup from 'yup'

export interface ReturnFormValues {
  email: string
  conditionNotes: string
  confirmReturn: boolean
}

export const returnInitialValues: ReturnFormValues = {
  email: '',
  conditionNotes: '',
  confirmReturn: false,
}

export function createReturnSchema(t: TFunction, borrowerEmail: string) {
  return Yup.object({
    email: Yup.string()
      .trim()
      .email(t('return.errors.emailInvalid'))
      .required(t('return.errors.emailRequired'))
      .test(
        'matches-borrower',
        t('return.errors.emailMismatch'),
        (value) => value?.toLowerCase() === borrowerEmail.toLowerCase(),
      ),
    conditionNotes: Yup.string().trim().max(500, t('return.errors.notesMax')),
    confirmReturn: Yup.boolean().oneOf(
      [true],
      t('return.errors.confirmRequired'),
    ),
  })
}
