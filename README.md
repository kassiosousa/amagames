# AMAGAMES — site institucional

Site da **AMAGAMES, Associação Maranhense de Desenvolvedores de Jogos Eletrônicos** (São Luís, MA, fundada em 2013). É a vitrine pública da associação e da cena de jogos do Maranhão.

## Para que serve

A associação reúne estúdios e desenvolvedores para ter mais voz junto a entidades locais e nacionais, formar novos talentos (Global Game Jam, oficinas, mentorias) e acompanhar o crescimento do setor com um mapeamento anual. O site existe para:

- **Apresentar a AMAGAMES** (quem somos, missão, diretoria) a desenvolvedores, estudantes, poder público, Sebrae, empresas e imprensa;
- **Dar visibilidade aos estúdios e jogos maranhenses**, com busca por ano, estilo e estúdio;
- **Mostrar projetos e ações realizadas** e os parceiros;
- **Publicar os dados do ecossistema** (mapeamento anual: faturamento, produção, editais, eventos, perfil e diversidade; edição mais recente em destaque e os anos anteriores numa aba lateral).

A estrutura das seções segue o padrão de outras associações regionais de jogos (Abragames, ADJogosRS, Ascende, ACJogos-AL, BIND): identidade e objetivos, depois associados, ações e parceiros; diretoria e dados em páginas próprias. A pesquisa está em [`specs/001-site-institucional/research.md`](specs/001-site-institucional/research.md).

## O que tem no site

**Página inicial:** cabeçalho, carrossel de destaques, Quem somos, Estúdios associados (carrossel dos 6 estúdios em destaque), Jogos da comunidade (carrossel dos 9 jogos mais recentes publicados na Steam), Projetos e ações (cards com ícone próprio), Parceiros e rodapé.

**Páginas:** Diretoria (cartões com foto, nome e função, em Diretoria e Diretoria Jr), Lista de estúdios (10 por página, com filtros de cidade, área de atuação e situação), Lista de jogos (todos os jogos, 10 por página, com filtros), Projetos (lista paginada de ações e eventos, com filtros por tipo de ação e ano) e Mapeamento (detalhes por ano, gráfico de faturamento e link para o infográfico em PDF) e Imprensa (matérias e notícias sobre a AMAGAMES e os jogos do Maranhão, com filtros por tema e ano).

## Tecnologia

| Camada | Escolha |
|---|---|
| Interface | React 19 |
| Build e dev server | Vite |
| Estilo | Tailwind CSS v4, com a paleta e as fontes do Manual de Identidade Visual (Raleway nos títulos, Roboto no texto) |
| Rotas | react-router-dom com `HashRouter` (as URLs têm `#`, ex.: `/#/jogos`) |
| Dados dos jogos | Planilha `.xlsx` lida por script com `exceljs` |
| Lint | oxlint |

É um site **estático**: sem backend nem banco de dados. O resultado de `npm run build` (pasta `dist/`) funciona em qualquer hospedagem de arquivos, sem configuração de servidor. O `HashRouter` e o `base: './'` do Vite garantem isso.

## Como rodar

Requer Node.js.

```bash
npm install
```

```bash
npm run dev
```

O site abre em http://localhost:5173.

```bash
npm run build
```

Gera o site pronto para publicar em `dist/`. Para testar esse resultado localmente: `npm run preview`.

## Como atualizar o conteúdo

