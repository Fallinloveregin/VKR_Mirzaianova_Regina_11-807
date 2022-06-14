import { useNavigate } from 'react-router-dom'
import useAxios from 'axios-hooks'

import Registration from './Registration'

export default function RegistrationContainer() {
  const navigate = useNavigate()

  const [{ error }, signup] = useAxios(
    {
      method: 'POST',
      url: '/auth/signup',
    },
    { manual: true }
  )

  const handleSubmit = ({ username, name, group, sex, birth, password }) => {
    return signup({ data: { username, name, group, sex, birth, password } }).then(() => navigate('/login'))
  }

  return <Registration onSubmit={handleSubmit} submitError={error?.response?.data?.message} />
}
