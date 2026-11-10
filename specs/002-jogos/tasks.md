# Tarefas 002 — Jogos

- [x] T-01 Script `scripts/build-games.mjs`: lê a planilha (todas as abas de ano) e gera `src/games.json`, ordenado do mais recente ao mais antigo; roda em `predev` e `prebuild` (RF-06)
- [x] T-02 `GameCard`: imagem, título, tags, resumo e estúdio abaixo; marca AMAGAMES quando não há capa (RF-02)
- [x] T-03 `GamesCarousel` na home: 9 jogos de destque (publicados na steam), 3 por vez (1 abaixo de 1024 px), troca a cada 5s, pausa com mouse/foco, setas e indicadores (RF-01, RNF-01, CA-01, CA-02, CA-05)
- [x] T-04 Link "Lista de jogos" no canto superior direito da seção (RF-03, CA-03)
- [x] T-05 Página `/#/jogos`: filtros Ano, Estilo e Estúdio, paginação de 10 com setas e números, estado na URL (RF-04, RF-05)
- [x] T-06 Remover os jogos escritos à mão de `src/data.js` (RF-06)
- [x] T-07 Build limpo e verificação em 1280 px e 360 px (CA-01..CA-05)
- [x] T-08 Script: marcar `steam` (acesso em store.steampowered.com), `jam` (coluna Contexto = "Game Jam") e `studioFilter` ("Game Jam" para os jogos de jam) (RF-01, RF-05)
- [x] T-09 Filtro Estúdio com a categoria "Game Jam" agrupando os jogos de jam, sempre a primeira opção (RF-05)
- [x] T-10 Filtro Estilo: "Quebra-cabeça" unificado em "Puzzle" (tabela `synonyms` no script) (RF-05)
- [x] T-13 Reexecução com a planilha atualizada (70 jogos): `games.json` regerado, 7 páginas na lista, destaques da Steam inalterados, capas todas presentes (2026-11-06)
- [x] T-12 Coluna Situação na planilha; jogos em desenvolvimento não entram nos destaques da Steam (RF-01)
- [x] T-11 Título do card abre a página pública do jogo em nova aba; sem link quando a planilha não informa (RF-07)
- [x] T-14 Capas de "One Step to Rest" (`2023-one-step-to-rest.png`) e "Super Bafo Championship" (`2023-super-bafo-championship.png`) trocadas pelas cápsulas enviadas pela associação em 2026-11-09 (antes usavam a capa do Marabundle); planilha e `games.json` atualizados
- [x] T-15 `GameCard.jsx`: capas muito largas (proporção acima de 2,5:1, como as cápsulas em faixa de 616 x 80 px) aparecem inteiras (`object-contain`), sem recorte; as demais seguem em `object-cover`
