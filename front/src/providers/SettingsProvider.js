import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

const initialSettings = {
  responsiveFontSizes: true,
  mode: 'light',
}

export const SettingsContext = createContext({
  settings: initialSettings,
  saveSettings: () => {},
})

function restoreSettings() {
  let settings = null

  try {
    const storedData = localStorage.getItem('settings')

    if (storedData) {
      settings = JSON.parse(storedData)
    } else {
      settings = {
        responsiveFontSizes: true,
        mode: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
      }
    }
  } catch (err) {
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
    console.error(err)
  }

  return settings
}

function storeSettings(settings) {
  localStorage.setItem('settings', JSON.stringify(settings))
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(initialSettings)

  useEffect(() => {
    const restoredSettings = restoreSettings()

    if (restoredSettings) {
      setSettings(restoredSettings)
    }
  }, [])

  const saveSettings = useCallback(updatedSettings => {
    setSettings(updatedSettings)
    storeSettings(updatedSettings)
  }, [])

  return (
    <SettingsContext.Provider
      value={{
        settings,
        saveSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

/** A hook to access the stored settings data. */
export function useSettings() {
  return useContext(SettingsContext)
}
