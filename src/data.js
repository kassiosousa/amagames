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

// Jogos e estúdios não ficam aqui: vêm das planilhas em public/jogos e public/estudios
// (geradas em src/games.json e src/studios.json por `npm run games` e `npm run studios`).

export const partners = [
  { name: 'Abragames', image: './partners/abragames.jpg' },
  { name: 'Sebrae Maranhão', image: './partners/sebrae.svg' },
  { name: 'Festival Guarnicê de Cinema', image: './partners/guarnice.png' },
  { name: 'Global Game Jam', image: './partners/ggj.png' },
]

// Diretoria: a ordem abaixo é a ordem exibida na página (lista oficial da associação).
// Foto de cada membro em public/diretoria/ (relação em specs/007-diretoria/research.md).
export const board = [
  {
    group: 'Diretoria',
    members: [
      { name: 'Kassio Sousa', role: 'Diretor Executivo', photo: './diretoria/kassio-sousa.jpg' },
      { name: 'Heitor Dias', role: 'Diretor de Relações Públicas', photo: './diretoria/heitor-dias.jpg' },
      { name: 'Jasmyn Lemos', role: 'Diretora de Comunicação', photo: './diretoria/jasmyn-lemos.jpg' },
      { name: 'Raissa Kaline', role: 'Diretora de Comunicação', photo: './diretoria/raissa.jpg' },
      { name: 'Leonardo Lindoso', role: 'Diretor de Processos', photo: './diretoria/leonardo-lindoso.jpg' },
      { name: 'Rafael Solano', role: 'Diretor de Comunidade', photo: './diretoria/rafael-solano.jpg' },
    ],
  },
  {
    group: 'Diretoria Jr',
    members: [
      { name: 'Osvaldo Neto', role: 'Diretor Jr de Comunidade', photo: './diretoria/osvaldo.jpg' },
      { name: 'Marcos Januário', role: 'Diretor Jr de Comunicação', photo: './diretoria/marcos-januario.jpg' },
      { name: 'Yanne Moraes', role: 'Diretor Jr de Comunidade', photo: './diretoria/yanne.jpg' },
    ],
  },
]

// Os dados do mapeamento (faturamento e indicadores por ano) não ficam aqui: vêm da planilha
// dados/levantamento-mapeamento-ecossistema.xlsx (gerada em src/mapping.json por `npm run mapping`).
