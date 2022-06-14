import { useMemo } from 'react'
import { Navigate } from 'react-router-dom'

import { useCurrentUser } from '../../providers/CurrentUserProvider'

export default function RoleGuard({ redirect = false, onlyAdmin = false, onlyUser = false, children }) {
  const { isAdmin, notAdmin } = useUserRole()

  const hasAccess = (onlyAdmin && isAdmin) || (onlyUser && notAdmin)

  if (hasAccess) return children

  if (redirect) {
    return <Navigate replace to="/" />
  }
  return null
}

export function useUserRole() {
  const user = useCurrentUser()

  return useMemo(() => {
    if (!user) return { isAdmin: false, notAdmin: false }

    const isAdmin = user.roles.includes('ROLE_ADMIN')

    return { isAdmin, notAdmin: !isAdmin }
  }, [user])
}
