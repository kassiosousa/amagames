# Pesquisa 002

## Jogos maranhenses (busca por imagens e dados)
Abrir o arquivo `.public/jogos/levantamento-jogos-maranhenses.xlsx` e passar por cada jogo listado.
Para cada jogo, baixar a imagem referenciada para dentro da pasta '.public/jogos' e ajustar a planilha para referenciar esta imagem local
Quando não houver referencia de link de imagem, buscar na internet na página onde informa, caso não encontre, faça uma busca na internet, caso não encontre, coloque como referencia a marca da amagames presente em '.public/brand/assinatura'

## Resultado da execução (2026-11-04)
- 63 jogos em 17 abas (2010–2026). Coluna `Imagem` (L) agora aponta para `./jogos/<ano>-<slug>.<ext>`; coluna nova `Origem da imagem` (N) guarda a URL de origem.
- 49 jogos com imagem (capa via `og:image` de Steam, itch.io, Global Game Jam, ou link direto da planilha); 47 arquivos em `public/jogos/`.
- 14 jogos com a marca AMAGAMES (`./brand/assinatura.png`) como referência: Paçoca Ultimate, Paçoca Ultimate 3D, Super Paçoca Ultimate, A Arca dos Livros, Desafio Geek_ana, Bricks Don't Hit Back, Tap The Chickens! (estúdio Zogui; o host `archives.nuninhoneto.games` não respondeu), Bumba, Ilha Mágica, Brick Blast Galaxy (Behance, 403), Vem Guarnicê (app não encontrado na App Store), CRAB ROOTS (só repositório GitHub), Aqua rings e The Shattered Mask (GGJ, 403).
- Dogfights in SLZ, Super Bafo Championship, One Step to Rest e Zilado: a planilha aponta os quatro para o mesmo app Steam (Marabundle, 2201660). Dogfights usa a capa do itch.io; os outros três usam a capa do pacote Marabundle.

## Pontos para revisão humana
- Link Steam repetido (Marabundle) em 4 jogos: confirmar se cada um tem página própria.
- Imagens do GGJ têm só ~335 px de largura; Cristário é um GIF de 3 MB; Toureon é um pôster vertical (1200x1800).
- Direitos de uso das capas: obtidas das páginas públicas dos jogos; confirmar autorização antes de publicar no site.
- Páginas com bloqueio (403) não foram contornadas.
- Backup da planilha original fora do projeto (pasta temporária da sessão).

## Resultado esperado
- A planilha '.public/jogos/levantamento-jogos-maranhenses.xlsx' atualizada com dados dos jogos maranhenses, incluindo imagens quando possível
- arquivos de imagens referentes a cada jogo do mapeamento

