import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Loan {
  id: string
  bookId: string
  fullName: string
  email: string
  phone: string
  address: string
  borrowedAt: string
}

interface LoansState {
  items: Loan[]
}

const STORAGE_KEY = 'library-loans'

function loadLoans(): Loan[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Loan[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function persistLoans(items: Loan[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

const initialState: LoansState = {
  items: typeof window === 'undefined' ? [] : loadLoans(),
}

const loansSlice = createSlice({
  name: 'loans',
  initialState,
  reducers: {
    borrowBook: (
      state,
      action: PayloadAction<Omit<Loan, 'id' | 'borrowedAt'>>,
    ) => {
      const loan: Loan = {
        id: crypto.randomUUID(),
        borrowedAt: new Date().toISOString(),
        ...action.payload,
      }
      state.items.push(loan)
      persistLoans(state.items)
    },
    returnBook: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((loan) => loan.id !== action.payload)
      persistLoans(state.items)
    },
  },
})

export const { borrowBook, returnBook } = loansSlice.actions
export default loansSlice.reducer

export function selectLoans(state: { loans: LoansState }) {
  return state.loans.items
}

export function selectLoanById(state: { loans: LoansState }, loanId: string) {
  return state.loans.items.find((loan) => loan.id === loanId)
}

export function selectActiveLoanCountForBook(
  state: { loans: LoansState },
  bookId: string,
) {
  return state.loans.items.filter((loan) => loan.bookId === bookId).length
}
