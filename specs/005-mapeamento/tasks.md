# Tarefas 005 — Mapeamento do ecossistema

Formato: `- [x] T-01 descrição (RF-xx, CA-xx)`. Ordem = ordem de execução.

**Executada em 2026-11-06.** Verificado em 1280 px e 360 px: página abre em 2025, aba de anos à direita (fileira acima dos dados no celular), troca de ano com `?ano=`, gráfico de faturamento com 6 barras, link "Visualizar Infográfico" abaixo de todos os dados. Pendente apenas a revisão da transcrição pela associação (T-03, na prática uma conferência humana).

**Feito ao criar a spec:** artigo SBGames 2024 salvo na pasta, planilha com os números transcritos (inclui 2021, adicionado pela associação) e compressão dos PDFs de 2025 e 2021 (T-01, T-02 e T-12).

- [x] T-01 Reunir as fontes em `public/mapeamento/`: infográficos de 2019, 2021 (enviado pela associação), 2022 a 2025 e o artigo SBGames 2024 (RF-09)
- [x] T-02 Criar `public/mapeamento/levantamento-mapeamento-ecossistema.xlsx` com faturamento (2019, 2021 a 2025), indicadores de 2019, 2021 e 2022 a 2025 e as fontes (RF-07)
- [ ] T-03 Revisar a transcrição dos infográficos com a associação (RF-07)
- [x] T-04 Script `scripts/build-mapping.mjs`: planilha → `src/mapping.json`; variação do faturamento; tamanho dos PDFs; planilha ausente sem quebrar o build (RF-03, RF-05, RF-07, RNF-03)
- [x] T-05 `package.json`: script `mapping` e inclusão em `predev` e `prebuild` (RF-07)
- [x] T-06 `IndicatorSection.jsx`: números em destaque e barras percentuais de eventos (RF-02, RNF-01, RNF-03)
- [x] T-07 `RevenueChart.jsx`: barras proporcionais, valores, variação e nota de que não houve mapeamento em 2020 (RF-03, RF-09, RNF-02, CA-03, CA-07)
- [x] T-08 `Mapeamento.jsx`: ano mais recente por padrão, aba lateral de anos à direita (fileira em telas pequenas) com `?ano=`, linha de fonte e, abaixo de todos os dados, o link "Visualizar Infográfico" com ano e tamanho (RF-01, RF-04, RF-05, RF-06, CA-01, CA-04, CA-05, CA-06)
- [x] T-09 Trocar a rota, remover o `Mapeamento` antigo de `Pages.jsx` e `faturamento`/`mapeamento` de `src/data.js` (RF-08)
- [x] T-10 Atualizar `README.md` e `CLAUDE.md` (comando `npm run mapping`, planilha do mapeamento)
- [x] T-12 Comprimir os PDFs de 2025 (27 MB para 1,3 MB, texto pesquisável) e de 2021 (16 MB para 2,7 MB) (RNF-04)
- [x] T-11 Build limpo e verificação de CA-01 a CA-09 em 1280 px e 360 px (RNF-01)
