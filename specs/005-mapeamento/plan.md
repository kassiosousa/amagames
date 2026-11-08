# Plano 005 — Mapeamento do ecossistema

**Spec:** ./spec.md

## Abordagem
Repetir o modelo das specs 002 a 004: planilha como fonte de verdade, script que gera um JSON em tempo de build e componentes que só renderizam. A planilha é "longa" (uma linha por indicador e ano), porque cada ano traz indicadores diferentes; assim um novo mapeamento (2026) entra acrescentando linhas, sem mudar o código.

Alternativas descartadas: uma coluna por ano (quebra quando um indicador existe só em alguns anos), embutir imagens dos infográficos na página (pesadas e sem texto acessível) e usar biblioteca de gráficos (as barras em CSS bastam).

## Planilha (criada)
Arquivo: `dados/levantamento-mapeamento-ecossistema.xlsx`, com três abas. O script lê as colunas pelo nome do cabeçalho.

| Aba | Colunas | Uso |
|---|---|---|
| Faturamento | Ano, Faturamento (R$), Rótulo no infográfico, Fonte, Observação | Gráfico de barras (RF-03) e fonte do faturamento (RF-09) |
| Indicadores | Ano, Seção, Indicador, Valor, Unidade, Observação | Seções do ano escolhido (RF-02); 179 linhas, anos 2019, 2021 e 2022 a 2025 |
| Fontes | Ano, Arquivo, Tipo, Observação, Créditos, Artigo relacionado | Link do PDF, linha de fonte e créditos (RF-05, RF-06) |

## Arquitetura e arquivos afetados
| Arquivo | Mudança |
|---|---|
| `scripts/build-mapping.mjs` (novo) | Lê a planilha e gera `src/mapping.json`: `{ years: [...], latest, revenue: [{year, value, label, growth}], byYear: { "2025": { sections: [{name, items: [{label, value, unit, note}]}], pdf, pdfSize } } }`; ordena os anos; calcula a variação; lê o tamanho do PDF em disco; sem planilha, JSON vazio e aviso sem quebrar o build |
| `package.json` | Script `mapping`; incluir em `predev` e `prebuild` |
| `src/mapping.json` (gerado) | Não editar à mão |
| `src/pages/Mapeamento.jsx` (novo) | Página: bloco de detalhes com dados do ano à esquerda e **aba lateral de anos à direita** (`?ano=`; fileira acima dos dados em telas pequenas), gráfico de faturamento, linha de fonte e, por último, o link "Visualizar Infográfico" |
| `src/components/RevenueChart.jsx` (novo) | Barras horizontais proporcionais, valor por extenso e variação; nota de que não houve mapeamento em 2020 |
| `src/components/IndicatorSection.jsx` (novo) | Grade de números em destaque; participação em eventos como lista de barras percentuais |
| `src/pages/Pages.jsx` | Remover o `Mapeamento` antigo |
| `src/App.jsx` | A rota `/mapeamento` aponta para `Mapeamento.jsx` |
| `src/data.js` | Remover `faturamento` e `mapeamento` |
| `README.md`, `CLAUDE.md` | Comando `npm run mapping` e a planilha do mapeamento |

## Modelo de dados
`mapping.json` traz um objeto por ano. Valores numéricos viram número; lista de locais (texto) fica como texto. Percentuais mantêm a unidade `%`. O ano mais recente é o maior ano com indicadores. O gráfico usa a aba Faturamento (2019, 2021 a 2025). Como não houve mapeamento em 2020, o script não cria esse ano; a página mostra a nota. A variação de cada ano é calculada contra o ano mapeado anterior (2021 contra 2019).

## Riscos e dependências
- **Transcrição manual** dos infográficos: risco de erro de leitura; revisar com a associação.
- **PDFs pesados**: 2025 foi comprimido de 27 MB para 1,3 MB (páginas em JPEG com camada de texto pesquisável); 2021 foi comprimido de 16 MB para 2,7 MB (mesma resolução, JPEG). Só link, nunca carregar com a página.
- **Layouts de 2019 e 2021** diferentes dos demais: só os indicadores que existem em cada ano entram; a página esconde seções vazias.
- **Ano do arquivo**: o nome `infografico-mapeamento-amaagames-AAAA.pdf` tem a grafia "amaagames" (com dois "a"); o script usa o nome do arquivo real, sem renomear.
- **Valores arredondados** em 2024 e 2025 podem gerar variações aproximadas (2025: +35%).

## Verificação
`npm run build` limpo; navegar manualmente CA-01 a CA-09 em `npm run dev`, em 360 px e desktop. Conferir contra os infográficos pelo menos os números de 2025 e o faturamento de todos os anos.
