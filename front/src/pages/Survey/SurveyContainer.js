import useAxios from 'axios-hooks'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'

import Survey from './Survey'

export default function SurveyContainer() {
  const { test } = useParams()

  const [{}, sendResult] = useAxios(
    {
      method: 'POST',
      url: '/test/result',
    },
    { manual: true }
  )

  const handleSubmit = ({ duration, result }) => {
    return sendResult({
      data: {
        result,
        duration,
        dateTime: dayjs(),
        name: test,
      },
    })
  }

  return <Survey test={test} onSubmit={handleSubmit} />
}
