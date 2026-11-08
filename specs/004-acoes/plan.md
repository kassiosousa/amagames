# Plano 004 — Projetos e ações

**Spec:** ./spec.md

## Abordagem
Repetir o modelo das specs 002 e 003: planilha como fonte de verdade, script que a converte em JSON em tempo de build, um card compartilhado entre a home e a página `/#/projetos`. Os ícones são arquivos SVG locais referenciados pela planilha, no lugar do traço colorido atual.

Alternativas descartadas: manter `projects` em `src/data.js` (a associação quer editar em planilha) e embutir os SVG no código com uma biblioteca de ícones (ícones sob medida, um por ação, ficam melhor como arquivos editáveis).

## Planilha (criada)
Arquivo: `public/acoes/levantamento-acoes-realizadas-com-edicoes.xlsx` (nome oficial definido pela associação em 2026-11-06). Tem duas abas: **`Ações`** (uma linha por ação; é a única lida pelo script, que a localiza pelo nome) e **`Edições`** (30 edições de eventos e ações, ainda sem uso no site). O script lê as colunas pelo nome do cabeçalho.

| Coluna | Uso |
|---|---|
| Ordem | Ordenação na home e na página (menor primeiro) |
| Nome | Título do card |
| Tipo | Rótulo acima do título (ex.: "Evento anual") |
| Descrição | Texto do card |
| Link | Opcional: `/rota` interna ou `https://...` externo (RF-07) |
| Ícone | Caminho local `./acoes/<slug>.svg` |
| Origem do ícone | Como o ícone foi obtido (hoje: "gerado para o projeto") |
| Fonte dos dados | Notas da pesquisa; não aparece no site |

## Ícones (criados)
Em `public/acoes/`, SVG 64×64, traço preto de 3 px com pontas arredondadas e um toque de cor:

| Ação | Arquivo | Desenho |
|---|---|---|
| Global Game Jam São Luís | `global-game-jam-sao-luis.svg` | Controle de videogame com relógio (48 h) — vermelho |
| Mapeamento do Ecossistema | `mapeamento-do-ecossistema.svg` | Marcador de mapa sobre gráfico de barras — amarelo |
| Relato Trimestral | `relato-trimestral.svg` | Relatório com gráfico de um quarto — azul |
| Missões técnicas (Sebrae-MA) | `missoes-tecnicas.svg` | Avião de papel (viagem a festivais) — azul escuro |
| Mostra de jogos no Guarnicê | `mostra-de-jogos-guarnice.svg` | Claquete de cinema com play — vermelho |
| MAGE – Maranhão GameDev Event | `mage-maranhao-gamedev-event.svg` | Grupo de pessoas em encontro — amarelo |
| (qualquer ação sem ícone) | `generico.svg` | Estrela — azul escuro |

## v2: lista paginada de ações e eventos (2026-11-07)
A página `/#/projetos` passa a listar as **edições** da aba "Edições" (30 linhas), 12 por página, mais recentes primeiro. A home segue com os 6 cards de `actions.json`.

- **Dados:** `build-actions.mjs` também lê a aba **Edições** (pelo nome) e gera `src/editions.json`: `{ id, action, name, edition, year, date, place, description, partners, link, external, source, sourceUrl, status, icon, label, kind }`. O **ícone** vem da ação vinculada (casamento do nome da coluna "Ação vinculada" com o nome na aba Ações, sem acento nem caixa); sem vínculo, `./acoes/generico.svg`. O **rótulo** é o nome da ação vinculada ou "Evento". Ordem: ano decrescente; no mesmo ano, a ordem da planilha; sem ano, no fim.
- **Componentes:** `EditionCard.jsx` (novo) mostra ícone, rótulo, nome (link opcional), edição, ano e data, local, descrição, parceiros e fonte, e a etiqueta "Dado a confirmar" quando a situação for "A confirmar". `Projetos.jsx` passa a ler `editions.json`, mostra o total e usa `Pagination.jsx` com `?pagina=`.
- **Filtros Tipo de ação e Ano** (`FilterSelect.jsx`, `useSearchParams`: `?tipo=&ano=&pagina=`); o tipo vem da coluna "Tipo" da ação vinculada ("Evento" quando não há vínculo). Mudar um filtro volta para a página 1. **Sem busca por texto.**
- **Data e local ocultos por enquanto** (só o ano aparece): constante `SHOW_DATE_AND_PLACE = false` em `EditionCard.jsx`; os campos seguem em `editions.json`.
- **Descrição pública:** o script tira da coluna "Descrição" as frases de anotação de pesquisa (as que dizem "não foram encontrados", "deduzida", "a matéria só cita" etc.), que ficam só na planilha. Datas e locais escritos dentro do texto da descrição **não** são removidos automaticamente: para a regra "só o ano" valer também ali, o texto deve ser ajustado na planilha.
- **Etiqueta "Dado a confirmar"** para situação "Parcial" ou "A confirmar". `ActionCard.jsx` e `actions.json` continuam só na home.
- **Links internos** da coluna Link (ex.: `/mapeamento?ano=2023`) usam `Link` do React Router; externos abrem em nova aba.

