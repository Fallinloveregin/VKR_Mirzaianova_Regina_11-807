import { Box } from '@mui/material'

import LeftBar from './LeftBar'
import RightBar from './RightBar'
import Content from './Content'

const styles = {
  container: {
    display: 'flex',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'background.default',
    py: 2,
  },
}

export default function Layout() {
  return (
    <Box sx={styles.container}>
      <LeftBar />
      <Content />
      <RightBar />
    </Box>
  )
}
