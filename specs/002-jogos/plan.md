# Plano 002 — Jogos

**Spec:** ./spec.md

## Abordagem
<Resumo da solução e alternativas descartadas.>
Realizar ajustes na tela inicial. Manter a estrutura atual de card, acrescentando a imagem de cada jogo e atualizando as informações de acordo com a planilha informada

## Arquitetura e arquivos afetados
| Arquivo | Mudança |
|---|---|
| `src/pages/Home.jsx` | Área de jogos, fazer os ajustes da tela inicial, aplicando as **RF-01** a **RF-03** |
| `/#/jogos` | Tela com a lista geral de jogos, aplicar a mesma estrutura de card da tela inicial, aplicando as **RF-04** a **RF-06** |

## Implementação (arquivos)
| Arquivo | Papel |
|---|---|
| `scripts/build-games.mjs` | Converte a planilha em `src/games.json` (devDependency `exceljs`); `npm run games` |
| `src/games.json` | Gerado, não editar à mão |
| `src/components/GameCard.jsx` | Card compartilhado pela home e pela lista |
| `src/components/GamesCarousel.jsx` | Carrossel da home |
| `src/pages/Jogos.jsx` | Rota `/#/jogos` com filtros e paginação (`?ano=&estilo=&estudio=&pagina=`) |

## Modelo de dados
Dados devem ser todos consultados em `dados/levantamento-jogos-maranhenses.xlsx` (fonte de verdade). Por jogo, `games.json` guarda: `id, year` (nome da aba), `order` (linha), `title, studio` (coluna Desenvolvedor), `tags` (coluna Gênero dividida por `/` e `,`), `platform, engine, summary` (Descrição), `access, image, hasCover`, mais três campos derivados: `steam` (acesso em `store.steampowered.com`; os 9 mais recentes formam o carrossel), `jam` (coluna Contexto contém "Game Jam") e `studioFilter` (`"Game Jam"` quando `jam`, senão o estúdio). Sinônimos de estilo ficam na tabela `synonyms` do script (hoje: Quebra-cabeça → Puzzle). Links `.zip` não viram `access`. A coluna opcional **Situação** (O) da planilha vira `status`; jogos "Em desenvolvimento" ficam na lista, mas não contam como `steam` (RF-01 pede jogos publicados). Após editar a planilha, rode `npm run games` (ou reinicie `npm run dev`).

## Riscos e dependências
- Conteúdo incompleto publicado

## Verificação
`npm run build` limpo; navegar manualmente CA-01 a CA-05 em `npm run dev`, em 360 px e desktop.
