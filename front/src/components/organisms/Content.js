import { useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import dayjs from 'dayjs'
import { Box, Typography } from '@mui/material'

import { useSettings } from '../../providers/SettingsProvider'
import { ThemeSwitch } from '../atoms/ThemeSwitch'

const styles = {
  container: {
    display: 'flex',
    flex: 7,
    flexDirection: 'column',
    overflow: 'auto',
    backgroundColor: 'background.paper',
    borderRadius: 2,
    py: 4,
    px: 6,
    boxShadow: theme => theme.shadows[20],
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    pb: 4,
  },
}

export default function Content() {
  const { settings, saveSettings } = useSettings()

  const greet = useMemo(() => {
    const hour = dayjs().hour()
    if (hour < 12) return 'Доброе утро'
    if (hour >= 12 && hour <= 17) return 'Добрый день'
    return 'Добрый вечер'
  }, [])

  return (
    <Box sx={styles.container}>
      <Box sx={styles.title}>
        <Typography variant="body2">{greet}, Регина</Typography>
        <ThemeSwitch
          checked={settings.mode === 'dark'}
          onChange={e => saveSettings({ ...settings, mode: e.target.checked ? 'dark' : 'light' })}
        />
      </Box>
      <Outlet />
    </Box>
  )
}
