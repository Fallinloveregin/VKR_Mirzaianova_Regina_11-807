import { useEffect, useState } from 'react'

import AuthUtils from './AuthUtils'

export default function useAuthenticated() {
  const [authenticated, setAuthenticated] = useState(AuthUtils.isAuthenticated())

  useEffect(() => {
    const sub = AuthUtils.onTokenChange(() => {
      setAuthenticated(AuthUtils.isAuthenticated())
    })

    return () => {
      sub.unsubscribe()
    }
  }, [])

  return authenticated
}
