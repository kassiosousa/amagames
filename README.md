# AMAGAMES — site institucional

Site da **AMAGAMES, Associação Maranhense de Desenvolvedores de Jogos Eletrônicos** (São Luís, MA, fundada em 2013). É a vitrine pública da associação e da cena de jogos do Maranhão.

## Para que serve

A associação reúne estúdios e desenvolvedores para ter mais voz junto a entidades locais e nacionais, formar novos talentos (Global Game Jam, oficinas, mentorias) e acompanhar o crescimento do setor com um mapeamento anual. O site existe para:

- **Apresentar a AMAGAMES** (quem somos, missão, diretoria) a desenvolvedores, estudantes, poder público, Sebrae, empresas e imprensa;
- **Dar visibilidade aos estúdios e jogos maranhenses**, com busca por ano, estilo e estúdio;
- **Mostrar projetos e ações realizadas** e os parceiros;
- **Publicar os dados do ecossistema** (mapeamento de 2023: faturamento, produção, perfil).

A estrutura das seções segue o padrão de outras associações regionais de jogos (Abragames, ADJogosRS, Ascende, ACJogos-AL, BIND): identidade e objetivos, depois associados, ações e parceiros; diretoria e dados em páginas próprias. A pesquisa está em [`specs/001-site-institucional/research.md`](specs/001-site-institucional/research.md).

## O que tem no site

**Página inicial:** cabeçalho, carrossel de destaques, Quem somos, Estúdios associados, Jogos da comunidade (carrossel dos 9 jogos mais recentes publicados na Steam), Projetos e ações, Parceiros e rodapé.

**Páginas:** Diretoria, Lista de estúdios, Lista de jogos (todos os jogos, 10 por página, com filtros), Projetos e Mapeamento.

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

- **Textos, estúdios, projetos, parceiros, diretoria, destaques do carrossel e números:** edite [`src/data.js`](src/data.js). Dado desconhecido deve ficar marcado como "A confirmar", nunca inventado.
- **Jogos:** a fonte de verdade é a planilha [`public/jogos/levantamento-jogos-maranhenses.xlsx`](public/jogos/levantamento-jogos-maranhenses.xlsx) (uma aba por ano). Depois de editá-la, rode `npm run games`, ou reinicie o `npm run dev`; o `build` já faz isso sozinho. Isso gera `src/games.json`, que **não deve ser editado à mão**. As capas dos jogos ficam em `public/jogos/`.
- **Imagens:** logos da marca em `public/brand/`, fotos do carrossel em `public/slides/`, logos de parceiros em `public/partners/`. Use nomes de arquivo em minúsculas.

## Estrutura

```
public/            imagens, logos e a planilha de jogos (servidos como estão)
scripts/           build-games.mjs: planilha -> src/games.json
src/
  data.js          conteúdo do site
  games.json       gerado a partir da planilha
  components/      Header, Footer, Carousel, GamesCarousel, GameCard, ui
  pages/           Home, Jogos e as demais páginas
specs/             especificações do projeto (veja abaixo)
```

## Desenvolvimento orientado a specs

O projeto usa spec-driven development: cada mudança de comportamento começa por uma especificação em [`specs/`](specs/README.md).

- `specs/constitution.md`: princípios do projeto (verdade antes de volume, conteúdo separado da interface, simplicidade, acessibilidade, identidade visual).
- `specs/NNN-nome/`: uma pasta por feature, com `spec.md` (o quê e por quê), `plan.md` (como), `tasks.md` (tarefas) e, quando preciso, `research.md`.
- Features atuais: `001-site-institucional` e `002-jogos`.

O fluxo é: escrever ou ajustar a spec, depois o plano e as tarefas, depois o código. Se o código divergir da spec, a spec é atualizada primeiro. O `CLAUDE.md` resume essas regras para o Claude Code.

## Pendências de conteúdo

Estes itens dependem de informação da associação (ver `specs/001-site-institucional/tasks.md`): nomes da diretoria, lista oficial de estúdios associados, vínculo de cada jogo a seu estúdio, confirmação do Instagram e do e-mail de contato, e definição de hospedagem e domínio.

## Fontes dos dados

Mapeamento do Ecossistema Maranhense de Desenvolvimento de Jogos 2023 (SBGames 2024), Abragames, O Imparcial, Movimento Econômico e a planilha de levantamento de jogos da própria associação. As capas dos jogos vêm das páginas públicas de cada jogo; confirme a autorização de uso antes de publicar.
