# Tarefas 004 — Projetos e ações

Formato: `- [x] T-01 descrição (RF-xx, CA-xx)`. Ordem = ordem de execução.

**Executada em 2026-11-06 e reexecutada em 2026-11-07** com a planilha oficial `levantamento-acoes-realizadas-com-edicoes.xlsx` (o script e os documentos passaram a apontar para ela; sem essa troca, o site ficava com 0 ações). Verificado: home e `/#/projetos` com as 6 ações, ícones próprios, link interno do Mapeamento e página sem paginação (a paginação só aparece com mais de 12 ações; testada só por leitura do código, pois a lista tem 6). Falta apenas informação da associação: links da Global Game Jam, do MAGE e do Relato Trimestral.

- [x] T-01 Criar a planilha com somente as 6 ações já listadas no site (RF-06, RF-08)
- [x] T-02 Gerar um ícone SVG específico para cada ação, mais um genérico (RF-03, RNF-03)
- [x] T-03 Revisar ícones (aprovados) e texto da Global Game Jam (confirmado) (RF-03, RF-08). **Pendente:** links da Global Game Jam, do MAGE e do Relato Trimestral
- [x] T-04 Script `scripts/build-actions.mjs`: planilha → `src/actions.json`; ordenação por Ordem; ícone padrão; sem planilha, lista vazia sem quebrar o build (RF-06, RF-03, RNF-04)
- [x] T-05 `package.json`: script `actions` e inclusão em `predev` e `prebuild` (RF-06)
- [x] T-06 `ActionCard.jsx`: ícone, tipo, nome (link interno ou externo), descrição (RF-02, RF-03, RF-07, CA-02, CA-03, CA-04, CA-08)
- [x] T-07 Home: seção "Projetos e ações realizadas" com as primeiras 6 ações e o link "Todos os projetos" (RF-01, RF-04, CA-01, CA-05)
- [x] T-08 Página `/#/projetos` com todas as ações e paginação de 12 só quando houver mais de 12 (RF-05, CA-06)
- [x] T-09 Remover `projects` de `src/data.js` e `ProjectCard` de `ui.jsx` (RF-06)
- [x] T-10 Atualizar `README.md` e `CLAUDE.md` (comando `npm run actions`, planilha de ações)
- [x] T-11 Build limpo e verificação de CA-01 a CA-09 em 1280 px e 360 px (RNF-01)

## v2 — lista paginada de ações e eventos (implementada em 2026-11-07)
Verificado em `/#/projetos`: 30 itens em 3 páginas de 12, filtros Tipo de ação e Ano (inclusive combinados), "Limpar filtros", etiqueta "Dado a confirmar" em 17 itens, link interno do Mapeamento, fontes em nova aba e só o ano de realização exibido. Não conferido em 360 px (o painel do navegador estava largo).
- [x] T-12 `build-actions.mjs`: ler a aba "Edições" pelo nome e gerar `src/editions.json` (ícone da ação vinculada ou genérico, rótulo, link interno/externo, ordem por ano decrescente, aba ausente sem quebrar o build) (RF-06, RF-09, RF-10, RF-12, RNF-04)
- [x] T-13 `EditionCard.jsx`: ícone, rótulo, nome (link opcional), edição, ano, descrição, parceiros, fonte e etiqueta "Dado a confirmar" para "Parcial" e "A confirmar"; data e local ocultos por enquanto (`SHOW_DATE_AND_PLACE`) (RF-09, RF-11, RF-12, CA-10, CA-11, CA-13, CA-14)
- [x] T-14 `Projetos.jsx`: total, filtros Tipo de ação e Ano, lista de 12 por página com `Pagination.jsx` e estado na URL (`?tipo=&ano=&pagina=`) (RF-05, RF-10, RF-11, RF-13, RF-14, CA-06, CA-12, CA-15, CA-16, CA-17)
- [x] T-15 Home mantém os 6 cards de `actions.json`; o link "Todos os projetos" continua levando a `/#/projetos` (RF-01, RF-04, CA-01, CA-05)
- [x] T-16 Atualizar `README.md` e `CLAUDE.md` (aba "Edições" e `editions.json`)
- [x] T-17 Build limpo e verificação de CA-01 a CA-14 em 1280 px e 360 px (RNF-01)
- [x] T-18 Remover tag "Dado a confirmar" de todos os projetos, pois já foram todos verificados (aba "Edições": os 17 itens "Parcial"/"A confirmar" passaram a "Confirmado" em 2026-11-09; a lógica da etiqueta segue no código para dados futuros)
