import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import useAuthenticated from '../../utils/useAuthenticated'

export default function AuthGuard({ redirectPath = '/login', children }) {
  const authenticated = useAuthenticated()

  if (!authenticated) {
    return <Navigate replace to={redirectPath} />
  }

  return children
}

AuthGuard.propTypes = {
  /** Path to redirect if current user is not Authenticated */
  redirectPath: PropTypes.string,
}
