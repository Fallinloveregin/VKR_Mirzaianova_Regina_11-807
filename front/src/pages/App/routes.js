import React, { lazy, Suspense } from 'react'

import LoadingScreen from '../../components/organisms/LoadingScreen'
import Layout from '../../components/organisms/Layout'
import AuthGuard from '../../components/organisms/AuthGuard'
import GuestGuard from '../../components/organisms/GuestGuard'
import RoleGuard from '../../components/organisms/RoleGuard'

const Loadable = Component => props => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )
}

const Data = Loadable(lazy(() => import('../Data/DataContainer')))
const Home = Loadable(lazy(() => import('../Home/HomeContainer')))
const Survey = Loadable(lazy(() => import('../Survey/SurveyContainer')))
const Login = Loadable(lazy(() => import('../Authorization/Login/LoginContainer')))
const Registration = Loadable(lazy(() => import('../Authorization/Registration/RegistrationContainer')))
const Graphics = Loadable(lazy(() => import('../Graphics/Graphics')))
const Analytics = Loadable(lazy(() => import('../Analytics/AnalyticsContainer')))
const Recommendations = Loadable(lazy(() => import('../Recommendations/RecommendationsContainer')))

const routes = [
  {
    path: '/',
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'survey/:test',
        element: (
          <RoleGuard onlyUser redirect>
            <Survey />
          </RoleGuard>
        ),
      },
      {
        path: 'graphics',
        element: (
          <RoleGuard onlyAdmin redirect>
            <Graphics />
          </RoleGuard>
        ),
      },
      {
        path: 'analytics',
        element: (
          <RoleGuard onlyAdmin redirect>
            <Analytics />
          </RoleGuard>
        ),
      },
      {
        path: 'recommendations',
        element: (
          <RoleGuard onlyAdmin redirect>
            <Recommendations />
          </RoleGuard>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
  {
    path: '/registration',
    element: (
      <GuestGuard>
        <Registration />
      </GuestGuard>
    ),
  },
  {
    path: '/data',
    element: <Data />,
  },
]

export default routes
