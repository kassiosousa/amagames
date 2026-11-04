# Constitution — site da AMAGAMES

## Propósito
Dar visibilidade institucional à Associação Maranhense de Desenvolvedores de Jogos (AMAGAMES) e à cena de jogos do Maranhão, apresentando associação, estúdios, jogos, projetos, parceiros e dados do ecossistema.

## Princípios

1. **Verdade antes de volume.** Só publicar fatos com fonte. Dado desconhecido aparece como "A confirmar"; nada é inventado (nomes, números, logos).
2. **Conteúdo separado da apresentação.** Todo texto, lista e número vive em `src/data.js`. Atualizar o site não deve exigir mexer em componentes.
3. **Simplicidade.** SPA estática em React + Tailwind, sem backend. Nova dependência só com justificativa na spec.
4. **Hospedagem estática sem configuração.** Rotas com `HashRouter`, `base: './'`; o `dist/` funciona em qualquer servidor.
5. **Acessível e responsivo.** Mobile-first, contraste suficiente, navegação por teclado, `aria` nos controles interativos (carrossel, menu).
6. **Português do Brasil.** Todo conteúdo e UI em pt-BR; termos técnicos de jogos podem ficar em inglês.
7. **Inclusão como valor.** Dados de diversidade são apresentados com respeito e fonte.
8. **Verificável.** Cada requisito tem critério de aceite; `npm run build` limpo é o mínimo para concluir uma tarefa.

## Stack fixa
React 19, Vite, Tailwind CSS v4, react-router-dom (HashRouter). Fontes do manual de marca: Raleway (títulos, ExtraBold/Black) e Roboto (corpo).

## Identidade visual
Fonte da verdade: *Manual de Identidade Visual AMAGAMES*. Estilo minimalista: fundo branco, texto preto, bordas finas, sem sombras nem gradientes; a cor aparece só como acento.
- Paleta institucional (tokens em `src/index.css`): vermelho `brand-red` #DE3E3E, amarelo `brand-yellow` #F5B00B, azul `brand-blue` #2C81C0, azul escuro `brand-navy` #104E9C, preto #000, branco #FFF.
- Logos em `public/brand/`: `assinatura.png` (símbolo + lettering), `simbolo.webp` (só símbolo). Não deformar, recolorir ou aplicar efeitos (manual, "Usos indevidos"); manter área de proteção.
- Em fundos coloridos, usar branco (ou preto sobre amarelo) com bom contraste.

## Fontes de dados de referência
SBGames 2024 (Mapeamento do Ecossistema Maranhense 2023), Abragames, O Imparcial, Movimento Econômico.
