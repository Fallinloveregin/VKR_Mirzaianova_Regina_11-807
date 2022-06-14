import useAxios from 'axios-hooks'

import Analytics, { useAnalyticsFiltering } from './Analytics'

export default function AnalyticsContainer() {
  const [{ test }] = useAnalyticsFiltering()

  const [{ data }] = useAxios({ url: '/graphics/analytics', params: { test } })

  return <Analytics data={data} />
}
