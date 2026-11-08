# Spec 004 — Projetos e ações ("O que a AMAGAMES faz")

**Status:** v1 e **v2 implementadas** (lista paginada de ações e eventos, com filtros, em `/#/projetos`; 2026-11-07)
**Data:** 2026-11-06 (v2: 2026-11-07)

## Contexto e problema
A seção "Projetos e ações realizadas" da home ("O que a AMAGAMES faz") e a página `/#/projetos` usam uma lista escrita à mão em `src/data.js` (`projects`), com 6 itens e um traço colorido como único elemento visual. Esta spec leva a lista para uma planilha, no mesmo modelo das specs 002 (jogos) e 003 (estúdios), e dá a cada ação um **ícone próprio**, em vez de repetir a marca da AMAGAMES ou um traço genérico. A lista inicial tem **somente as 6 ações que já aparecem hoje no site**. A planilha e os ícones já foram criados (ver [research.md](./research.md)).

**v2.** A planilha oficial passou a ter uma segunda aba, **"Edições"**, com 30 edições de eventos e ações da AMAGAMES (ver [research.md](./research.md)). A aba **Projetos** do menu (`/#/projetos`) deixa de repetir os 6 cards da home e passa a mostrar a **lista de ações e eventos realizados, de forma paginada**, a partir dessa aba. A home continua com os 6 cards das ações.

## Usuários
- **Público geral, poder público, Sebrae e empresas** que querem entender o que a associação faz.
- **Desenvolvedores e estudantes** que procuram eventos e iniciativas para participar.
- **Equipe da AMAGAMES**, que atualiza a lista pela planilha sem mexer no código.

## Requisitos funcionais
- **RF-01** Na tela inicial, a seção "Projetos e ações realizadas" lista as ações da planilha em grade (3 por linha em ≥ 1024 px, 2 em telas médias e 1 por linha em 360 px), na ordem da coluna **Ordem**. A home mostra no máximo 6; com as 6 ações iniciais, todas aparecem.
- **RF-02** Cada ação mostra o **ícone** acima, o **tipo** (ex.: "Evento anual", em letras maiúsculas pequenas), o **nome** e a **descrição**.
- **RF-03** O ícone de cada ação é específico dela e vem da coluna **Ícone** da planilha (arquivo SVG local em `public/acoes/`). Quando a coluna estiver vazia ou o arquivo não existir, usa-se o ícone genérico `./acoes/generico.svg`. **A marca da AMAGAMES não é usada como substituto.**
- **RF-04** Logo acima, no canto direito, há o link "Todos os projetos" que leva para `/#/projetos`.
- **RF-05** A página `/#/projetos` ("Projetos" no menu) mostra a **lista paginada de ações e eventos realizados**, tirada da aba "Edições" da planilha. A lista tem **12 itens por página**, com setas e números que levam às demais páginas (mesmo modelo das páginas de jogos e estúdios), e aparece com paginação sempre que houver mais de 12 itens (hoje 30, ou seja, 3 páginas). Os 6 cards das ações ficam só na home.
- **RF-06** Todos os dados devem ser obtidos da planilha `dados/levantamento-acoes-realizadas-com-edicoes.xlsx`, como fonte de verdade: a aba **Ações** alimenta a home (`src/actions.json`) e a aba **Edições** alimenta a página Projetos (`src/editions.json`). Um script gera os dois arquivos (mesmo modelo de `games.json` e `studios.json`).
- **RF-07** Se a ação tiver **Link**, o nome vira link: endereço que começa com `/` abre a página interna (ex.: `/mapeamento`); `http(s)://` abre em nova aba. Sem link, o nome fica sem link.
- **RF-08** A lista inicial da aba **Ações** contém **apenas** estas 6 ações, nesta ordem: Global Game Jam São Luís, Mapeamento do Ecossistema, Relato Trimestral, Missões técnicas (Sebrae-MA), Mostra de jogos no Guarnicê e MAGE – Maranhão GameDev Event. Novas ações só entram quando a associação acrescentar linhas à planilha. A aba **Edições** não tem esse limite: entram todas as linhas dela.
- **RF-09** Cada item da lista de Projetos mostra, nesta ordem: o **ícone** (o da ação vinculada, ou o genérico quando o item não está ligado a nenhuma das 6 ações; a marca da AMAGAMES não é usada); o **rótulo** (nome da ação vinculada ou "Evento"); o **nome do evento ou ação** e a **edição** (ex.: "Edição 2024"); o **ano de realização**; a **descrição**; **parceiros e apoio**; e a **fonte** da informação. **Por enquanto, data e local não são exibidos** (decisão da associação, enquanto os dados estão incompletos): continuam na planilha e no `editions.json` e voltam a aparecer ao ligar a opção `SHOW_DATE_AND_PLACE` no `EditionCard`. Campos vazios não aparecem.
- **RF-10** A lista é ordenada do **mais recente para o mais antigo**, pelo ano; no mesmo ano vale a ordem da planilha. Itens sem ano vão para o fim.
- **RF-11** Acima da lista aparece o total ("30 ações e eventos", ou o total do filtro aplicado). Itens cuja "Situação do dado" é **"Parcial"** ou **"A confirmar"** (17 de 30 hoje) mostram a etiqueta **"Dado a confirmar"**, em linha com a regra de não apresentar como certo o que não foi confirmado; os "Confirmado" não mostram etiqueta.
- **RF-12** O nome do item vira link quando a coluna **Link** da aba Edições está preenchida (`/rota` abre a página interna, por exemplo `/mapeamento?ano=2023`; `http(s)://` abre em nova aba). A **fonte** vira link externo (nova aba) quando a coluna "Link da fonte" está preenchida.
- **RF-13** A página atual fica na URL (`/#/projetos?pagina=2`); página inexistente volta para a mais próxima válida. Esta versão não tem busca por texto.
- **RF-14** Acima da lista há dois **filtros**: **Tipo de ação** e **Ano**. O tipo é a coluna "Tipo" da ação vinculada (Evento anual, Pesquisa, Transparência, Mercado, Cultura, Evento); itens sem ação vinculada têm o tipo "Evento". O ano lista os anos que existem na planilha, do mais recente ao mais antigo. Cada filtro tem a opção "Todos"; os dois se combinam; ao filtrar, o total e a paginação refletem o resultado e voltam para a página 1; há o botão "Limpar filtros". O estado fica na URL (`?tipo=&ano=&pagina=`).

