import { useMemo } from 'react'
import { Box } from '@mui/material'

import Survey from '../../components/organisms/Survey'
import { SurveysEnum } from '../../surveys/surveys'

export default function SurveyPage({ test, onSubmit }) {
  const survey = useMemo(() => SurveysEnum[test], [test])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Survey key={test} data={survey} onSubmit={onSubmit} />
    </Box>
  )
}
