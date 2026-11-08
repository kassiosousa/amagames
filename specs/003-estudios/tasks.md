# Tarefas 003 — Estúdios

Formato: `- [x] T-01 descrição (RF-xx, CA-xx)`. Ordem = ordem de execução.

- [x] T-01 Revisar a planilha `public/estudios/levantamento-estudios-maranhenses.xlsx` (RF-06)
- [x] T-02 Script `scripts/build-studios.mjs`: planilha → `src/studios.json`; sinônimos de área; link (site, senão Instagram); ordenação por ano de fundação (RF-04, RF-05, RF-06, RF-07)
- [x] T-03 No script, contar jogos por estúdio cruzando com `src/games.json` (nome + nomes alternativos; jogos de dois estúdios contam para ambos) (RF-08, CA-08)
- [x] T-04 Tratar planilha ausente ou vazia sem quebrar `dev`/`build` (RF-06)
- [x] T-05 `package.json`: script `studios` e inclusão em `predev` e `prebuild` (RF-06)
- [x] T-06 `StudioCard.jsx`: logo (ou marca AMAGAMES), nome com link, tags, resumo, cidade/ano, nº de jogos com link para `/#/jogos?estudio=` (RF-02, RF-07, RF-08, CA-02, CA-07)
- [x] T-07 Extrair lógica compartilhada do carrossel (3 por vez / 1 em telas pequenas) em `GroupCarousel.jsx` (RNF-02)
- [x] T-08 `StudiosCarousel.jsx` na home com os 6 destaques, 5 s, pausa com mouse/foco, setas e indicadores (RF-01, RNF-01, RNF-02, CA-01, CA-03, CA-09)
- [x] T-09 Link "Lista de estúdios" no canto superior direito da seção da home (RF-03, CA-04)
- [x] T-10 Extrair a paginação de `Jogos.jsx` para `Pagination.jsx` (e o filtro para `FilterSelect.jsx`) (RF-04)
- [x] T-11 `Estudios.jsx` em `/#/estudios`: filtros Cidade, Área de atuação e Situação, paginação de 10, estado na URL, "Limpar filtros" (RF-04, RF-05, CA-05, CA-06)
- [x] T-12 `Jogos.jsx` filtra por `?estudio=` usando os jogos associados ao estúdio (nomes alternativos e parcerias incluídos) (RF-08, CA-08)
- [x] T-13 Remover `studios` de `src/data.js`, `ListaEstudios` de `Pages.jsx` e o `StudioCard` antigo de `ui.jsx` (RF-06)
- [x] T-14 Atualizar `README.md` e `CLAUDE.md` (comando `npm run studios`, planilha de estúdios) e marcar T-12 da spec 001 como resolvida
- [x] T-15 Build limpo e verificação em 1280 px e 360 px (CA-01 a CA-09). Verificado: lista, filtros, contagens e links dos cards; o carrossel da home foi conferido com 1 card por vez (painel estreito), não com 3 por vez
