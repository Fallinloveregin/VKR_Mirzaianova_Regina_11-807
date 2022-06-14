import { useCallback } from 'react'
import { useQueryParams } from 'use-query-params'

export default function useFiltering({ params, updateType = 'replaceIn' }) {
  const [queryParams, updateQueryParams] = useQueryParams(params)

  const handleUpdate = useCallback(
    (changes, updateTypeOverride = updateType) => {
      return updateQueryParams(changes, updateTypeOverride)
    },
    [updateQueryParams, updateType]
  )

  return [queryParams, handleUpdate]
}
