import React from 'react'
import { HelmetProvider } from 'react-helmet-async'

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
import dayjsRandom from 'dayjs-random'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import timezone from 'dayjs/plugin/timezone'
import AdapterDayjs from '@date-io/dayjs'
import { LocalizationProvider } from '@mui/lab'

import Router from '../../providers/Router'
import { SettingsProvider } from '../../providers/SettingsProvider'
import ThemeProvider from '../../providers/ThemeProvider'
import CurrentUserProvider from '../../providers/CurrentUserProvider'

dayjs.extend(localizedFormat)
dayjs.extend(utc)
dayjs.extend(advancedFormat)
dayjs.extend(customParseFormat)
dayjs.extend(timezone)
dayjs.extend(dayjsRandom)

// Compose all wrappers in one place
function ComposeProviders({ children }) {
  return (
    <HelmetProvider>
      <Router>
        <SettingsProvider>
          <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CurrentUserProvider>{children}</CurrentUserProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </SettingsProvider>
      </Router>
    </HelmetProvider>
  )
}

export const withProviders = Component => props => {
  return (
    <ComposeProviders>
      <Component {...props} />
    </ComposeProviders>
  )
}
