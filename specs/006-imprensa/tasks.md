# Tarefas 006 — Imprensa

**Executada em 2026-11-07.** Verificado em `/#/imprensa` (largura de desktop): 22 matérias em 2 páginas de 12, da mais recente (03/09/2026) à mais antiga (01/08/2019); filtros Tema e Ano, combinados e com "Limpar filtros"; etiqueta "Dado a confirmar" (2023 e 2021); links externos em nova aba; "Imprensa" ativa no menu e no rodapé. Não conferido em 360 px.

Formato: `- [x] T-01 descrição (RF-xx, CA-xx)`. Ordem = ordem de execução.

- [x] T-01 Pesquisar matérias e notícias sobre a AMAGAMES e sobre jogos no Maranhão (RF-08)
- [x] T-02 Criar `public/imprensa/levantamento-imprensa.xlsx` com as 22 matérias e a aba "Fora da lista" (RF-07)
- [x] T-03 Script `scripts/build-press.mjs`: planilha → `src/press.json`; ordem por data decrescente; sem planilha, lista vazia sem quebrar o build (RF-02, RF-07, RNF-03)
- [x] T-04 `package.json`: script `press` e inclusão em `predev` e `prebuild` (RF-07)
- [x] T-05 `PressCard.jsx`: data por extenso, veículo, tema, título como link externo, resumo e etiqueta "Dado a confirmar" (RF-03, RF-06, RNF-02, RNF-04)
- [x] T-06 `Imprensa.jsx`: total, filtros Tema e Ano, 12 por página com `Pagination`, estado na URL (RF-02, RF-04, RF-05, CA-02, CA-04, CA-05, CA-06)
- [x] T-07 Rota `/imprensa` e opção "Imprensa" no menu e no rodapé (RF-01, CA-01, CA-09)
- [x] T-08 Atualizar `README.md` e `CLAUDE.md` (comando `npm run press`, planilha de imprensa)
- [x] T-09 Build limpo e verificação de CA-01 a CA-09 (RNF-01)
- [ ] T-10 Revisão pela associação: acrescentar matérias de televisão, rádio, jornais impressos e outros portais, e confirmar as datas marcadas