- **Textos, parceiros, diretoria, destaques do carrossel e números:** edite [`src/data.js`](src/data.js). Dado desconhecido deve ficar marcado como "A confirmar", nunca inventado.
- **Jogos:** a fonte de verdade é a planilha [`dados/levantamento-jogos-maranhenses.xlsx`](dados/levantamento-jogos-maranhenses.xlsx) (uma aba por ano). Depois de editá-la, rode `npm run games`, ou reinicie o `npm run dev`; o `build` já faz isso sozinho. Isso gera `src/games.json`, que **não deve ser editado à mão**. As capas dos jogos ficam em `public/jogos/`.
- **Estúdios:** a fonte de verdade é a planilha [`dados/levantamento-estudios-maranhenses.xlsx`](dados/levantamento-estudios-maranhenses.xlsx) (uma linha por estúdio; o script lê as colunas pelo nome do cabeçalho). Depois de editá-la, rode `npm run studios` (ou reinicie o `dev`). Isso gera `src/studios.json`, que **não deve ser editado à mão**, e cruza os estúdios com os jogos para contar quantos jogos cada um tem. O destaque da home é calculado: mais jogos publicados na Steam, depois mais jogos no total, depois o estúdio mais antigo. As logos ficam em `public/estudios/`.
- **Projetos e ações:** a fonte de verdade é a planilha [`dados/levantamento-acoes-realizadas-com-edicoes.xlsx`](dados/levantamento-acoes-realizadas-com-edicoes.xlsx) (colunas Ordem, Nome, Tipo, Descrição, Link, Ícone). Depois de editá-la, rode `npm run actions` (ou reinicie o `dev`). Isso gera `src/actions.json` (cards da home) e `src/editions.json`, que **não devem ser editados à mão**. A aba **Edições** da mesma planilha (uma linha por edição de evento ou ação: ação vinculada, edição, ano, data, local, descrição, parceiros, fonte e situação do dado) alimenta a lista paginada da página Projetos; por enquanto só o ano de realização é exibido (data e local ficam escondidos até a associação completar os dados) e itens "Parcial" ou "A confirmar" levam a etiqueta "Dado a confirmar". Cada ação usa o ícone SVG indicado na coluna "Ícone" (arquivos em `public/acoes/`); sem ícone, aparece o genérico. O link pode ser interno (`/mapeamento`) ou externo (`https://...`).
- **Mapeamento:** a fonte de verdade é a planilha [`dados/levantamento-mapeamento-ecossistema.xlsx`](dados/levantamento-mapeamento-ecossistema.xlsx), com as abas Faturamento, Indicadores (uma linha por indicador e ano) e Fontes (PDF do infográfico, créditos e artigo). Para um novo mapeamento, acrescente o PDF em `public/mapeamento/` e as linhas na planilha, e rode `npm run mapping` (ou reinicie o `dev`); o ano mais recente passa a abrir a página sozinho. Isso gera `src/mapping.json`, que **não deve ser editado à mão**.
- **Imagens:** logos da marca em `public/brand/`, fotos do carrossel em `public/slides/`, logos de parceiros em `public/partners/`, fotos da diretoria em `public/diretoria/`. Use nomes de arquivo em minúsculas.
- **Imprensa:** a fonte de verdade é a planilha [`dados/levantamento-imprensa.xlsx`](dados/levantamento-imprensa.xlsx), aba "Matérias" (Data, Título, Veículo, Tema, Resumo, Link, Menciona a AMAGAMES, Situação do dado e Observação interna). Para incluir uma matéria, acrescente uma linha com o link da fonte e um resumo próprio (não copie o texto da matéria) e rode `npm run press` (ou reinicie o `dev`). Isso gera `src/press.json`, que **não deve ser editado à mão**. As colunas "Menciona a AMAGAMES" e "Observação interna" são de uso interno e não aparecem no site.

## Planilhas (pasta `dados/`) e publicação
As planilhas `.xlsx` (jogos, estúdios, ações e edições, mapeamento e imprensa) ficam em [`dados/`](dados/), **fora de `public/`**. Por isso elas alimentam o site na hora do build, mas **não são publicadas nem ficam disponíveis para download**; elas contêm notas de pesquisa internas. Só os arquivos de `public/` (imagens, logos, ícones e PDFs dos infográficos) vão para o site. O deploy no GitHub Pages está em `.github/workflows/deploy.yml` e roda a cada push na branch `master`.

## Estrutura

```
public/            imagens, logos, ícones e PDFs (servidos como estão)
dados/             planilhas .xlsx, fonte de verdade (não publicadas)
scripts/           build-games.mjs, build-studios.mjs e build-actions.mjs: planilhas -> src/games.json, src/studios.json e src/actions.json
src/
  data.js          conteúdo do site
  games.json       gerado a partir da planilha de jogos
  studios.json     gerado a partir da planilha de estúdios
  actions.json     gerado a partir da planilha de ações
  components/      Header, Footer, Carousel, GroupCarousel, GamesCarousel, StudiosCarousel, GameCard, StudioCard, ActionCard, Pagination, FilterSelect, ui
  pages/           Home, Jogos, Estudios, Projetos e as demais páginas
specs/             especificações do projeto (veja abaixo)
```

## Desenvolvimento orientado a specs

O projeto usa spec-driven development: cada mudança de comportamento começa por uma especificação em [`specs/`](specs/README.md).

- `specs/constitution.md`: princípios do projeto (verdade antes de volume, conteúdo separado da interface, simplicidade, acessibilidade, identidade visual).
- `specs/NNN-nome/`: uma pasta por feature, com `spec.md` (o quê e por quê), `plan.md` (como), `tasks.md` (tarefas) e, quando preciso, `research.md`.
- Features atuais: `001-site-institucional`, `002-jogos`, `003-estudios`, `004-acoes`, `005-mapeamento`, `006-imprensa` e `007-diretoria`.

O fluxo é: escrever ou ajustar a spec, depois o plano e as tarefas, depois o código. Se o código divergir da spec, a spec é atualizada primeiro. O `CLAUDE.md` resume essas regras para o Claude Code.

## Pendências de conteúdo

Estes itens dependem de informação da associação (ver `specs/001-site-institucional/tasks.md`): nomes da diretoria, conferência da lista de estúdios associados, confirmação do e-mail de contato, e definição de hospedagem e domínio.

## Fontes dos dados

Mapeamento do Ecossistema Maranhense de Desenvolvimento de Jogos 2023 (SBGames 2024), Abragames, O Imparcial, Movimento Econômico e as planilhas de levantamento de jogos, estúdios, ações, mapeamento e imprensa da própria associação. As matérias da página Imprensa são links para os veículos, com resumo próprio; as capas dos jogos vêm das páginas públicas de cada jogo; confirme a autorização de uso antes de publicar.
