import { useEffect, useState } from 'react'

export type Route = 'home' | 'papers' | 'library'

function readRoute(): Route {
  if (typeof window === 'undefined') return 'home'
  const hash = window.location.hash.replace('#', '')
  if (hash === 'papers') return 'papers'
  if (hash === 'library') return 'library'
  return 'home'
}

export function useHashRoute() {
  const [route, setRoute] = useState<Route>(readRoute)

  useEffect(() => {
    const onHashChange = () => setRoute(readRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return route
}