## Requisitos não funcionais
- **RNF-01** Em viewport de 360 px não há rolagem horizontal.
- **RNF-02** Ícones são decorativos para leitores de tela (`alt` vazio): o nome da ação já descreve o conteúdo.
- **RNF-03** Os ícones seguem a identidade visual: traço preto fino e arredondado, com um toque de cor da paleta institucional (vermelho, amarelo, azul ou azul escuro), em 64×64 px.
- **RNF-04** Campos vazios na planilha escondem o elemento (nada de "undefined").

## Cenários de aceite
- **CA-01 (RF-01)** Dado a home, então a seção mostra 6 cards na ordem da planilha, 3 por linha em desktop.
- **CA-02 (RF-02)** Dado qualquer card, então aparecem ícone, tipo, nome e descrição, nessa ordem.
- **CA-03 (RF-03)** Dado cada uma das 6 ações, então o ícone exibido é o próprio dela (jogo/relógio, mapa com gráfico, relatório, avião, claquete, grupo de pessoas) e nenhum card mostra a marca da AMAGAMES.
- **CA-04 (RF-03)** Dado uma ação sem ícone na planilha, então o card mostra o ícone genérico.
- **CA-05 (RF-04)** Dado a home, quando clico em "Todos os projetos", então abre `/#/projetos`.
- **CA-06 (RF-05)** Dado `/#/projetos` com 30 itens, então aparecem 12 por página, em 3 páginas, com setas e números funcionais; a primeira página traz os itens mais recentes.
- **CA-07 (RF-06)** Dado uma linha editada ou acrescentada nas abas da planilha, quando rodo `npm run actions` (ou `dev`/`build`), então o site reflete a mudança (home pela aba Ações, Projetos pela aba Edições) sem mexer em código.
- **CA-08 (RF-07)** Dado "Mapeamento do Ecossistema" (link `/mapeamento`), quando clico no nome, então abre a página Mapeamento na mesma aba; as ações sem link não são clicáveis.
- **CA-09 (RNF-01)** Dado viewport de 360 px, então não há rolagem horizontal, os cards da home ficam 1 por linha e os itens da lista de Projetos ocupam a largura toda.
- **CA-10 (RF-09)** Dado um item da lista, então aparecem ícone, rótulo, nome, edição, ano, descrição, parceiros e fonte, nessa ordem, e só os campos preenchidos; **data e local não aparecem**.
- **CA-11 (RF-09)** Dado "Game Jam + 2019", que não está ligado às 6 ações, então o item mostra o ícone genérico e o rótulo "Evento".
- **CA-12 (RF-10)** Dado a primeira página, então o primeiro item é do ano mais recente da planilha (2026) e os itens vêm em ordem decrescente de ano.
- **CA-13 (RF-11)** Dado um item "A confirmar" (por exemplo, MAGE 2023) ou "Parcial" (por exemplo, Edição 2022 da Global Game Jam), então ele mostra a etiqueta "Dado a confirmar"; um item "Confirmado" (por exemplo, Edição 2024 da Global Game Jam) não mostra.
- **CA-15 (RF-14)** Dado Tipo de ação = "Cultura", então a lista mostra só as 6 edições da Mostra de jogos no Guarnicê e o total "6 ações e eventos".
- **CA-16 (RF-14)** Dado Ano = 2025, então a lista mostra os 4 itens de 2025; combinado com Tipo = "Pesquisa", mostra só o Mapeamento 2025.
- **CA-17 (RF-14)** Dado um filtro aplicado em uma página além da primeira, quando o filtro muda, então a lista volta para a página 1; "Limpar filtros" restaura os 30 itens.
- **CA-14 (RF-12)** Dado "Mapeamento 2023" (link `/mapeamento?ano=2023`), quando clico no nome, então abre o Mapeamento de 2023 na mesma aba; um item com "Link da fonte" mostra a fonte como link para nova aba.

