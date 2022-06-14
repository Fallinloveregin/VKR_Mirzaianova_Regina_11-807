import AdminHomeContainer from './Admin/AdminHome.container'
import UserHomeContainer from './User/UserHome.container'
import { useUserRole } from '../../components/organisms/RoleGuard'

export default function HomeContainer() {
  const { isAdmin } = useUserRole()

  if (isAdmin) {
    return <AdminHomeContainer />
  }
  return <UserHomeContainer />
}
