import { createRoot } from 'react-dom/client'
import Axios from 'axios'
import { configure } from 'axios-hooks'

import AuthUtils from './utils/AuthUtils'
import App from './pages/App/App'

const axios = Axios.create({
  baseURL: `${process.env.REACT_APP_BE_URI}/api`,
})

axios.interceptors.request.use(
  async config => {
    const token = AuthUtils.getAuthToken()

    if (token) {
      config.headers = {
        'x-access-token': token,
      }
    }
    return config
  },
  error => Promise.reject(error)
)

configure({ axios, defaultOptions: { useCache: false } })

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