## Fora de escopo (v1)
Novas ações além das 6 listadas na aba Ações, página individual de cada ação ou edição, linha do tempo ou agrupamento por ação, busca por texto e outros filtros além de tipo e ano, fotos, exibição de data e local das edições (ficam fora até a associação completar os dados), edições que a associação ainda não tenha informado.

## Decisões da associação (2026-11-06)
- Paginação só quando passar de 12 ações (RF-05).
- Ícones gerados: **aprovados** para uso.
- **Decisões de 2026-11-07:** os 6 cards das ações ficam **só na home**; a etiqueta "Dado a confirmar" vale para os itens "Parcial" e "A confirmar"; a lista tem **filtros por tipo de ação e por ano**; enquanto os dados estão incompletos, **só o ano de realização** é exibido (sem data e local); a ordem no mesmo ano segue a planilha.
- **v2:** a página Projetos mostra a **lista paginada de ações e eventos** (aba "Edições"), no lugar dos 6 cards repetidos.
- A planilha oficial passa a ser `levantamento-acoes-realizadas-com-edicoes.xlsx`, com as abas "Ações" (usada pelo site) e "Edições" (histórico por edição, ainda sem uso no site).
- Texto da Global Game Jam: a primeira edição em São Luís foi em 2012 e a associação foi fundada na edição de 2013; "há mais de uma década" está correto e foi mantido.

## Pontos em aberto
- [A CONFIRMAR] **Links** das ações: só o Mapeamento tem link (interno). Faltam os da Global Game Jam São Luís, do MAGE e do Relato Trimestral; a busca não achou endereço público confirmado (ver research.md).
- [A CONFIRMAR] Campos extras úteis, se a associação quiser: ano ou periodicidade de cada ação.
- [A CONFIRMAR] As 30 edições da aba estão em revisão: vários itens "Parcial" e "A confirmar" aguardam datas e locais da associação.
