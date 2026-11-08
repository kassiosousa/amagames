# Spec 003 — Estúdios

**Status:** implementada (v1)
**Data:** 2026-11-05

## Contexto e problema
Hoje a seção "Estúdios associados" da home e a página `/#/estudios` usam uma lista escrita à mão em `src/data.js`, com apenas um estúdio real (OPS Studio) e três cartões "a confirmar". Os estúdios maranhenses serão mapeados em uma planilha (a criar, ver [research.md](./research.md)), no mesmo modelo da planilha de jogos (spec 002). Esta spec cria a apresentação dos estúdios na página inicial e na aba `/#/estudios`, com lista geral e filtros, lendo essa planilha como fonte de verdade. Todos os estúdios citados no plan.md tem autorização para uso do nome e marca.

## Usuários
- **Público geral e imprensa** que querem conhecer os estúdios do Maranhão.
- **Poder público, Sebrae e empresas** que buscam estúdios para parcerias ou contratação de serviços.
- **Estúdios e desenvolvedores** que querem reconhecimento como parte da comunidade.

## Requisitos funcionais
- **RF-01** Na tela inicial, listar os **6 estúdios de destaque** em formato de carrossel, mudando a cada 5s. Mostra os 3 primeiros, depois muda para outros 3 e assim por diante. Critério de destaque: estúdios com mais jogos publicados na Steam, desempatando pelo total de jogos e por último, o ano de criação, quanto mais antigo mais destaque.
- **RF-02** Cada estúdio na tela inicial mostra a imagem (logo) acima, o nome, tags (áreas de atuação), resumo e, abaixo, a cidade e o ano de fundação. Os dados vêm da planilha de estúdios.
- **RF-03** Logo acima, no canto direito, há um link "Lista de estúdios" que leva para `/#/estudios`.
- **RF-04** Na tela `/#/estudios`, listar todos os estúdios, com paginação de 10 por vez (mais recentes primeiro, ou seja, pelo ano de fundação decrescente), com setas para avançar e números que levam às demais páginas.
- **RF-05** Acima da lista há filtros: **Cidade**, **Área de atuação** e **Situação** (Ativo / Inativo). Os valores das áreas de atuação que forem sinônimos (por exemplo "Serious games" e "Jogos sérios") são unificados em um só, com prioridade para o termo em inglês.
- **RF-06** Todos os dados devem ser obtidos da planilha `public/estudios/levantamento-estudios-maranhenses.xlsx`, como fonte de verdade. Um script gera `src/studios.json` a partir dela (mesmo modelo do `games.json`).
- **RF-07** Ao clicar no nome do estúdio (em todos os cards), abre o site público do estúdio em nova aba. Se não houver site, usa o perfil principal em rede social; se não houver nenhum, o nome fica sem link.
- **RF-08** Cada card mostra a quantidade de jogos do estúdio, obtida cruzando a planilha de estúdios com a de jogos (`src/games.json`) pelo nome do estúdio e seus nomes alternativos. O número leva à lista de jogos filtrada por esse estúdio (`/#/jogos?estudio=...`).
- **RF-09** Os jogos de game jam e os de autores sem estúdio não geram cartão de estúdio. Ficam apenas na categoria "Game Jam" da lista de jogos.

## Requisitos não funcionais
- **RNF-01** O carrossel da página inicial muda a cada 5 s, mas fica parado enquanto o mouse ou o foco estiver sobre ele.
- **RNF-02** Em viewport de 360 px não há rolagem horizontal e os estúdios aparecem 1 por vez; a partir de 1024 px, 3 por vez.
- **RNF-03** Dados de contato pessoal (e-mail ou telefone de pessoas) não são publicados. Só canais institucionais do estúdio (site, redes, e-mail genérico).

## Cenários de aceite
- **CA-01 (RF-01)** Dado a home, então a seção de estúdios mostra 3 estúdios por vez em ≥ 1024 px e passam 6 estúdios ao todo (RF-01).
- **CA-02 (RF-02)** Dado um estúdio com logo, então o card mostra logo, nome, tags, resumo e cidade/ano; sem logo, mostra a marca AMAGAMES.
- **CA-03 (RNF-01)** Dado a home aberta, quando 5 s passam sem hover, então o carrossel avança; ao passar o mouse, pausa.
- **CA-04 (RF-03)** Dado a home, quando clico em "Lista de estúdios", então abre `/#/estudios`.
- **CA-05 (RF-04)** Dado `/#/estudios` com mais de 10 estúdios, então aparecem 10 por página, com setas e números funcionais.
- **CA-06 (RF-05)** Dado um filtro aplicado, então a lista, o contador e a paginação refletem o filtro e voltam para a página 1; "Limpar filtros" restaura tudo.
- **CA-07 (RF-07)** Dado um estúdio com site, quando clico no nome, então o site abre em nova aba; sem site nem rede, o nome não é link.
- **CA-08 (RF-08)** Dado um estúdio com jogos na planilha de jogos, então o card mostra a contagem correta e o link filtra a lista de jogos por ele.
- **CA-09 (RNF-02)** Dado viewport de 360 px, então não há rolagem horizontal e o carrossel mostra 1 estúdio por vez.

## Fora de escopo (v1)
Busca por texto, mapa dos estúdios, página individual de cada estúdio, área do associado para o estúdio editar os próprios dados, informações fora da planilha.

