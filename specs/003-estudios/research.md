# Pesquisa 003

Roteiro de pesquisa para quando a planilha de estúdios existir. **Não executado.** Segue o mesmo método da [pesquisa 002](../002-jogos/research.md).

## Ponto de partida
A planilha de jogos (`dados/levantamento-jogos-maranhenses.xlsx`) já cita alguns estúdios (fora os jogos de game jam). 
Servem de lista de dados inicial para a associação confirmar e completar posteriormente:

| Estúdio na planilha de jogos | Jogos | Observação |
|---|---|---|
| Wired Dreams Studio | 6 (+1 em parceria com Statera Studio) | Red Ronin, Upaon, Raven's Hike, Undergrave, Dogfights in SLZ, FROGUE; Arashi Gaiden com Statera |
| OPS Game Studio | 9 | Também aparece como "OPS Studio" em `src/data.js`; fundado em 2018 por Kassio Sousa, Nuninho Neto e Artur Pinheiro | Lunar Axe, Final Forge, One Step to Rest, Corre Sio!, Desert Mirage, Super Dev, Toureon, Diluvio, Yalode
| Astral Game Studio | 5 | Asyren, Folklore Legends, Brick Blast Galaxy, Zilado, Scarlet Manor |
| Hardcoffee Game Studio | 3 (+ jogos de jam) | Logic Light, Animais da Amazônia, Townmaker; Post Mortem, Bat Beat e Hello, Adventurer! saíram de game jam |
| Clops Game Studio | 2 | UniDuni, Super Bafo Championship |
| Onin | 1 | Anil |

A pesquisa de ecossistema indica 12 estúdios e 23 desenvolvedores independentes no estado (Abragames, 2025). A lista acima não possui todos os dados, mas inclui estúdios com maior prestígio e ativos no momento, essa será a lista inicial podendo ser expandida posteriormente.

## Estúdios maranhenses (busca por dados e imagens)
Abrir `dados/levantamento-estudios-maranhenses.xlsx` e passar por cada estúdio listado.
1. Para cada estúdio, se a planilha tiver um link de logo, baixar a imagem para `public/estudios/` e ajustar a planilha para referenciar o arquivo local.
2. Sem link de logo, buscar na página do estúdio informada na planilha (`og:image` do site, do itch.io ou da loja); se não achar, fazer uma busca na internet; se não achar, usar a marca da AMAGAMES (`public/brand/assinatura.png`) como referência.
3. Preencher, quando faltar e houver fonte pública: site, Instagram, ano de fundação, cidade e descrição curta. Registrar a URL de origem na coluna "Origem da imagem" e, para texto, indicar a fonte.
4. Nunca preencher e-mail ou telefone de pessoas (RNF-03). Dado que não for encontrado fica em branco: não inventar.

## Regras de coleta (aprendidas na pesquisa 002)
- Usar um identificador de cliente honesto; **não** simular navegador para contornar bloqueio (403). Em caso de bloqueio, usar a marca como fallback e anotar.
- Validar o conteúdo baixado (tipo e tamanho da imagem) antes de salvar; guardar backup da planilha original fora do projeto.
- Imagens somente .png ou .jpg, se encontrar diferente, tente converter.
- Links de download direto (`.zip`) não são página pública de estúdio.
- Confirmar com cada estúdio a autorização para publicar logo e dados posteriormente

## Resultado da execução (4ª rodada, 2026-11-06) — após os novos jogos
Com a planilha de jogos atualizada (70 jogos), o `games.json` foi regerado e os estúdios foram revisados de novo.

**Contagem de jogos por estúdio** (nome na coluna "Desenvolvedor" da planilha de jogos; é o número que o card vai mostrar no RF-08):

| Estúdio | Jogos | Dos quais game jam | Publicados na Steam |
|---|---|---|---|
| Wired Dreams Studio | 7 (6 + Arashi Gaiden, com Statera Studio) | 0 | 7 |
| OPS Game Studio | 10 | 0 | 3 |
| Astral Game Studio | 5 | 0 | 1 |
| Hardcoffee Game Studio | 6 | 3 (Post Mortem, Bat Beat, Hello, Adventurer!) | 2 |
| Clops Game Studio | 2 | 0 | 2 |
| Orinn.studio | 1 | 0 | 0 |

