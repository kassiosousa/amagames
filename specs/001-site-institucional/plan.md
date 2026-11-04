# Plano 001 — Site institucional AMAGAMES

**Spec:** ./spec.md

## Abordagem
SPA em React + Vite com Tailwind v4 e `HashRouter` (hospedagem estática sem rewrite). Conteúdo centralizado em `src/data.js`; componentes só renderizam. Alternativa descartada: `BrowserRouter`, que exigiria fallback no servidor.

## Arquitetura e arquivos
| Arquivo | Papel |
|---|---|
| `src/main.jsx` | Entrada, `HashRouter` |
| `src/App.jsx` | Rotas e `ScrollManager` (RF-06) |
| `src/data.js` | Todo o conteúdo (RF-07) |
| `src/components/Header.jsx` | Menu de seções + páginas (RF-01, RNF-01/02) |
| `src/components/Carousel.jsx` | Carrossel (RF-02) |
| `src/components/ui.jsx` | `Section`, `PageShell`, cartões |
| `src/components/Footer.jsx` | Rodapé (RF-09) |
| `src/pages/Home.jsx` | Seções da home (RF-03, RF-05) |
| `src/pages/Pages.jsx` | Diretoria, Estúdios, Jogos, Projetos, Mapeamento (RF-04, RF-08) |
| `src/index.css` | Tokens Tailwind (`@theme`) |

## Modelo de dados (`src/data.js`)
`links`, `stats`, `slides{title,text,tone,image?}`, `about`, `studios{name,city,since?,focus,note?,games?,confirmar?}`, `games{title,genre,platform,year?,studio,desc}`, `projects{name,kind,desc}`, `partners[]`, `board{role,name}`, `faturamento{year,value}`, `mapeamento[[valor,rótulo]]`.

## Riscos
- Conteúdo incompleto publicado como se fosse oficial → mitigado por "A confirmar" (Constituição §1).
- Faturamento 2022 é derivado, não publicado → nota visível na página Mapeamento.

## Verificação
`npm run build` limpo; navegar manualmente CA-01 a CA-06 em `npm run dev`, em 360 px e desktop.
