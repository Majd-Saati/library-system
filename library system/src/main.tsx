import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import App from './App.tsx'
import './i18n'
import { queryClient } from './lib/queryClient'
import { store } from './store'
import { ThemeProvider } from './theme/ThemeProvider'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