Total na planilha: 70 jogos, 32 de game jam, 16 publicados na Steam, 3 em desenvolvimento (Desert Mirage, Scarlet Manor, Anil).

**O que foi buscado de novo e o resultado**
- Páginas da Steam dos jogos de cada estúdio (links de site do desenvolvedor): só a da OPS (lunaraxe.com, que é o site do jogo) e a do Hardcoffee (`hardcoffeestudio.com`) trazem site. O domínio do Hardcoffee **não existe mais** (não resolve), então o itch.io continua como site. Wired Dreams e Astral não têm site próprio na Steam; o Astral aparece só como desenvolvedor de Divinastros (publicado por Nuntius Games e Vsoo Games, fora da planilha).
- Descrições da OPS e da Astral atualizadas para citar os jogos novos (Yalodê, Corre Sio!, Desert Mirage; Scarlet Manor). As demais descrições e todos os dados preenchidos pela associação foram mantidos. Backup da planilha anterior fora do projeto.

**Para decidir (afeta a spec 003)**
- **RF-08 e game jam**: o Hardcoffee tem 3 jogos de game jam. Se a contagem do card incluir só jogos "de estúdio", ele mostra 3; se incluir todos, 6. A contagem acima inclui todos; o link do card (`/#/jogos?estudio=Hardcoffee Game Studio`) mostraria só 3, porque os jogos de jam entram na categoria "Game Jam" do filtro. Definir qual regra vale.
- **Nome do estúdio nos jogos**: "Wired Dreams Studio / Statera Studio" (Arashi Gaiden) precisa contar para a Wired Dreams; o script da T-03 deve tratar nomes compostos.
- Divinastros (Astral) não está na planilha de jogos; incluir se a associação quiser.

## Resultado da execução (3ª rodada, 2026-11-06) — vale sobre as pendências da 2ª
Correções da associação aplicadas:
- **Wired Dreams**: o Instagram `thi_o_oliveira` fica como oficial do estúdio (verificado pela associação). **OPS e Clops**: Instagram também verificado.
- **Hardcoffee**: logo baixada do link do itch.io que a associação pôs na planilha. A logo original é **branca com fundo transparente** (invisível nos cards brancos), então foi salva sobre fundo escuro em `public/estudios/hardcoffee-game-studio.png`.
- **Orinn.studio**: logo baixada do SVG do site do estúdio (`logo_orinn_light.svg`), convertida em PNG de 600 px (`orinn-studio.png`); o `orinn-studio.jpg` (foto do Instagram) foi removido. O nome oficial é **Orinn**.
- **Jogos que faltavam**: adicionados à planilha de jogos (`public/jogos`), com capa baixada de cada página indicada, e uma coluna nova **Situação** (O) para jogos "Em desenvolvimento":

| Jogo | Estúdio | Aba (ano) | Fonte | Observação |
|---|---|---|---|---|
| Corre Sio! | OPS | 2019 | Maximize (case) | Projeto de 2019 da Cerveja Magnífica |
| Super Dev | OPS | 2020 | UEMA (7/10/2020) | Lançado em setembro de 2020, Android |
| Diluvio | OPS | 2024 | itch.io | Ano pelo carimbo de data da página do itch.io |
| Yalodê | OPS | 2025 | itch.io | **Ano estimado**: a página não traz data |
| Desert Mirage | OPS | 2026 | Steam | Em desenvolvimento; data de lançamento a anunciar |
| Scarlet Manor: The Heir | Astral | 2024 | Steam e itch.io | Em desenvolvimento ("Coming soon"); demo desde 2024 |
| Anil | Orinn.studio | 2026 | itch.io | Protótipo do sistema de combate (Godot); ano pelo da fundação do estúdio |

Pontos para conferir nesses 7 jogos: anos de Yalodê, Diluvio e Anil; capa do Anil (miniatura de 315 px, a página não tem imagem própria); gêneros, engines, formalização e contexto preenchidos só quando a fonte permitia (o resto ficou em branco). Os jogos em desenvolvimento **não entram** nos destaques da Steam do carrossel (o script ignora quem tem Situação "Em desenvolvimento"), mas aparecem na lista geral.

