import useAxios from 'axios-hooks'

import { AverageGraph, useGraphFiltering } from './AverageGraph'

export default function AverageGraphContainer() {
  const [{ sex, tests, groups, users }] = useGraphFiltering()

  const [{ data: allGroups }] = useAxios({ url: '/util/groups' })
  const [{ data: allUsers }] = useAxios({ url: '/util/users', params: { groups, sex } })
  const [{ data }] = useAxios({ url: '/graphics/average', params: { sex, tests, groups, users } })

  return <AverageGraph data={data} groups={allGroups} users={allUsers} />
}
