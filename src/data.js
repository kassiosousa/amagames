// Fonte: pesquisa pública (SBGames 2024 - Mapeamento 2023; O Imparcial; Movimento Econômico).
// Itens marcados com `confirmar: true` precisam ser validados/preenchidos pela diretoria.

export const links = {
  instagram: 'https://www.instagram.com/amagamesbr/',
  contato: 'mailto:contato@amagames.com.br',
}

export const slides = [
  { title: 'Global Game Jam São Luís', image: './slides/ggj.png', text: '48 horas para criar um jogo. A AMAGAMES sedia o maior evento de criação de jogos do mundo na capital maranhense.', tone: 'bg-brand-red text-white' },
  { title: 'Escuta Pública Secult', image: './slides/escuta-publica.png', text: 'A AMAGAMES participou da escuta pública realizada pela Secult em outubro, levando contribuições para a política cultural do estado.', tone: 'bg-brand-navy text-white' },
  { title: 'Mostra no Festival Guarnicê', image: '', text: 'Jogos maranhenses competem na mostra do 4º festival de cinema mais antigo do país.', tone: 'bg-brand-yellow text-ink' },
  { title: 'Lunar Axe vence o Brasil Tá Pra Game', image: './slides/btpg.png', text: 'Aventura ambientada no centro histórico de São Luís levou o 1º lugar na Gamescom Cologne 2026.', tone: 'bg-brand-blue text-white' },
]

export const stats = [
  { value: '2013', label: 'ano de fundação' },
  { value: '12', label: 'estúdios no estado (Abragames, 2025)' },
  { value: '23', label: 'devs independentes' },
  { value: '50', label: 'jogos desenvolvidos' },
]

export const about = {
  resumo:
    'A Associação Maranhense de Desenvolvedores de Jogos (AMAGAMES) nasceu em 2013, em São Luís, para unir estúdios e desenvolvedores e ampliar o poder de diálogo com entidades locais e nacionais.',
  historia:
    'Ao longo desses anos, a associação tem investido em ações para capacitar os maranhenses no desenvolvimento de jogos através de eventos, palestras e oficinas que tem realizado com as mais diversas instituições do estado, como IFMA, UFMA, SEBRAE e Governo do Estado do Maranhão.',
  missao:
    'Fortalecer a cena local, incentivar novos talentos e impulsionar a economia criativa do Maranhão por meio do conhecimento e dados',
  pilares: [
    ['Capacitação', 'Oficinas, mentorias e jams para formar novos talentos.'],
    ['Representação', 'Diálogo com poder público, Sebrae, Abragames e outras associações regionais.'],
    ['Dados', 'Mapeamento anual padronizado com as demais associações do país.'],
    ['Diversidade', '64% dos associados: 42% pessoas negras, 25% mulheres, 22% LGBTQIA+.'],
  ],
}

export const studios = [
  { name: 'OPS Studio', city: 'São Luís', since: 2018, focus: 'Jogos autorais, advergames e serious games', note: 'Fundado por Kassio Sousa e Nuninho Neto. Clientes: Sebrae, Vale e SECTI-MA.', games: ['Lunar Axe'] },
  { name: 'Estúdio a confirmar', city: 'São Luís', focus: 'Jogos autorais', confirmar: true },
  { name: 'Estúdio a confirmar', city: 'São Luís', focus: 'Prestação de serviços', confirmar: true },
  { name: 'Estúdio a confirmar', city: 'São José de Ribamar', focus: 'Jogos mobile', confirmar: true },
]

// Os jogos não ficam aqui: vêm da planilha public/jogos/levantamento-jogos-maranhenses.xlsx
// (gerada em src/games.json por `npm run games`).

export const projects = [
  { name: 'Global Game Jam São Luís', kind: 'Evento anual', desc: 'Maratona de 48h sediada pela AMAGAMES há mais de uma década. Edição 2026 no Complexo Trapiche (Parque Tecnológico da Prefeitura).' },
  { name: 'Mapeamento do Ecossistema', kind: 'Pesquisa', desc: 'Levantamento anual de estúdios, faturamento e produção, publicado nos anais da SBGames 2024.' },
  { name: 'Relato Trimestral', kind: 'Transparência', desc: 'Registro periódico das atividades e conquistas da cena maranhense.' },
  { name: 'Missões técnicas (Sebrae-MA)', kind: 'Mercado', desc: 'Apoio para levar jogos indicados e premiados a festivais como o BIG Festival.' },
  { name: 'Mostra de jogos no Guarnicê', kind: 'Cultura', desc: 'Mostra competitiva de jogos maranhenses no Festival Guarnicê de Cinema.' },
  { name: 'MAGE – Maranhão GameDev Event', kind: 'Evento', desc: 'Encontro da comunidade de desenvolvimento de jogos do estado.' },
]

export const partners = [
  { name: 'Abragames', image: './partners/abragames.jpg' },
  { name: 'Sebrae Maranhão', image: './partners/sebrae.svg' },
  { name: 'Festival Guarnicê de Cinema', image: './partners/guarnice.png' },
  { name: 'Global Game Jam', image: './partners/ggj.png' },
]

export const board = [
  { role: 'Presidência', name: 'A confirmar' },
  { role: 'Vice-presidência', name: 'A confirmar' },
  { role: 'Diretoria Executiva / Financeira', name: 'A confirmar' },
  { role: 'Diretoria de Comunicação', name: 'A confirmar' },
  { role: 'Diretoria de Eventos', name: 'A confirmar' },
]

export const faturamento = [
  { year: '2019', value: 110000 },
  { year: '2021', value: 568000 },
  { year: '2022', value: 352600 },
  { year: '2023', value: 435750 },
]

export const mapeamento = [
  ['35', 'respostas (abr/2023–abr/2024)'],
  ['118', 'atores no máximo (sócios, colaboradores, freelancers)'],
  ['65,7%', 'devs individuais'],
  ['28', 'respondentes em São Luís'],
  ['20', 'jogos em produção em 2023'],
  ['70%', 'produzem jogos autorais em 2024'],
]
