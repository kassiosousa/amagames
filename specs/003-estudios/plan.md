# Plano 003 — Estúdios

**Spec:** ./spec.md

## Abordagem
Repetir o modelo da spec 002: uma planilha como fonte de verdade, um script que a converte em JSON em tempo de build, cards compartilhados entre a home e a lista, carrossel na home e página `/#/estudios` com filtros e paginação. Para evitar duplicação, extrair o que a 002 já tem (carrossel em grupos de 3/1, controles de paginação, lógica de filtros pela URL) para componentes comuns, em vez de copiar.

Alternativas descartadas: ler o `.xlsx` no navegador (baixa ~1 MB e exige biblioteca no cliente) e manter os estúdios em `src/data.js` (a associação quer editar em planilha).

## Planilha (criada e preenchida pela associação)
Arquivo: `public/estudios/levantamento-estudios-maranhenses.xlsx`, uma aba `Estúdios` (uma linha por estúdio). Colunas (o script lê pelo nome do cabeçalho, então a ordem não importa):

| Coluna | Uso |
|---|---|
| Nome | Título do card; chave para cruzar com os jogos |
| Nomes alternativos | Outros nomes usados na planilha de jogos, separados por `;` (ex.: "OPS Studio; OPS Game Studio") |
| Cidade | Filtro Cidade |
| Ano de fundação | Ordenação e rodapé do card |
| Situação | Ativo / Inativo (filtro) |
| Formalização | Informativo (ex.: "Empresa formalizada", "Equipe não formalizada") |
| Áreas de atuação | Tags e filtro; separadas por `/` |
| Descrição | Resumo do card |
| Site | Link do nome (RF-07) |
| Instagram | Alternativa de link |
| Logo | Caminho local `./estudios/<slug>.<ext>` |
| Origem da imagem | URL de origem da logo (como na planilha de jogos) |
| Destaque | Não usada: o destaque é calculado (RF-01) |
| Fonte dos dados | Notas da pesquisa; não aparece no site |

## Arquitetura e arquivos afetados
| Arquivo | Mudança |
|---|---|
| `scripts/build-studios.mjs` (novo) | Lê a planilha, gera `src/studios.json`; unifica sinônimos de área; conta jogos cruzando com `games.json` por nome e nomes alternativos |
| `package.json` | Script `studios`; incluir em `predev` e `prebuild` (hoje só rodam `games`) |
| `src/studios.json` (gerado) | Não editar à mão |
| `src/components/StudioCard.jsx` (novo) | Substitui `StudioCard` de `ui.jsx` (logo, nome com link, tags, resumo, cidade/ano, nº de jogos) |
| `src/components/StudiosCarousel.jsx` (novo) | Carrossel da home: 6 destaques (RF-01), 3 por vez (1 abaixo de 1024 px), 5 s, pausa com mouse/foco |
| `src/pages/Estudios.jsx` (novo) | Rota `/#/estudios`: filtros, paginação de 10, estado na URL (`?cidade=&area=&situacao=&pagina=`) |
| `src/pages/Home.jsx` | Seção "Estúdios associados" passa a usar `StudiosCarousel` |
| `src/pages/Pages.jsx`, `src/App.jsx` | Remover `ListaEstudios`; rota aponta para `Estudios` |
| `src/pages/Jogos.jsx` | Passar a ler `?estudio=` também por nome de estúdio vindo do card (já existe o parâmetro) |
| `src/data.js` | Remover `studios` escrito à mão |
| Componentes comuns (opcional) | Extrair `useCarouselPages` e `Pagination` de `GamesCarousel.jsx` e `Jogos.jsx` para reutilizar |

## Implementação (decisões)
- `scripts/build-studios.mjs` roda depois do `build-games` (`predev` e `prebuild`). Sem planilha, gera lista vazia e avisa, sem quebrar o build (T-04).
- **Destaque (RF-01):** `featured` = 6 primeiros por jogos publicados na Steam, depois total de jogos, depois ano de fundação mais antigo. A coluna "Destaque" é ignorada.
- **Contagem (RF-08):** conta todos os jogos do estúdio, inclusive os de game jam (Hardcoffee: 6). Nomes compostos ("A / B") contam para os dois. O script grava `gameIds`, e `Jogos.jsx` filtra por eles, então o número do card é igual ao da lista filtrada.
- **Componentes comuns:** `GroupCarousel` (carrossel 3/1 usado por jogos e estúdios), `Pagination` e `FilterSelect` (usados em `Jogos.jsx` e `Estudios.jsx`), `StudioCard`.
- **Lista de jogos:** a opção "Estúdio" mostra "Game Jam", depois os estúdios cadastrados e depois os nomes da planilha de jogos que não pertencem a nenhum estúdio cadastrado.

## Modelo de dados
Por estúdio, `studios.json` guarda: `id, name, aliases[], city, founded, active, formalization, areas[] (tags), summary, site, instagram, link` (site, senão Instagram, senão vazio), `logo, hasLogo`, `featured`, `gamesCount` e `gamesFilter` (nome usado no filtro da lista de jogos). Ordenação: ano de fundação decrescente; sem ano vai para o fim.

## Riscos e dependências
- **Planilha ainda não existe.** Até ela existir, o script precisa falhar com mensagem clara (ou gerar lista vazia) sem quebrar o `build`; definir isso antes de implementar.
- **Nomes divergentes entre planilhas** (hoje "OPS Studio" vs "OPS Game Studio"): resolvido pela coluna "Nomes alternativos"; estúdios com nomes não listados ficam com 0 jogos.
- **Jogos de dois estúdios** (ex.: "Wired Dreams Studio / Statera Studio"): contar para ambos.
- Publicação de logos e dados sem autorização do estúdio.
- Conteúdo incompleto publicado: campos vazios devem esconder o elemento, não mostrar "undefined".

## Verificação
`npm run build` limpo; navegar manualmente CA-01 a CA-09 em `npm run dev`, em 360 px e desktop. Conferir a contagem de jogos de pelo menos dois estúdios contra a planilha de jogos.
