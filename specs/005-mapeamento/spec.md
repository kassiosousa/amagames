# Spec 005 — Mapeamento do ecossistema

**Status:** implementada (v1)
**Data:** 2026-11-06

## Contexto e problema
A página `/#/mapeamento` mostra hoje só os números do mapeamento de **2023** (35 respostas, 65,7% de devs individuais etc.) e um gráfico de faturamento que termina em 2023, com o valor de 2022 calculado por estimativa. A pasta `public/mapeamento/` já reúne os infográficos oficiais de 2019, **2021**, 2022, 2023, 2024 e **2025**, além do artigo SBGames 2024. O mapeamento foi feito em 2019 e, depois, de 2021 em diante: **não existe mapeamento de 2020**. O site antigo da associação está fora do ar, por isso este site novo reúne os dados do zero. Esta spec passa a mostrar os dados **mais atuais (2025)**, atualiza o gráfico de faturamento com a série completa e deixa a escolha de outros anos. Os números foram transcritos dos infográficos para uma planilha (ver [research.md](./research.md)), no mesmo modelo das specs 002, 003 e 004.

## Usuários
- **Poder público, Sebrae e empresas** que consultam números do setor para decidir apoios e parcerias.
- **Imprensa e pesquisadores** que citam o ecossistema maranhense.
- **Estúdios e desenvolvedores** que acompanham a evolução da comunidade.

## Requisitos funcionais
- **RF-01** A página `/#/mapeamento` abre com os **detalhes do mapeamento mais recente** (hoje 2025) logo no início, e o título mostra o ano ("Mapeamento 2025").
- **RF-02** Os indicadores do ano aparecem em seções, na ordem do infográfico: **Faturamento e produção** (faturamento, jogos autorais, plataformas, lançamentos, parcerias com publisher, desenvolvedores com projetos em andamento para o ano seguinte), **Editais**, **Serviços prestados**, **Participação em eventos**, **Festivais**, **Perfil da comunidade**, **Contratos** e **Diversidade**. Indicadores sem valor no ano escolhido não aparecem.
- **RF-03** O **gráfico de faturamento** usa a série da planilha (2019, 2021, 2022, 2023, 2024 e 2025), com barras proporcionais, valor em reais por extenso e a variação percentual sobre o ano **mapeado** anterior (ex.: 2025: +35% sobre 2024; 2021 é comparado com 2019). 2020 não aparece como barra: uma nota informa que não houve mapeamento nesse ano.
- **RF-04** No bloco de detalhes, à **direita**, há uma **aba lateral de anos** (2025, 2024, 2023, 2022, 2021, 2019, do mais recente ao mais antigo). Clicar em um ano troca os dados detalhados à esquerda para aquele ano; o ano ativo fica destacado. Em telas pequenas (abaixo de 1024 px) a aba vira uma fileira de anos acima dos dados. O ano escolhido fica na URL (`/#/mapeamento?ano=2023`). Um ano inexistente na URL volta ao mais recente.
- **RF-05** **Abaixo de todos os dados** da página (depois do gráfico de faturamento) há o link **"Visualizar Infográfico"** do ano em detalhe. Ao clicar, o arquivo PDF do infográfico é mostrado ao usuário (abre em nova aba, no visualizador de PDF do navegador). O link indica o ano e o tamanho do arquivo (2021: 2,7 MB; 2025: 1,3 MB).
- **RF-06** Uma linha de **fonte** acompanha os números: "Fonte: Mapeamento do ecossistema de desenvolvimento de jogos do Maranhão (ano). Design: Heitor Dias." Para 2023 há também o link para o artigo SBGames 2024 (página pública `sol.sbc.org.br`; o PDF local foi retirado da pasta).
- **RF-07** Todos os dados vêm da planilha `public/mapeamento/levantamento-mapeamento-ecossistema.xlsx` (abas Faturamento, Indicadores e Fontes), como fonte de verdade. Um script gera `src/mapping.json`.
- **RF-08** Os dados antigos escritos à mão (`mapeamento` e `faturamento` de `src/data.js` e o texto fixo de 2023 em `Pages.jsx`) são removidos.
- **RF-09** A **origem dos dados** fica explícita na página: 2021 vem do infográfico de 2021, e o faturamento de 2021 (R$ 568.000) é confirmado pelo artigo SBGames 2024. Sob o gráfico há uma nota: "Não houve mapeamento em 2020; o mapeamento foi feito em 2019 e depois de 2021 em diante."

