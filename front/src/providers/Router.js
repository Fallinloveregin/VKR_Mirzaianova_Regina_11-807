import React from 'react'
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'

import { useMemo } from 'react'

export default function Router({ children }) {
  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={RouteAdapter}>{children}</QueryParamProvider>
    </BrowserRouter>
  )
}

/**
 * Adapter for react-router v6 Router
 *
 * @see: https://github.com/pbeshai/use-query-params/issues/108
 */
function RouteAdapter({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const adaptedHistory = useMemo(
    () => ({
      replace(location) {
        navigate(location, { replace: true, state: location.state })
      },
      push(location) {
        navigate(location, { replace: false, state: location.state })
      },
    }),
    [navigate]
  )
  return children({ history: adaptedHistory, location })
}
