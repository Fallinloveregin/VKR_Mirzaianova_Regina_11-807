import useAxios from 'axios-hooks'

import Recommendations from './Recommendations'

export default function RecommendationsContainer() {
  const [{ data }, refetch] = useAxios({ url: '/recommendations/list' })

  const [{}, add] = useAxios({ method: 'POST', url: '/recommendations/add' }, { manual: true })
  const [{}, edit] = useAxios({ method: 'POST', url: '/recommendations/edit' }, { manual: true })
  const [{}, remove] = useAxios({ method: 'POST', url: '/recommendations/remove' }, { manual: true })

  const handleAdd = ({ name, value }) => add({ data: { name, value } }).then(() => refetch())
  const handleEdit = ({ id, name, value }) => edit({ data: { id, name, value } }).then(() => refetch())
  const handleRemove = id => remove({ data: { id } }).then(() => refetch())

  return <Recommendations data={data} onAdd={handleAdd} onRemove={handleRemove} onEdit={handleEdit} />
}
