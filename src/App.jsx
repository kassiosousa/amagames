import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Jogos from './pages/Jogos.jsx'
import { Diretoria, ListaEstudios, Projetos, Mapeamento } from './pages/Pages.jsx'

function ScrollManager() {
  const { pathname, state } = useLocation()
  useEffect(() => {
    const id = state?.scroll
    const el = id && document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo(0, 0)
  }, [pathname, state])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diretoria" element={<Diretoria />} />
          <Route path="/estudios" element={<ListaEstudios />} />
          <Route path="/jogos" element={<Jogos />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/mapeamento" element={<Mapeamento />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
