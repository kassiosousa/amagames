import { Link } from 'react-router-dom'
import { links } from '../data.js'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <img src="./brand/assinatura.png" alt="AMAGAMES - Associação Maranhense de Desenvolvedores de Jogos Eletrônicos" className="h-40 w-40 object-contain object-left" />
        <ul className="space-y-2 text-sm text-mute">
          <li><Link className="hover:text-ink" to="/diretoria">Diretoria</Link></li>
          <li><Link className="hover:text-ink" to="/estudios">Lista de estúdios</Link></li>
          <li><Link className="hover:text-ink" to="/jogos">Lista de jogos</Link></li>
          <li><Link className="hover:text-ink" to="/projetos">Projetos</Link></li>
          <li><Link className="hover:text-ink" to="/mapeamento">Mapeamento</Link></li>
          <li><Link className="hover:text-ink" to="/imprensa">Imprensa</Link></li>
        </ul>
        <ul className="space-y-2 text-sm text-mute">
          <li><a className="hover:text-ink" href={links.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
          <li><a className="hover:text-ink" href={links.contato}>Contato</a></li>
          <li>São Luís, Maranhão</li>
        </ul>
      </div>
      <p className="border-t border-line py-4 text-center text-xs text-mute">© {new Date().getFullYear()} AMAGAMES</p>
    </footer>
  )
}