## Requisitos não funcionais
- **RNF-01** Em viewport de 360 px não há rolagem horizontal; os indicadores se reorganizam em 1 ou 2 colunas.
- **RNF-02** Gráficos feitos em HTML/CSS, sem biblioteca; barras com texto alternativo (valor e ano em texto).
- **RNF-03** Campos vazios na planilha escondem o elemento; nada de "undefined".
- **RNF-04** Os PDFs não são carregados com a página; só baixam quando o usuário abre o link. Os PDFs de **2025 (27 MB para 1,3 MB)** e de **2021 (16 MB para 2,7 MB)** foram comprimidos (decisão da associação).

## Cenários de aceite
- **CA-01 (RF-01)** Dado `/#/mapeamento` sem parâmetro, então aparece "Mapeamento 2025" com faturamento de R$ 1,35 milhão e 26 jogos autorais.
- **CA-02 (RF-02)** Dado 2025, então aparecem as 8 seções e, em Participação em eventos, 8 itens somando os percentuais do infográfico.
- **CA-03 (RF-03)** Dado o gráfico, então há 6 barras (2019, 2021, 2022, 2023, 2024, 2025) em ordem cronológica, com variação de 2025 sobre 2024 e a nota de que não houve mapeamento em 2020.
- **CA-04 (RF-04)** Dado a aba de anos à direita, quando clico em 2023, então a URL vira `?ano=2023` e a página mostra os números de 2023 (20 jogos autorais, 30 submissões em editais). Quando escolho 2021, aparecem 15 estúdios, 25 jogos autorais e 64 contratações geradas.
- **CA-05 (RF-04)** Dado `?ano=1999`, então a página mostra o ano mais recente.
- **CA-06 (RF-05)** Dado qualquer ano em detalhe, então o link "Visualizar Infográfico" está abaixo de todos os dados e, ao clicar, o PDF desse ano abre em nova aba.
- **CA-07 (RF-09)** Dado o gráfico, então a nota sobre a ausência de mapeamento em 2020 está visível, e a fonte de 2021 (infográfico e artigo) está indicada.
- **CA-08 (RF-07)** Dado uma linha alterada na planilha, quando rodo `npm run mapping` (ou `dev`/`build`), então o site reflete a mudança sem mexer em código.
- **CA-09 (RNF-01)** Dado 360 px, então não há rolagem horizontal e a aba de anos aparece como fileira acima dos dados.

## Fora de escopo (v1)
Dados por município, mapeamento de 2020 (não foi feito), comparação lado a lado de dois anos, gráficos interativos, download da planilha e novos levantamentos.

## Decisões da associação (2026-11-06)
- O infográfico de **2021** foi adicionado à pasta e passa a fazer parte do mapeamento.
- **2020 não tem dados**: o mapeamento foi feito em 2019 e depois de 2021 em diante.
- O **site antigo da AMAGAMES está fora do ar**; este site novo reúne os dados do zero, então nenhum link para o site antigo é usado.
- Os PDFs de **2025 e de 2021 foram comprimidos** (27 MB para 1,3 MB e 16 MB para 2,7 MB).
- Os anos ficam numa **aba à direita** do bloco de detalhes, e o **link "Visualizar Infográfico"** fica abaixo de todos os dados.

## Pontos em aberto
- [A CONFIRMAR] **Transcrição** dos números a partir dos infográficos (feita à mão, a conferir pela associação, principalmente 2019, 2021 e 2022, que são imagens sem texto).
- [A CONFIRMAR] **2019 e 2021 têm formato diferente** dos anos de 2022 a 2025 (por exemplo, 2021 não traz participação em eventos nem serviços por local; 2019 traz demografia, engines e coworkings). A página mostra só os indicadores que existem em cada ano.
- [A CONFIRMAR] **2021** mostra "25 jogos", "18 de prestação de serviço" e "25 autorais": os números não se somam; foram transcritos como aparecem. Conferir o significado.
- [A CONFIRMAR] Faturamento de 2024 e 2025 aparece arredondado ("1 milhão", "1,35 milhão"); existe o valor exato?
