import useAxios from 'axios-hooks'

import Home, { useAdminHomeFiltering } from './AdminHome'

export default function AdminHomeContainer() {
  const [{ recommendation }] = useAdminHomeFiltering()

  const [{ data }] = useAxios({ url: '/recommendations/list' })

  return <Home recommendations={data} />
}
