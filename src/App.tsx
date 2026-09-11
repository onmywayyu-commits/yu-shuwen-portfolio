import { useTheme } from './hooks/useTheme'
import { useHashRoute } from './hooks/useHashRoute'
import { useLibraryData } from './hooks/useLibraryData'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import LibraryPage from './pages/LibraryPage'
import PapersSection from './components/PapersSection'

export default function App() {
  const { theme, toggle } = useTheme()
  const route = useHashRoute()
  const library = useLibraryData()

  return (
    <div className="min-h-screen bg-bg text-ink">
      <Navbar theme={theme} onToggleTheme={toggle} />
      {route === 'home' && <HomePage {...library} />}
      {route === 'papers' && <PapersSection />}
      {route === 'library' && <LibraryPage {...library} />}
      <Footer />
    </div>
  )
}
