import React, { useContext, useEffect } from 'react'
import useAxios from 'axios-hooks'

import useAuthToken from '../utils/useAuthToken'

const CurrentUserContext = React.createContext(undefined)

export default function CurrentUserProvider({ children }) {
  const token = useAuthToken()

  const [{ data, error, loading }, fetchMe] = useAxios({ method: 'GET', url: '/user/me' }, { manual: true })

  useEffect(() => {
    if (token) {
      fetchMe()
    }
  }, [fetchMe, token])

  if (!token) {
    return children
  }

  if ((!data && loading) || error) {
    return null
  }

  return <CurrentUserContext.Provider value={data}>{children}</CurrentUserContext.Provider>
}

export const useCurrentUser = () => useContext(CurrentUserContext)
