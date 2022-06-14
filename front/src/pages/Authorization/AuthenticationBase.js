import React from 'react'
import { Box, Card, Container } from '@mui/material'

import styles from './styles'

export default function AuthenticationBase({ children }) {
  return (
    <Box component="main" sx={styles.page}>
      <Container maxWidth="sm" sx={styles.container}>
        <Card elevation={16} sx={styles.content}>
          {children}
        </Card>
      </Container>
    </Box>
  )
}
