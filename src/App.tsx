import { useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Career from './components/Career'
import Interests from './components/Interests'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <div className="min-h-screen bg-bg text-ink">
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <About />
        <Career />
        <Interests />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
