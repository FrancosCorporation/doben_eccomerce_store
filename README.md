# doben_eccomerce_store

## 🐳 Instalação e Execução (Docker) — recomendado

### Pré-requisitos
- [Docker](https://docs.docker.com/get-docker/) + Docker Compose

### Rodar com Docker
```bash
docker compose up --build
```


### Sem Docker (local)
```bash
npm install
npm start
```


Vitrine de e-commerce "DoBen" em **Next.js 13 (App Router) + TypeScript**, com listagem de produtos, carrossel de imagens por produto e zoom na foto.

![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-13-black?style=flat&logo=next.js)
![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-green)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

## Sobre

Projeto de loja virtual iniciado em setembro de 2023 para praticar o App Router do Next.js 13 com TypeScript e CSS Modules. A página inicial lê uma lista de produtos de um JSON local e renderiza cards com preço cheio, preço promocional, seleção de fotos por "bolinhas" e zoom da imagem. O catálogo é fictício, com URLs de imagens externas de exemplo.

## Funcionalidades

Comprovadas pelo código:

- Listagem de produtos a partir de `src/data/produtos.json` (título, preço cheio, preço promocional e galeria de URLs) (`src/app/page.tsx`);
- Card de produto com galeria navegável por indicadores, zoom ao clicar na imagem e botão visual "ADD" (`src/componentes/produto.tsx`, `src/componentes/produto.module.css`);
- Rodapé com marca "By: FrancosCorp" e espaços reservados para redes sociais (`src/componentes/footer.tsx`);
- Metadados em pt-BR (`title: DoBen`, `description: Realizando seus Sonhos !`) no layout raiz.

## Stack

- **Next.js 13.4** (App Router) + **React 18**
- **TypeScript 5**
- **CSS Modules** (`page.module.css`, `produto.module.css`) + CSS global
- **Vercel CLI** listado como dependência (usado para testes de deploy, sem script configurado)

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`. Outros scripts:

```bash
npm run build   # build de produção
npm start       # serve o build
npm run lint    # next lint
```

## Estrutura do projeto

```
.
├── src/
│   ├── app/
│   │   ├── layout.tsx        # metadados e layout raiz
│   │   ├── page.tsx          # vitrine (carrega produtos)
│   │   ├── page.module.css
│   │   └── globals.css
│   ├── componentes/
│   │   ├── produto.tsx       # card com galeria e zoom
│   │   ├── produto.module.css
│   │   └── footer.tsx
│   ├── data/produtos.json    # catálogo fictício
│   └── icons/                # ícones de redes sociais (ainda não usados no footer)
├── next.config.js
└── package.json
```

## Observações

- O carregamento do JSON é feito no cliente com `fetch('../src/data/produtos.json')` (caminho relativo), o que pode não funcionar em produção — a lista de produtos aparece vazia se o caminho não resolver. Ponto a revisar em uma próxima iteração.
- O rodapé usa imagens `via.placeholder.com`; os ícones versionados em `src/icons/` ainda não estão aplicados.
- Catálogo com dados/links de exemplo, sem integração com meios de pagamento ou estoque.

## Licença

MIT — veja [LICENSE](LICENSE).
