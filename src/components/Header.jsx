import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

const sections = [
  ['quem-somos', 'Início'],
  ['estudios', 'Estúdios'],
  ['jogos', 'Jogos'],
  ['acoes', 'Ações'],
  ['parceiros', 'Parceiros'],
]

const pages = [
  ['/diretoria', 'Diretoria'],
  ['/projetos', 'Projetos'],
  ['/mapeamento', 'Mapeamento'],
  ['/imprensa', 'Imprensa'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const goSection = (id) => {
    setOpen(false)
    if (pathname === '/') document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    else navigate('/', { state: { scroll: id } })
  }

  const pageCls = ({ isActive }) =>
    `border-b-2 py-1 text-sm transition ${isActive ? 'border-brand-red font-medium' : 'border-transparent text-mute hover:text-ink'}`

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)} aria-label="AMAGAMES - início">
          <img src="./brand/simbolo.webp" alt="" className="h-9 w-auto" />
          <span className="font-display text-lg font-black tracking-tight">AMAGAMES</span>
        </Link>
        <button
          className="border border-line px-3 py-1 text-sm lg:hidden"
          aria-expanded={open}
          aria-label="Abrir menu"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Fechar' : 'Menu'}
        </button>
        <nav className={`${open ? 'flex' : 'hidden'} absolute inset-x-0 top-full flex-col gap-3 border-b border-line bg-paper p-4 lg:static lg:flex lg:flex-row lg:items-center lg:gap-5 lg:border-0 lg:bg-transparent lg:p-0`}>
          {sections.map(([id, label]) => (
            <button key={id} onClick={() => goSection(id)} className="text-left text-sm text-mute hover:text-ink">
              {label}
            </button>
          ))}
          <span className="hidden h-4 w-px bg-line lg:block" />
          {pages.map(([to, label]) => (
            <NavLink key={to} to={to} className={pageCls} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex h-1" aria-hidden="true">
        <span className="flex-1 bg-brand-red" /><span className="flex-1 bg-brand-yellow" /><span className="flex-1 bg-brand-blue" /><span className="flex-1 bg-brand-navy" />
      </div>
    </header>
  )
}
