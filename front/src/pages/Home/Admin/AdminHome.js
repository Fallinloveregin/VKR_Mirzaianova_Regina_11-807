import { Box } from '@mui/material'
import { StringParam } from 'use-query-params'

import useFiltering from '../../../utils/useFiltering'
import Select from '../../../components/atoms/Select'

export const useAdminHomeFiltering = () => {
  return useFiltering({
    params: {
      recommendation: StringParam,
    },
  })
}

export default function AdminHome({ recommendations = [] }) {
  const [{ recommendation }, updateFilters] = useAdminHomeFiltering()

  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ width: '300px' }}>
        <Select
          label="Рекомендация"
          value={recommendation}
          onChange={recommendation => updateFilters({ recommendation })}
          options={recommendations.map(({ _id, name }) => ({ value: _id, label: name }))}
        />
      </Box>
    </Box>
  )
}
