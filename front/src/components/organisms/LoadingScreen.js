import { useEffect } from 'react'
import NProgress from 'nprogress'

export default function LoadingScreen() {
  useEffect(() => {
    NProgress.start()

    return () => {
      NProgress.done()
    }
  }, [])

  return null
}
