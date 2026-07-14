import type { Loan } from '../types/loan'
import type { Book } from '../types/book'
import { apiClient } from './client'
import type { ApiSuccess } from './types'

export const loansApi = {
  getMine() {
    return apiClient<ApiSuccess<{ loans: Loan[] }>>('/loans').then(
      (res) => res.data.loans,
    )
  },

  getById(id: string) {
    return apiClient<ApiSuccess<{ loan: Loan }>>(`/loans/${id}`).then(
      (res) => res.data.loan,
    )
  },

  returnLoan(
    id: string,
    body: {
      email: string
      conditionNotes?: string
      confirmReturn: boolean
    },
  ) {
    return apiClient<ApiSuccess<{ loan: Loan; book: Book }>>(
      `/loans/${id}/return`,
      { method: 'POST', body },
    ).then((res) => res.data)
  },
}
