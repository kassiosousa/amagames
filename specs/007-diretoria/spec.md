# Spec 007 — Diretoria

**Status:** implementada (v1, 2026-11-08)
**Data:** 2026-11-08

## Contexto e problema
A página `/#/diretoria` mostra hoje cinco cartões de lugar ("A confirmar") e um aviso de que os nomes não eram públicos. A associação passou a lista oficial da diretoria (9 pessoas, com funções) e as fotos de cada membro em `public/diretoria/`. Esta spec troca os cartões de lugar pelos membros reais, com foto, nome e função, na ordem da lista enviada. A relação entre foto, pessoa e função está em [research.md](./research.md).

## Usuários
- **Público, imprensa, poder público e parceiros** que querem saber quem conduz a associação.
- **Desenvolvedores e estudantes** que procuram a quem se dirigir.
- **Equipe da AMAGAMES**, que atualiza os nomes e as fotos sem mexer em componentes.

## Requisitos funcionais
- **RF-01** A página `/#/diretoria` mostra os membros da diretoria em **cartões**, na ordem da lista oficial, em dois grupos: **Diretoria** (6 membros) e **Diretoria Jr** (3 membros), cada grupo com seu subtítulo. A linha em branco da lista oficial marca a separação entre os dois grupos.
- **RF-02** A ordem e as funções, exatamente como na lista oficial:
  1. Diretor Executivo — Kassio Sousa
  2. Diretor de Relações Públicas — Heitor Dias
  3. Diretora de Comunicação — Jasmyn Lemos
  4. Diretora de Comunicação — Raissa Kaline
  5. Diretor de Processos — Leonardo Lindoso
  6. Diretor de Comunidade — Rafael Solano
  7. Diretor Jr de Comunidade — Osvaldo Neto
  8. Diretor Jr de Comunicação — Marcos Januário
  9. Diretor Jr de Comunidade — Yanne Moraes
- **RF-03** Cada cartão mostra, nesta ordem: a **foto** (quadrada, recortada para enquadrar o rosto na metade de cima), o **nome** e a **função**. A função aparece com o texto da lista oficial (inclusive "Diretor" e "Diretora").
- **RF-04** A foto de cada membro vem de `public/diretoria/`, pela relação definida em research.md. Cada foto tem texto alternativo ("Foto de [nome]"). Quando o arquivo da foto faltar ou não carregar, o cartão mostra um quadrado com as **iniciais** do nome, e não a marca da AMAGAMES.
- **RF-05** Os dados dos membros (nome, função, foto e grupo) ficam em `src/data.js` (`board`), e a página só os exibe. Trocar um nome ou uma foto não exige mexer no componente.
- **RF-06** O aviso antigo ("Os nomes da diretoria atual não são públicos…") e os cinco cartões "A confirmar" são removidos.
- **RF-07** O link "Conheça a diretoria" da home e a opção "Diretoria" do menu continuam levando a `/#/diretoria`.

## Requisitos não funcionais
- **RNF-01** Em viewport de 360 px não há rolagem horizontal; os cartões ficam 1 por linha (2 a partir de 640 px e 3 a partir de 1024 px).
- **RNF-02** As fotos são carregadas sob demanda (`loading="lazy"`) e têm largura e altura definidas, para a página não "pular".
- **RNF-03** O texto cabe sem corte em nomes e funções longos (quebra de linha, sem reticências).
- **RNF-04** O visual segue a identidade do site: borda fina, traço colorido da paleta no topo do cartão, sem sombras.

## Cenários de aceite
- **CA-01 (RF-01, RF-02)** Dado `/#/diretoria`, então aparecem 9 cartões, na ordem da lista oficial, 6 sob "Diretoria" e 3 sob "Diretoria Jr".
- **CA-02 (RF-03)** Dado qualquer cartão, então aparecem foto, nome e função, nessa ordem; a função mantém "Diretor" ou "Diretora" como na lista.
- **CA-03 (RF-04)** Dado cada membro, então a foto exibida é a do arquivo indicado em research.md e o texto alternativo é "Foto de [nome]".
- **CA-04 (RF-04)** Dado um membro cujo arquivo de foto não existe, então o cartão mostra as iniciais e o resto do cartão fica igual.
- **CA-05 (RF-05)** Dado uma alteração em `board`, então a página reflete o nome, a função ou a foto novos sem outra mudança de código.
- **CA-06 (RF-06)** Dado a página, então não aparecem "A confirmar" nem o aviso antigo.
- **CA-07 (RNF-01)** Dado 360 px, então não há rolagem horizontal e os cartões ficam um por linha.

## Fora de escopo (v1)
Biografias, redes sociais ou contatos dos membros, cargos de mandato (datas de posse e de término), cartões clicáveis, ordem alfabética, planilha para a diretoria (são 9 pessoas e ficam em `src/data.js`), foto de grupo e histórico de diretorias anteriores.

## Decisões
- Ordem e funções: exatamente como na lista oficial enviada pela associação (imagem), inclusive a distinção entre Diretoria e Diretoria Jr.
- Os dados ficam em `src/data.js`, e não em planilha: a lista é curta e muda pouco.
- O nome exibido é o confirmado pela associação em 2026-11-08: **Heitor Dias** (a lista enviada trazia "Heitor Couto") e **Marcos Januário** (a lista trazia "Marcos Januario", sem acento). Os arquivos das fotos mantêm os nomes originais.

## Decisões da associação (2026-11-08)
- O sobrenome de Heitor é **Dias** (confirmado), e o nome de Marcos tem acento: **Marcos Januário**.
- A associação **revisou a relação foto, nome e função** de cada cartão e a aprovou.
- **Todas as fotos da diretoria têm autorização** de uso e de publicação no site (confirmado pela associação em 2026-11-08).

## Pontos em aberto
Nenhum no momento. A associação revisou e aprovou a relação foto–nome–função (tarefa T-08 da v1, 2026-11-08), incluindo as grafias dos nomes e a autorização de imagem.
