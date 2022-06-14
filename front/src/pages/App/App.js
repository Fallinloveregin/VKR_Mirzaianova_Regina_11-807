import { useRoutes } from 'react-router'

import { withProviders } from './ComposeProviders'
import routes from './routes'

function App() {
  return useRoutes(routes)
}

export default withProviders(App)
