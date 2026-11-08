# AMAGAMES — site institucional

SPA em React 19 + Vite + Tailwind v4 + react-router-dom (HashRouter). Conteúdo em pt-BR.

## Desenvolvimento orientado a specs
Antes de mudar comportamento, leia `specs/constitution.md` e a spec da feature em `specs/NNN-*/`.
1. Nova feature: copie `specs/_templates/` para `specs/NNN-nome/` e escreva `spec.md` → `plan.md` → `tasks.md`.
2. Implemente tarefa a tarefa, marcando `[x]` em `tasks.md`.
3. Se o código divergir da spec, atualize a spec primeiro.
Detalhes em `specs/README.md`.

## Comandos
- `npm run dev` — servidor local (porta 5173)
- `npm run games` — regenera `src/games.json` a partir de `dados/levantamento-jogos-maranhenses.xlsx` (roda sozinho em `dev` e `build`)
- `npm run studios` — regenera `src/studios.json` a partir de `dados/levantamento-estudios-maranhenses.xlsx` e de `src/games.json` (roda sozinho em `dev` e `build`, depois de `games`)
- `npm run actions` — regenera `src/actions.json` (aba "Ações", cards da home) e `src/editions.json` (aba "Edições", lista paginada de Projetos) a partir de `dados/levantamento-acoes-realizadas-com-edicoes.xlsx` (roda sozinho em `dev` e `build`)
- `npm run mapping` — regenera `src/mapping.json` a partir de `dados/levantamento-mapeamento-ecossistema.xlsx` e dos PDFs da pasta (roda sozinho em `dev` e `build`)
- `npm run press` — regenera `src/press.json` a partir de `dados/levantamento-imprensa.xlsx` (aba "Matérias"; roda sozinho em `dev` e `build`)
- `npm run build` — build em `dist/` (deve passar limpo antes de concluir qualquer tarefa)

## Convenções
- Todo conteúdo em `src/data.js`; componentes só renderizam. Exceção: jogos, estúdios, ações e mapeamento vêm das planilhas da pasta `dados/` (fonte de verdade; ficam **fora de `public/`, então não são publicadas no site**), via `src/games.json`, `src/studios.json`, `src/actions.json`, `src/editions.json` e `src/mapping.json` e `src/press.json` gerados; não editar os JSON à mão.
- Nunca inventar dados: use `confirmar: true` / "A confirmar".
- Visual minimalista conforme o manual de marca: cores via tokens do `@theme` em `src/index.css` (`brand-red`, `brand-yellow`, `brand-blue`, `brand-navy`, `ink`, `paper`, `mute`, `line`, `soft`); fontes Raleway (títulos) e Roboto (corpo); logos em `public/brand/`.
- Rotas novas: registrar em `src/App.jsx` e no menu de `src/components/Header.jsx`.
