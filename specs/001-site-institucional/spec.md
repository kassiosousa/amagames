# Spec 001 — Site institucional AMAGAMES

**Status:** implementada (v1, conteúdo parcial)
**Data:** 2026-11-03

## Contexto e problema
A AMAGAMES (fundada em 2013, São Luís) não tem uma vitrine pública que reúna associação, estúdios, jogos, projetos e dados do ecossistema. Associações regionais pesquisadas (Abragames, ADJogosRS, Ascende, ACJogos-AL, BIND) seguem o mesmo padrão: quem somos, associados, ações, parceiros; diretoria e mapeamento em páginas próprias. Ver [research.md](./research.md).

## Usuários
- **Desenvolvedores e estudantes** que querem conhecer a comunidade, se associar e acompanhar as ações.
- **Poder público, Sebrae e empresas** que buscam parceiros, estúdios e dados.
- **Imprensa e publishers** que procuram jogos e estúdios maranhenses.

## Requisitos funcionais
- **RF-01** Cabeçalho fixo com marca, links para as seções da home (o primeiro, "Início") e para as páginas Diretoria, Projetos e Mapeamento. Lista de estúdios e Lista de jogos são acessadas pelos links das seções da home e pelo rodapé.
- **RF-02** Carrossel de fotos/destaques logo abaixo do cabeçalho, com autoplay, setas, indicadores e pausa ao passar o mouse. Quando houver foto definida em `src/data.js` a foto fica no canto direito com efeito na borda esquerda de opacidade gradual para integrar com a cor do fundo. Quando não houver foto, fica a marca com opacidade.
- **RF-03** Home com seções, nesta ordem: Quem somos, Estúdios associados, Jogos da comunidade, Projetos e ações, Parceiros.
- **RF-04** Páginas adicionais: Diretoria, Lista de estúdios, Lista de jogos, Projetos e Mapeamento (`/#/diretoria`, `/#/estudios`, `/#/jogos`, `/#/projetos`, `/#/mapeamento`).
- **RF-05** Cada seção da home leva à página completa correspondente quando existir.
- **RF-06** Clicar numa seção do menu estando em outra página volta à home e rola até a seção.
- **RF-07** Todo conteúdo vem de `src/data.js`; dados desconhecidos aparecem como "A confirmar".
- **RF-08** A página Mapeamento mostra indicadores e o histórico de faturamento (2019, 2021, 2022, 2023).
- **RF-09** Rodapé com links de navegação, Instagram e contato.
- **RF-10** Identidade visual minimalista conforme o Manual de Identidade Visual: paleta institucional, Raleway/Roboto e a assinatura/símbolo oficiais no cabeçalho, carrossel e rodapé.

## Requisitos não funcionais
- **RNF-01** Funciona em 360 px de largura sem rolagem horizontal; menu colapsável abaixo de `lg`.
- **RNF-02** Carrossel e menu com `aria-label`/`aria-expanded`; slides inativos com `aria-hidden`.
- **RNF-03** Build estático (`npm run build`) servível sem configuração de servidor.
- **RNF-04** Sem erros no console em carga e navegação.

## Cenários de aceite
- **CA-01 (RF-02)** Dado a home aberta, quando 5s passam sem hover, então o slide avança; ao passar o mouse, pausa.
- **CA-02 (RF-03)** Dado a home, então as seções aparecem na ordem de RF-03 abaixo do carrossel.
- **CA-03 (RF-04)** Dado cada link de página extra, quando clicado, então a página correspondente abre no topo.
- **CA-04 (RF-06)** Dado `/#/jogos`, quando clico em "Parceiros", então a home abre rolada até Parceiros.
- **CA-05 (RF-07)** Dado um item com `confirmar: true`, então a UI sinaliza que o dado precisa de confirmação.
- **CA-07 (RF-10)** Dado qualquer página, então só as cores da paleta institucional (e neutros) aparecem, o logo não está deformado e o texto tem contraste legível sobre cada fundo.
- **CA-06 (RNF-01)** Dado viewport de 360 px, então não há rolagem horizontal.

## Fora de escopo (v1)
Cadastro/área do associado, formulário de filiação, CMS, blog/relatos, i18n, busca.

## Pontos em aberto
- [A CONFIRMAR] Nomes e cargos da diretoria atual.
- [A CONFIRMAR] Lista oficial de estúdios associados (hoje só OPS Studio).
- [A CONFIRMAR] Estúdio responsável por Red Ronin, UniDuni, Origami Flight e Maranhão Encantado.
- [A CONFIRMAR] URL do Instagram e e-mail de contato.
