import { useNavigate } from 'react-router-dom'
import useAxios from 'axios-hooks'

import Login from './Login'
import AuthUtils from '../../../utils/AuthUtils'

export default function LoginContainer() {
  const navigate = useNavigate()

  const [{ error }, signin] = useAxios(
    {
      method: 'POST',
      url: '/auth/signin',
    },
    { manual: true }
  )

  const handleSubmit = ({ username, password }) => {
    return signin({ data: { username, password } }).then(response => {
      AuthUtils.setAuthToken(response.data.accessToken)
      navigate('/')
    })
  }

  return <Login onSubmit={handleSubmit} submitError={error?.response?.data?.message} />
}
