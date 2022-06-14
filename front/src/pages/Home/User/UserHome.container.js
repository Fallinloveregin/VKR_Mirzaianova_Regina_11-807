import { useMemo } from 'react'
import useAxios from 'axios-hooks'

import Home from './UserHome'

export default function UserHomeContainer() {
  const [{ data, loading }] = useAxios({
    method: 'GET',
    url: '/test/overview',
  })

  const [{ data: recommendations }] = useAxios({ url: '/recommendations/user' })

  const overview = useMemo(() => {
    return (data || []).reduce((obj, cur) => ({ ...obj, [cur.name]: cur.result }), {})
  }, [data])

  return <Home loading={loading} overview={overview} recommendations={recommendations} />
}
