import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import useAuthenticated from '../../utils/useAuthenticated'

export default function GuestGuard({ redirectPath = '/', children }) {
  const authenticated = useAuthenticated()

  if (authenticated) {
    return <Navigate replace to={redirectPath} />
  }

  return children
}

GuestGuard.propTypes = {
  /** Path to redirect if current user Authenticated */
  redirectPath: PropTypes.string,
}
