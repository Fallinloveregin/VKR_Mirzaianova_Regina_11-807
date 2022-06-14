import useAxios from 'axios-hooks'

import { AverageGraph, useGraphFiltering } from './AverageGraph'
import { useCurrentUser } from '../../../providers/CurrentUserProvider'

export default function AverageGraphContainer() {
  const [{ tests }] = useGraphFiltering()
  const user = useCurrentUser()

  const [{ data }] = useAxios({ url: '/graphics/average', params: { tests, users: [user.id] } })

  return <AverageGraph data={data} />
}
