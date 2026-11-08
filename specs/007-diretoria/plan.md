# Plano 007 — Diretoria

**Spec:** ./spec.md

## Abordagem
Mudança pequena e sem script: os 9 membros ficam em `src/data.js` (`board`), agrupados, e a página `Diretoria` os desenha em cartões. A página sai de `Pages.jsx` para um arquivo próprio (`src/pages/Diretoria.jsx`), no mesmo padrão das outras páginas. As fotos são servidas como estão, de `public/diretoria/`.

Alternativas descartadas: planilha de diretoria (são 9 pessoas, que mudam pouco) e renomear os arquivos das fotos (mantidos como a associação enviou).

## Modelo de dados (`src/data.js`)
`board` deixa de ser uma lista plana de cargos e vira uma lista de grupos:

```js
export const board = [
  { group: 'Diretoria', members: [{ name, role, photo }, ...] },
  { group: 'Diretoria Jr', members: [...] },
]
```

`photo` é o caminho `./diretoria/<arquivo>.jpg` (relação em research.md). A ordem do vetor é a ordem exibida.

## Arquitetura e arquivos afetados
| Arquivo | Mudança |
|---|---|
| `src/data.js` | `board` com os 2 grupos e os 9 membros |
| `src/pages/Diretoria.jsx` (novo) | Seções por grupo, grade de cartões |
| `src/components/MemberCard.jsx` (novo) | Cartão: foto quadrada com recorte no topo, nome, função; iniciais quando a foto faltar |
| `src/pages/Pages.jsx` | Remove o `Diretoria` antigo (e o arquivo some se ficar vazio) |
| `src/App.jsx` | Importa `Diretoria` do novo arquivo |

## Detalhes de interface
- Foto: `aspect-square`, `object-cover` com `object-position` 50% x 25%, para manter o rosto na área visível (a foto de Rafael é vertical e a de Jasmyn, horizontal).
- Grade: `sm:grid-cols-2 lg:grid-cols-3`; no desktop, a Diretoria fica em 2 linhas de 3 e a Diretoria Jr, em 1 linha de 3.
- Texto alternativo da foto: "Foto de [nome]". Falha de carregamento (`onError`) troca a foto pelas iniciais.
- Traço colorido no topo do cartão com as cores da paleta, em rodízio.

## Riscos e dependências
- **Foto e nome** relacionados pelo nome do arquivo, não por conferência visual da identidade.
- **Autorização de imagem** de cada membro.
- **Recorte quadrado** pode cortar parte do corpo nas fotos verticais, o que é aceito; o rosto fica visível.

## Verificação
`npm run build` limpo; abrir `/#/diretoria` em 1280 px e 360 px e conferir a ordem dos 9 cartões, a foto de cada um, o grupo "Diretoria Jr" e a ausência do aviso antigo.