## Arquitetura e arquivos afetados
| Arquivo | Mudança |
|---|---|
| `scripts/build-actions.mjs` (novo) | Lê a planilha e gera `src/actions.json` (ordenado por Ordem); campos vazios viram texto vazio; sem planilha, lista vazia e aviso, sem quebrar o build |
| `package.json` | Script `actions`; incluir em `predev` e `prebuild` |
| `src/actions.json` (gerado) | Não editar à mão |
| `src/components/EditionCard.jsx` (novo, v2) | Card da lista de Projetos: ícone da ação vinculada ou genérico, rótulo, nome com link opcional, edição, ano e data, local, descrição, parceiros, fonte e etiqueta "Dado a confirmar" |
| `src/editions.json` (gerado, v2) | Não editar à mão |
| `src/components/ActionCard.jsx` (novo) | Substitui `ProjectCard` de `ui.jsx`: ícone, tipo, nome (link opcional), descrição; ícone padrão `./acoes/generico.svg` |
| `src/pages/Home.jsx` | Seção `acoes` lê de `actions.json` (primeiras 6) |
| `src/pages/Projetos.jsx` | **v2:** lê de `editions.json`, mostra o total e a lista paginada (12 por página) com `EditionCard`; na v1 lia `actions.json`. (Antes: `src/pages/Pages.jsx`) |
| `src/pages/Pages.jsx` | (v1, histórico) `Projetos` lia de `actions.json` e usava `ActionCard`; paginação de 12 só quando houver mais de 12 ações (reaproveitar `Pagination.jsx`) |
| `src/data.js` | Remover `projects` |
| `src/components/ui.jsx` | Remover `ProjectCard` |
| `README.md`, `CLAUDE.md` | Novo comando `npm run actions` e a planilha de ações |

## Modelo de dados
Por ação, `actions.json` guarda: `id, order, name, kind, description, link, external` (true se o link começa com `http`), `icon` (caminho, ou o genérico se vazio) e `hasIcon`. Ordenação por `order`; empate pela ordem das linhas.

## Riscos e dependências
- **v2, qualidade dos dados:** a aba Edições tem 12 itens "Parcial" e 5 "A confirmar"; a lista mostra a etiqueta só nos "A confirmar" e esconde campos vazios, mas conteúdo incompleto aparece em produção até a associação revisar.
- **v2, casamento de nomes:** o vínculo com a ação usa o texto da coluna "Ação vinculada"; erro de digitação faz o item cair no ícone genérico e no rótulo "Evento".
- **v2, ordem no mesmo ano:** vale a ordem da planilha (agrupada por ação), não a data; datas em texto livre ("30/01 a 01/02/2026") não são ordenáveis.
- **Texto da lista inicial** veio do site atual e das fontes citadas; o texto "há mais de uma década" da Global Game Jam foi confirmado pela associação (primeira edição em São Luís em 2012; fundação na edição de 2013).
- **Ícones** gerados para o projeto e **aprovados** pela associação.
- **Links ausentes**: o card sem link é só informativo; adicionar os links quando existirem.
- **Home com limite de 6**: se a planilha crescer, as demais ações só aparecem em `/#/projetos`.

## Verificação
`npm run build` limpo; navegar manualmente CA-01 a CA-09 em `npm run dev`, em 360 px e desktop. Conferir cada ícone no card correspondente e o link interno do Mapeamento.
