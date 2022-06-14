import React, { useMemo } from 'react'
import { Toaster } from 'react-hot-toast'
import ModalProvider from 'mui-modal-provider'
import { ThemeProvider as ThemeProviderMUI, StyledEngineProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import 'nprogress/nprogress.css'

import { createTheme } from '../theme'
import { useSettings } from './SettingsProvider'

export default function ThemeProvider({ overrideMode, children }) {
  const { settings } = useSettings()

  const theme = useMemo(() => {
    const { responsiveFontSizes, mode } = settings
    return createTheme({ responsiveFontSizes, mode: overrideMode || mode })
  }, [overrideMode, settings])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProviderMUI theme={theme}>
        <CssBaseline />
        <Toaster position="top-center" />
        <ModalProvider>{children}</ModalProvider>
      </ThemeProviderMUI>
    </StyledEngineProvider>
  )
}