## Resultado da execução (2ª rodada, 2026-11-06)
A 1ª rodada (2026-11-05) criou a planilha, que não existia. Depois a associação a atualizou (cidade, ano, formalização, site, Instagram, e o estúdio Onin virou **Orinn.studio**). Nesta rodada, com a planilha atualizada, foram buscados de novo os dados e as logos. **Os valores preenchidos pela associação foram mantidos**; só mudei logo, "Origem da imagem" e "Fonte dos dados". Backup da versão anterior fora do projeto.

| Estúdio | Logo | O que mudou nesta rodada |
|---|---|---|
| Wired Dreams Studio | DeVuego (igual) | Nada novo: a busca não achou site, Instagram do estúdio nem ano oficial |
| OPS Game Studio | **Logo oficial** de opsgamestudio.com (antes: DeVuego) | Arquivo trocado para `ops-game-studio.png` (reduzido de 2616 para 800 px); site oficial confere ("Empresa de jogos e aplicações imersivas") |
| Astral Game Studio | Linktree (igual) | Nada novo |
| Hardcoffee Game Studio | Marca AMAGAMES | Nada novo: sem Instagram, site ou logo em fonte pública |
| Clops Game Studio | studioclops.com (igual) | Link de origem corrigido (o da planilha dava erro 400 sem o parâmetro `?h=`) |
| Orinn.studio | **Foto de perfil do Instagram** (antes: marca) | Logo baixada (150 px) de `orinn-studio.jpg`; descrição conferida no itch.io `orinnstudio.itch.io` |

Logos em `public/estudios/`: `wired-dreams-studio.jpg`, `ops-game-studio.png`, `astral-game-studio.png`, `clops-game-studio.png`, `orinn-studio.jpg`. O Hardcoffee segue com `./brand/assinatura.png`.

### Pendências e pontos de atenção
- **Instagram de Wired Dreams** na planilha é `thi_o_oliveira`, que parece perfil pessoal, não do estúdio; o RNF-03 pede só canais institucionais. Confirmar se fica.
- **Instagram de OPS e Clops** não foi verificado (vem do DeVuego; Instagram não abre por script): confirmar.
- **Logo do Orinn** é de baixa resolução (150 px) e o link do Instagram expira: o arquivo local já foi salvo; trocar por uma logo oficial quando houver. O site informado (`portfolio-orinn-c464.vercel.app`) é uma página sem conteúdo útil.
- **Hardcoffee**: cidade e ano da planilha não puderam ser confirmados por fonte pública; sem Instagram nem logo.
- **Capas do itch.io não são logos** (são arte do último jogo): não usadas.
- **Jogos que faltam** na planilha de jogos (`public/jogos`): "Anil" (Orinn), Corre Sio!, Desert Mirage, Super Dev, Diluvio e Yalodê (OPS), Scarlet Manor (Astral). A contagem de jogos (RF-08) ficará menor que a esperada até lá.
- **Nome**: a planilha de jogos usa "Onin"/"OPS Studio" em alguns pontos; as colunas "Nomes alternativos" têm "Onin" e "OPS Studio" para cruzar. Conferir se a planilha de jogos usa "Orinn".
- **Statera Studio**: fora da lista; "Arashi Gaiden" conta só para a Wired Dreams.
- Bloqueios e limites: itch.io (429) foi lido uma vez por página, com pausa; lunaraxe.com (522) e Gematsu (403) não foram lidos; nenhum bloqueio foi contornado.
- Autorização dos estúdios para publicar logos e dados: pendente.

## Resultado da 1ª rodada (2026-11-05, histórico)
A planilha `dados/levantamento-estudios-maranhenses.xlsx` não existia e foi criada com as colunas do `plan.md` e as 6 linhas da lista acima, mais a coluna "Fonte dos dados". Logos achadas: Wired (DeVuego), OPS (DeVuego), Astral (Linktree), Clops (site); Hardcoffee e Onin ficaram com a marca.

## Resultado esperado
- A planilha `dados/levantamento-estudios-maranhenses.xlsx` atualizada com os dados dos estúdios, incluindo logo quando possível.
- Arquivos de logo de cada estúdio em `public/estudios/`.
- Lista de pendências: estúdios sem logo, sem site e sem fonte para a descrição.
- Só mostrar e buscar os estudios listados acima

## Atualização de 2026-11-09
A marca da **Wired Dreams Studio** é a imagem enviada pela associação (`wired-dreams-studio.jpg`, 712 x 280 px), no lugar da logo baixada do DeVuego (`wired-dreams-studio.png`, removida).
