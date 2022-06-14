import React, { useMemo } from 'react'
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom'
import { Box, IconButton, Link } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

import { SurveysEnum } from '../../surveys/surveys'
import { useUserRole } from './RoleGuard'

const styles = {
  container: {
    display: 'flex',
    flex: 3,
    maxWidth: 300,
    flexDirection: 'column',
    alignItems: 'center',
    py: 2,
    px: 4,
  },
  avatar: {
    mt: 2,
    width: 56,
    height: 56,
  },
}

export default function LeftBar() {
  const { test } = useParams()
  const path = useLocation().pathname

  const { isAdmin, notAdmin } = useUserRole()

  const tests = useMemo(() => {
    return Object.entries(SurveysEnum).map(([key, survey]) => ({ link: key, name: survey.shortName }))
  }, [])

  return (
    <Box sx={styles.container}>
      <Box sx={{ pb: 4 }}>
        <IconButton component={RouterLink} to="/" size="large" color={test ? 'default' : 'primary'}>
          <HomeIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {notAdmin && (
          <>
            {tests.map(t => (
              <Link
                key={t.link}
                color={test === t.link ? 'primary.main' : 'textSecondary'}
                variant="body2"
                component={RouterLink}
                to={`/survey/${t.link}`}
              >
                {t.name}
              </Link>
            ))}
          </>
        )}
        {isAdmin && (
          <>
            <Link
              color={path === '/graphics' ? 'primary.main' : 'textSecondary'}
              variant="body2"
              component={RouterLink}
              to="/graphics"
            >
              Результаты тестирований
            </Link>
            <Link
              color={path === '/analytics' ? 'primary.main' : 'textSecondary'}
              variant="body2"
              component={RouterLink}
              to="/analytics"
            >
              Аналитика
            </Link>
            <Link
              color={path === '/recommendations' ? 'primary.main' : 'textSecondary'}
              variant="body2"
              component={RouterLink}
              to="/recommendations"
            >
              Рекомендации
            </Link>
          </>
        )}
      </Box>
    </Box>
  )
}
