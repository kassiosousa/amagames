# Plano 006 — Imprensa

**Spec:** ./spec.md

## Abordagem
Repetir o modelo das specs 002 a 005: planilha como fonte de verdade, script que a converte em JSON em tempo de build e uma página com filtros e paginação reaproveitando `FilterSelect.jsx` e `Pagination.jsx`. A página é irmã de `Projetos.jsx`; o card é novo (`PressCard.jsx`), sem ícone e sem imagem.

Alternativas descartadas: buscar as matérias automaticamente (sem fonte estável nem permissão de republicação) e embutir o texto das matérias (direitos autorais).

## Planilha (criada)
Arquivo: `public/imprensa/levantamento-imprensa.xlsx`. O script lê as colunas pelo nome do cabeçalho.

| Aba | Colunas | Uso |
|---|---|---|
| Matérias | Data (AAAA-MM-DD), Título, Veículo, Tema, Resumo, Link, Menciona a AMAGAMES, Situação do dado, Observação interna | Lista da página (RF-02 a RF-09); a observação interna e "Menciona a AMAGAMES" não vão ao site |
| Fora da lista | Título, Veículo, Link, Motivo | Matérias achadas e descartadas, para registro (não lida pelo script) |

## Arquitetura e arquivos afetados
| Arquivo | Mudança |
|---|---|
| `scripts/build-press.mjs` (novo) | Lê a aba "Matérias" e gera `src/press.json`: `{ id, date (ISO), year, title, outlet, topic, summary, url, mentions, status, unconfirmed }`, ordenado por data decrescente (sem data, no fim); planilha ausente gera lista vazia com aviso, sem quebrar o build |
| `package.json` | Script `press`; incluir em `predev` e `prebuild` |
| `src/press.json` (gerado) | Não editar à mão |
| `src/components/PressCard.jsx` (novo) | Data por extenso, veículo, tema, título como link externo, resumo e etiqueta "Dado a confirmar" |
| `src/pages/Imprensa.jsx` (novo) | Total, filtros Tema e Ano, lista de 12 por página, `Pagination`; estado em `?tema=&ano=&pagina=` |
| `src/App.jsx` | Rota `/imprensa` |
| `src/components/Header.jsx` | Opção "Imprensa" no menu (desktop e recolhido) |
| `src/components/Footer.jsx` | Link "Imprensa" |
| `README.md`, `CLAUDE.md` | Comando `npm run press` e a planilha de imprensa |

## Modelo de dados
Cada matéria vira um objeto em `press.json`. A data é guardada em ISO e formatada na página com `Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' })` (sem fuso, para evitar a data recuar um dia). `unconfirmed` é verdadeiro quando a situação é "Parcial" ou "A confirmar". Os temas e os anos dos filtros saem dos dados.

## Riscos e dependências
- **Cobertura incompleta:** a pesquisa foi feita na web aberta; televisão, rádio e jornais impressos podem faltar.
- **Datas por metadado:** algumas datas vêm do metadado da página e podem estar erradas (a da ASN Nacional está marcada "A confirmar"; a da ASN Maranhão foi corrigida lendo o texto).
- **Links que mudam:** matérias podem sair do ar; o link é sempre o da fonte.
- **Direitos autorais:** só título, veículo, data e resumo próprio.

## Verificação
`npm run build` limpo; navegar manualmente CA-01 a CA-09 em `npm run dev`, em 360 px e desktop. Conferir uma amostra de links e datas contra as páginas originais.
