# Spec 006 — Imprensa

**Status:** implementada (v1, 2026-11-07)
**Data:** 2026-11-07

## Contexto e problema
O site não tem um lugar para a cobertura da imprensa sobre a AMAGAMES e sobre os jogos feitos no Maranhão. Esta spec cria a opção **"Imprensa"** no menu principal e uma página semelhante à de **Projetos**: lista paginada, com filtros, de matérias e notícias. A lista é uma planilha, no mesmo modelo das specs 002 a 005, e a pesquisa inicial já levantou **22 matérias** de 2019 a 2026 (ver [research.md](./research.md)).

## Usuários
- **Imprensa e pesquisadores** que procuram cobertura anterior e fontes para novas matérias.
- **Poder público, Sebrae e empresas** que querem ver o reconhecimento do setor.
- **Estúdios e desenvolvedores**, que acompanham a visibilidade da comunidade.
- **Equipe da AMAGAMES**, que atualiza a lista pela planilha, sem mexer no código.

## Requisitos funcionais
- **RF-01** O menu principal ganha a opção **"Imprensa"**, que abre `/#/imprensa`. O link também aparece no rodapé. No celular, ela entra no menu recolhido, como as demais.
- **RF-02** A página `/#/imprensa` lista as matérias e notícias da planilha, **da mais recente para a mais antiga**, **12 por página**, com setas e números que levam às demais páginas (mesmo modelo de Projetos, Jogos e Estúdios). Matérias sem data vão para o fim. A página aparece com paginação quando houver mais de 12 itens (hoje 22, em 2 páginas).
- **RF-03** Cada item mostra: a **data** por extenso (ex.: "27 de agosto de 2026"), o **veículo**, o **tema**, o **título** como link para a matéria original (abre em nova aba), e um **resumo** curto escrito pela equipe. O título e o resumo não reproduzem o texto da matéria: o site leva o leitor à fonte.
- **RF-04** Acima da lista há dois **filtros**: **Tema** (Premiações e festivais, Eventos, Mercado, Festival Guarnicê) e **Ano** (do mais recente ao mais antigo). Cada filtro tem a opção "Todos"; os dois se combinam; ao filtrar, o total e a paginação refletem o resultado e voltam para a página 1; há o botão "Limpar filtros". O estado fica na URL (`?tema=&ano=&pagina=`).
- **RF-05** Acima da lista aparece o total ("22 matérias", ou o total do filtro aplicado).
- **RF-06** Itens com situação do dado **"Parcial"** ou **"A confirmar"** mostram a etiqueta **"Dado a confirmar"** (a data ou o conteúdo ainda precisa de checagem), em linha com a regra de não apresentar como certo o que não foi confirmado.
- **RF-07** Todos os dados vêm da planilha `dados/levantamento-imprensa.xlsx`, aba **Matérias**, como fonte de verdade. Um script gera `src/press.json`. Colunas: Data, Título, Veículo, Tema, Resumo, Link, Menciona a AMAGAMES, Situação do dado e Observação interna (esta última não aparece no site).
- **RF-08** A lista cobre matérias **sobre a AMAGAMES e sobre jogos e estúdios do Maranhão**, estejam ou não ligadas à associação. A coluna "Menciona a AMAGAMES" (Sim, Não ou Não verificado) fica na planilha para uso interno e **não** aparece nos cards nesta versão.
- **RF-09** Matérias que são **republicação** de outra (por exemplo, a reportagem da Agência Sebrae reproduzida em outros veículos) entram como itens próprios, cada um com o seu veículo e a sua data.

## Requisitos não funcionais
- **RNF-01** Em viewport de 360 px não há rolagem horizontal.
- **RNF-02** Todos os links externos abrem em nova aba com `rel="noopener noreferrer"` e indicam isso a leitores de tela.
- **RNF-03** Campos vazios na planilha escondem o elemento (nada de "undefined").
- **RNF-04** Direitos autorais: o site mostra só título, veículo, data e um resumo próprio, sempre com o link para a fonte; não copia o corpo das matérias nem usa imagens delas.

## Cenários de aceite
- **CA-01 (RF-01)** Dado qualquer página, então o menu principal mostra "Imprensa" e, ao clicar, abre `/#/imprensa`; o rodapé tem o mesmo link.
- **CA-02 (RF-02)** Dado `/#/imprensa`, então aparecem 12 matérias na primeira página, em 2 páginas, com setas e números funcionais, da mais recente (03/09/2026) para a mais antiga (01/08/2019).
- **CA-03 (RF-03)** Dado um item, então aparecem data por extenso, veículo, tema, título (link para nova aba) e resumo, nessa ordem.
- **CA-04 (RF-04)** Dado Tema = "Festival Guarnicê", então a lista mostra 4 matérias; combinado com Ano = 2026, mostra 2.
- **CA-05 (RF-04)** Dado um filtro aplicado na página 2, quando o filtro muda, então a lista volta para a página 1; "Limpar filtros" restaura as 22 matérias.
- **CA-06 (RF-05)** Dado um filtro aplicado, então o total acima da lista é o do resultado (por exemplo, "4 matérias").
- **CA-07 (RF-06)** Dado as matérias da Agência Sebrae Nacional ("A confirmar") e do G1 Maranhão ("Parcial"), então elas mostram "Dado a confirmar"; matérias "Confirmado" não mostram.
- **CA-08 (RF-07)** Dado uma linha editada ou acrescentada na planilha, quando rodo `npm run press` (ou `dev`/`build`), então a página reflete a mudança sem mexer em código.
- **CA-09 (RNF-01)** Dado viewport de 360 px, então não há rolagem horizontal e o menu recolhido tem a opção "Imprensa".

## Fora de escopo (v1)
Busca por texto, filtro por veículo, imagens ou miniaturas das matérias, cópia do texto das matérias, atualização automática da lista (a equipe acrescenta linhas à planilha), página individual de cada matéria, mostrar o campo "Menciona a AMAGAMES", clipping de redes sociais, vídeos e podcasts.

## Decisões
- Menu: "Imprensa" entra ao lado de Diretoria, Projetos e Mapeamento.
- A página segue o desenho de Projetos (filtros, total, 12 por página, paginação), por pedido da associação.
- Artigos acadêmicos (por exemplo, o do SBGames 2024) **não** entram: a página é de imprensa.
- Uma matéria que não cita Maranhão nem a AMAGAMES fica de fora (aba "Fora da lista" da planilha).

## Pontos em aberto
- [A CONFIRMAR] A lista é a de uma **primeira pesquisa** na web: a associação deve acrescentar o que conhece (televisão, rádio, jornais impressos, outros portais) e que não aparece na busca.
- [A CONFIRMAR] **Datas** de algumas matérias vêm do metadado da página (a da Agência Sebrae Nacional é a única marcada "A confirmar").
- [A CONFIRMAR] Matéria do **G1 Maranhão** (2021): a página não abriu para a pesquisa; o título e o resumo vêm da descrição da página.
- [A CONFIRMAR] Fazer clipping de 2022, 2023 e 2025: a busca achou pouco sobre as Global Game Jam desses anos.
- [A CONFIRMAR] Mostrar a coluna "Menciona a AMAGAMES" como etiqueta nos cards?
