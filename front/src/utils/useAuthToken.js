import { useEffect, useState } from 'react'
import AuthUtils from './AuthUtils'

export default function useAuthToken() {
  const [token, setAuthToken] = useState(AuthUtils.getAuthToken())

  useEffect(() => {
    const sub = AuthUtils.onTokenChange(setAuthToken)

    return () => {
      sub.unsubscribe()
    }
  }, [])

  return token
}
