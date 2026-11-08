# Pesquisa 004

## O que foi feito ao criar a spec (2026-11-06)
- **Planilha criada:** `dados/levantamento-acoes-realizadas-com-edicoes.xlsx`, aba `Ações`, com **somente as 6 ações que já estavam na lista do site** (texto copiado de `src/data.js`, sem alterações): Global Game Jam São Luís, Mapeamento do Ecossistema, Relato Trimestral, Missões técnicas (Sebrae-MA), Mostra de jogos no Guarnicê e MAGE – Maranhão GameDev Event.
- **Ícones gerados** (SVG feito à mão para este projeto, sem imagens de terceiros), um por ação, mais um genérico. Estilo: traço preto fino e arredondado, 64×64, um toque de cor da paleta institucional. Desenhos e arquivos estão no [plano](./plan.md).
- **Link** preenchido só para o Mapeamento, que aponta para a página interna `/mapeamento`. Os demais ficaram em branco: nenhum link público foi confirmado.

## Fontes das descrições (já levantadas nas pesquisas 001 e 003)
| Ação | Fonte |
|---|---|
| Global Game Jam São Luís | O Imparcial (jan/2026): AMAGAMES sedia a GGJ em São Luís, edição 2026 no Complexo Trapiche; SBGames 2024 |
| Mapeamento do Ecossistema | SBGames 2024, "Mapeamento do Ecossistema Maranhense de Desenvolvimento de Jogos 2023" (https://sol.sbc.org.br/index.php/sbgames/article/view/32421) |
| Relato Trimestral | Citado no mesmo artigo como "Relato Trimestral 2022-4" (publicado no antigo site da associação) |
| Missões técnicas (Sebrae-MA) | SBGames 2024: missão ao BIG Festival (2019, 11 representantes) com apoio do Sebrae-MA |
| Mostra de jogos no Guarnicê | SBGames 2024: parceria com o Festival Guarnicê de Cinema (2023); O Imparcial anuncia a 6ª mostra competitiva (2026) |
| MAGE – Maranhão GameDev Event | O Imparcial (ago/2025) cita o MAGE entre os eventos do estado |

## Pesquisa a fazer (não executada)
Para a associação revisar e completar depois, **sem inventar**:
1. **Links públicos** de cada ação (página da Global Game Jam São Luís no site da GGJ, relatos trimestrais, MAGE, mostra do Guarnicê).
2. **Datas e periodicidade** (ano de cada edição) caso se queira acrescentar uma coluna.
3. ~~Conferir o texto "há mais de uma década" da Global Game Jam~~ **Resolvido pela associação:** a primeira edição em São Luís foi em 2012 e a AMAGAMES foi fundada na edição de 2013. O texto foi mantido.
4. ~~Revisar os ícones~~ **Aprovados pela associação.** Se quiserem outro desenho no futuro, substituir o arquivo mantendo o nome, ou trocar o caminho na coluna "Ícone".

## Busca de links (2026-11-06) — nenhum link confirmado
- **Global Game Jam São Luís**: a matéria do O Imparcial (jan/2026) não traz link de inscrição nem de site. A listagem de sites de jam da GGJ (`globalgamejam.org/jam-sites`) é carregada por script e o filtro por país retornou 403, que não foi contornado. Não há página confirmada do site de São Luís.
- **MAGE – Maranhão GameDev Event**: não achei site oficial. Há homônimos que **não são** o mesmo evento: MAGE Jam (itch.io), MAGE 2024 (Maracanaú, CE, no Sympla) e "MAGE XP 2026" (cultura pop e games, citado pelo iMirante), este último sem confirmação de ser o mesmo.
- **Relato Trimestral**: o artigo da SBGames cita `https://www.amagames.com.br/category/relato/`, mas o domínio antigo não respondeu (tempo esgotado) e nenhuma busca o indexou. O novo site vai assumir esse domínio, então um link para o caminho antigo quebraria.
- **Para preencher**: a associação pode informar os endereços (ou as páginas do Instagram), e basta escrevê-los na coluna "Link" da planilha.

## Aba "Edições" (2026-11-06)
Criada na planilha de ações, com **30 edições** de eventos e ações da AMAGAMES, ligadas ou não às 6 ações da primeira aba. Colunas: Ação vinculada, Evento ou ação, Edição, Ano, Data, Local, Descrição, Parceiros e apoio, Link, Fonte, Link da fonte e Situação do dado (Confirmado, Parcial ou A confirmar). **Usada pela página Projetos na v2** (a v1 lia só a primeira aba): a lista paginada de `/#/projetos` mostra estas 30 edições, mais recentes primeiro; a home continua com os 6 cards da aba Ações.

| Ação | Edições | Observação |
|---|---|---|
| Global Game Jam São Luís | 8 (2012, 2013, 2020, 2022, 2023, 2024, 2025, 2026) | Datas e locais confirmados em 2020, 2024 e 2026; 2022 e 2023 só têm o local (Sebraelab); 2025 sem local e datas |
| Mapeamento do Ecossistema | 7 (2019, 2021 a 2025 e a publicação no SBGames 2024) | Dos infográficos da pasta `public/mapeamento` e do artigo |
| Mostra de jogos no Guarnicê | 6 (2021 a 2026, da I à VI mostra) | Datas confirmadas em 2025 e 2026; a numeração de 2021 a 2024 foi deduzida a partir da "5ª mostra" de 2025 |
| MAGE | 4 (2022 a 2025) | Só aparece nos infográficos como evento de que 20% a 50% dos desenvolvedores participaram; sem data, local ou programação |
| Missões técnicas (Sebrae-MA) | 2 (BIG Festival 2019 e 2021) | Do artigo SBGames 2024 |
| Relato Trimestral | 1 (4º trimestre de 2022) | Só esta edição aparece citada; o site antigo está fora do ar |
| Sem vínculo com a primeira aba | 2 | Game Jam + 2019 (02 a 04/08/2019, Sebraelab) e o balanço de 62 eventos organizados até 2019 |

**Fontes:** O Imparcial (2019, 2020, 2022, 2024, 2025, 2026), iMirante (jul/2026), site do Festival Guarnicê (47ª edição), artigo SBGames 2024 e os infográficos da pasta de mapeamento. Cada linha traz a fonte e, quando existe, o link.

**Não encontrado (ficou de fora ou em branco):**
- Datas, temas e números das Global Game Jam de 2022, 2023 e 2025 em São Luís.
- Qualquer edição de MAGE, Bro Game Jam, Women Game Jam e MAGE Jam com data ou local (aparecem só na lista de eventos do infográfico de 2019). Os resultados da busca de Women Game Jam e MAGE Jam apontam para eventos de outras organizações, não para a AMAGAMES.
- **MGD – Maranhão Games Direct** não entrou: aparece nos infográficos de 2024 como evento de participação, mas nada indica que seja organizado pela AMAGAMES.
- Lista de premiados da VI Mostra (2026) e a divergência entre 16 e 20 jogos selecionados.
- Relatos trimestrais além do 4º trimestre de 2022.

**Para a associação revisar:** o ano e a numeração das mostras do Guarnicê de 2021 a 2024; as datas e locais das edições "Parcial" e "A confirmar"; e as edições que só a associação conhece (MAGE, Bro Game Jam, Women Game Jam, MAGE Jam, relatos, workshops e palestras).

## Regras
- Não adicionar ações além das 6 listadas até a associação pedir.
- Ícones: somente SVG autoral do projeto ou com licença que permita o uso; registrar a origem na coluna "Origem do ícone".
- Dado que não for encontrado fica em branco: não inventar.

## Resultado esperado
- Planilha `dados/levantamento-acoes-realizadas-com-edicoes.xlsx` com as 6 ações.
- Um ícone específico por ação em `public/acoes/` (feito).
- Lista de pendências: links, datas e revisão visual dos ícones.
