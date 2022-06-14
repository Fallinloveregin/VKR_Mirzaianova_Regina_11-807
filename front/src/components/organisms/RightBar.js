import { Box, Typography } from '@mui/material'
import { KeyboardArrowDownSharp } from '@mui/icons-material'

import Avatar from '../atoms/Avatar'
// import { StatsChart } from '../atoms/StatsChart'

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    maxWidth: 250,
    flexDirection: 'column',
    py: 2,
    px: 4,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 1,
    cursor: 'pointer',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  unresolved: {
    display: 'flex',
    flexDirection: 'column',
    pt: 4,
  },
  unresolvedTopics: {
    display: 'flex',
    flexDirection: 'column',
    pt: 2,
    gap: 1,
  },
  topic: {
    cursor: 'pointer',
    pl: 2,
  },
  stats: {
    pt: 4,
  },
}

export default function RightBar() {
  const topics = [
    { name: 'Тест Орлова', description: 'Результат так себе' },
    { name: 'Тест Орлова', description: 'Результат так себе' },
    { name: 'Тест Орлова', description: 'Результат так себе' },
    { name: 'Тест Орлова', description: 'Результат так себе' },
  ]

  return (
    <Box sx={styles.container}>
      <Box sx={styles.title}>
        <Avatar label="Регина" />
        <Typography variant="subtitle2">Регина М.</Typography>
        <KeyboardArrowDownSharp />
      </Box>
      {/*<Box sx={styles.content}>*/}
      {/*  <Box sx={styles.unresolved}>*/}
      {/*    <Typography variant="h5">Ваши результаты</Typography>*/}
      {/*    <Box sx={styles.unresolvedTopics}>*/}
      {/*      {topics.map((topic, i) => (*/}
      {/*        <Box key={i} sx={styles.topic}>*/}
      {/*          <Typography variant="subtitle2" sx={{ mb: -0.5 }}>*/}
      {/*            {topic.name}*/}
      {/*          </Typography>*/}
      {/*          <Typography variant="caption" color="textSecondary">*/}
      {/*            {topic.description}*/}
      {/*          </Typography>*/}
      {/*        </Box>*/}
      {/*      ))}*/}
      {/*    </Box>*/}
      {/*  </Box>*/}
      {/*  <Box sx={styles.stats}>*/}
      {/*    <StatsChart />*/}
      {/*  </Box>*/}
      {/*</Box>*/}
    </Box>
  )
}
