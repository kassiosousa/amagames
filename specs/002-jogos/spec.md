# Spec 002 — Jogos

**Status:** implementada (v1)
**Data:** 2026-11-04

## Contexto e problema
Os jogos maranhenses foram mapeados em uma planilha e agora, os jogos possuem dados e imagens detalhadas em [research.md](./research.md). Agora, deve-se criar a página de listagem de jogos tanto na página inicial quanto na aba `/#/jogos` contendo a lista geral com filtros.

## Usuários
- **Público geral** que querem conhecer os jogos desenvolvidos pela comunidade.
- **Desenvolvedores** que buscam ter reconhecimento que fazem parte da comunidade.

## Requisitos funcionais
- **RF-01** Na tela inicial, listar 9 jogos de destaque, ou seja, apenas jogos publicados na Steam. Esses jogos ficam passando em formato de carrossel, mudando a cada 5s. Mostra os 3 primeiros, depois muda para outros 3 e assim por diante. 
- **RF-02** Cada jogo apresentado na tela inicial terá a imagem acima, o titulo, tags, resumo e abaixo o nome do estudio. Os dados são encontrados em `dados/levantamento-jogos-maranhenses.xlsx`
- **RF-03** Logo acima no canto direito há um botão/link para "Lista de jogos" que leva para a tela listando todos os jogos.
- **RF-04** Na tela `/#/jogos` deve-se listar todos os jogos, mostrando uma paginação de 10 mais recentes por vez, contendo setas para avançar e numeros contendo link para as demais páginas. 
- **RF-05** Acima dos jogos há filtros, contendo: Ano de Publicação, Estilo e Estúdio. No filtro de "Estudio", juntar todos os jogos feitos em game jam em uma categoria "Game Jam". No filtro de estilo, unificar traduções como “Puzzle” e “Quebra-cabeça” como a mesma coisa, dando prioridade para a palavra em inglês.
- **RF-06** Todos os dados devem ser obtidos em `dados/levantamento-jogos-maranhenses.xlsx` como fonte de verdade
- **RF-07** Ao clicar no titulo do jogo, deve levar para a página pública do mesmo (em todos os cards)

## Requisitos não funcionais
- **RNF-01** Carrossel da página inicial muda a cada 5s mas fica parado caso o mouse esteja em cima

## Cenários de aceite
- **CA-03 (RF-01)** Dado a home na lista de jogos, quando clica em 'lista de jogos' abre na página de lista geral de jogos `/#/jogos`.
- **CA-01 (RF-02)** Dado a home aberta na lista de jogos, quando 5s passam sem hover, então o slide avança; ao passar o mouse, pausa.
- **CA-02 (RF-02)** Dado a home na lista de jogos, mostra 3 jogos por vez contendo imagem e informações c onforme **RF-02**
- **CA-04 (RF-03)** Dado `/#/jogos`, quando clico em "Lista de jogos", então abre a lista geral de jogos.
- **CA-05 (RF-06)** Dado viewport de 360 px, então não há rolagem horizontal, os jogos são mostrados 1 por 1.

## Fora de escopo (v1)
Busca por informações fora da planilha

## Decisões de 2026-11-09
- Capas muito largas (proporção acima de 2,5:1) não são recortadas no card: aparecem inteiras sobre o fundo claro.
- As capas de One Step to Rest e Super Bafo Championship são as cápsulas enviadas pela associação.
- Zilado passa a ter capa própria (`2023-zilado.png`). As cápsulas de Zilado, One Step to Rest e Super Bafo Championship são pequenas (cerca de 220 x 80 px) e aparecem inteiras no card; uma versão maior melhoraria a nitidez.
- Capas ajustadas em 2026-11-09: as três cápsulas pequenas viraram imagens 16:9 (960 x 540 px), iguais à proporção da caixa do card; a ampliação deixa o texto um pouco suave.
