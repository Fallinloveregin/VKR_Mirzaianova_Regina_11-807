import { createTheme as createMuiTheme, responsiveFontSizes } from '@mui/material/styles'

import { baseTheme } from './baseTheme'
import { darkTheme } from './darkTheme'
import { lightTheme } from './lightTheme'

export const Themes = {
  Light: 'light',
  Dark: 'dark',
}

export const createTheme = (config = {}) => {
  let theme = createMuiTheme(baseTheme, config.mode === Themes.Dark ? darkTheme : lightTheme)

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme)
  }

  return theme
}
