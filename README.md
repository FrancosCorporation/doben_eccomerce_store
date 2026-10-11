# DoBen · Papelaria & ideias

Vitrine demonstrativa de papelaria feita com Next.js App Router e TypeScript. O
catálogo vem de `src/data/produtos.json`, é renderizado no servidor e pode ser
filtrado pelo nome. Os cartões apresentam a galeria, o preço de exemplo e uma
visualização ampliada das fotos disponíveis.

> Os produtos e preços são exemplos. Esta aplicação não tem estoque, carrinho,
> checkout ou processamento de pagamentos.

## Requisitos

- Node.js 22.12 ou superior.
- Docker (opcional, para rodar a imagem de produção).

## Desenvolvimento

```bash
npm ci
npm run dev
```

Abra <http://localhost:3000>. O catálogo usa o JSON local diretamente, sem uma
requisição a um caminho privado de `src/`.

## Verificações locais

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

`npm start` serve o build de produção na porta 3000.

## Docker

```bash
docker build -t doben-store .
docker run --rm -p 3000:3000 doben-store
```

A imagem final usa a saída standalone do Next.js, inclui apenas os arquivos de
runtime necessários e executa como usuário sem privilégios.

## Dados e imagens

Os campos de `src/data/produtos.json` são `titulo`, `precoMaior` (preço anterior),
`precoMenor` (preço promocional) e `urls`. Links de exemplo foram removidos; se
uma foto estiver ausente ou indisponível, o cartão mostra uma ilustração local.
Imagens remotas são permitidas apenas nos domínios configurados em
`next.config.js`.

## Estrutura

```text
src/app/                 Página, layout, metadados e estilos globais
src/componentes/         Busca do catálogo, cartões acessíveis e rodapé
src/data/produtos.json   Produtos e valores ilustrativos
src/types/product.ts     Tipo dos itens do catálogo
public/favicon.svg       Ícone da vitrine
```

## Licença

MIT — veja [LICENSE](LICENSE).
