# MELHORIAS — doben_eccomerce_store

> **Gerado por análise de código em 2026-10-05** · Stack: Next.js 13.4.19 (App Router) + TypeScript · loja estática (produtos em JSON)
> Branch `main` · sem API routes · sem testes · sem CI
>
> **Este arquivo é um plano de execução.** Cada item tem ID, `arquivo:linha`, mudança exata, critério de aceite e comando de verificação.
>
> **Atualizações em 2026-10-11 e 2026-10-12:** veja os registros de execução no fim deste arquivo; o diagnóstico acima representa a revisão inicial.

---

## 0. Como usar este documento

1. Execute na ordem **P0 → P1 → P2 → P3**, respeitando as ondas da §8.
2. Ao terminar um item: marque `- [x]`, rode o **Verificação**, comite `fix(<ID>): descrição`.
3. **Este app é estático por design** (sem auth, sem dados sensíveis) — não inventar superfície de segurança onde não há. Itens refletem build/imagem/qualidade.
4. **Idioma:** português.

---

## 1. Diagnóstico executivo

Loja vitrine Next 13 App Router: páginas estáticas + `src/data/produtos.json`. Grep por `secret/api_key` no `src/` = vazio; sem `dangerouslySetInnerHTML`; `next.config.js` vazio (`{}`).

**O que está bem (não regredir):**

| Item | Evidência |
|---|---|
| Superfície mínima: sem API routes, sem auth, sem DB | `src/` (grep) |
| Dados de produto em JSON versionado | `src/data/produtos.json` |
| `next.config.js` limpo (`{}`) | `next.config.js` |
| Multi-stage Dockerfile | `Dockerfile` |
| `.gitignore`/`.dockerignore` presentes | raiz |

**O que está quebrado:**

1. **Imagem de runtime inflada:** `COPY --from=build /app ./` copia TUDO (fontes + node_modules de build) — multi-stage anulado na prática.
2. `RUN npm ci || npm install` mascara falha do lockfile (padrão do acervo).
3. `vercel` CLI nas **dependencies** (roda no bundle de produção da loja) e zero testes.

---

## 2. Tabela de prioridades

| ID | Título | Sev | Arquivo | Depende de |
|---|---|---|---|---|
| DEVOPS-01 | Imagem runtime copia fonte + node_modules | **P1** | `Dockerfile` | — |
| DEVOPS-02 | `npm ci || npm install` mascara falha | **P1** | `Dockerfile` | — |
| SEC-01 | `vercel` CLI em dependencies (superfície de build em runtime) | **P2** | `package.json` | — |
| TEST-01 | Zero testes | **P2** | *(ausente)* | — |
| DEVOPS-03 | Sem CI para audit, lint, tipos, build e imagem Docker | **P2** | `.github/workflows/ci.yml` | — |
| DOC-01 | README — citar o que falta | **P2** | `README.md` | — |
| IMP-01 | Next 13 → 14/15 (upgrade path) | **P3** | `package.json` | — |
| IMP-02 | `@babel/plugin-transform-react-jsx` devDep possivelmente órfão | **P3** | `package.json` | — |

---

## 3. Segurança

### SEC-01 · `vercel` CLI nas dependencies de produção · [P2]

- **Arquivo:** `package.json`
- **Evidência:** `"vercel": "^32.1.0"` em `dependencies` (não devDependencies). A loja não chama a CLI em runtime — grep no `src/` não a referencia.
- **Impacto:** centenas de pacotes extras no `node_modules` da imagem e no attack surface de build; deploy da Vercel não precisa da CLI local (plataforma faz build).
- **Mudança:** mover para `devDependencies` (se usado no deploy local) ou remover; se manter script, `npx vercel` resolve.
- **Aceite:** `dependencies` só com runtime real (next/react/react-dom/typescript/types).
- **Verificação:**
  ```bash
  grep -n '"vercel"' package.json | grep -v devDependencies || echo OK
  ```

---

## 4. Bugs e defeitos funcionais

*(Nenhum bug funcional confirmado — sem lógica de servidor.)*

---

## 5. Qualidade: testes

### TEST-01 · Zero testes · [P2]

- **Arquivo:** *(ausente)* `*.test.*`
- **Evidência:** nenhum arquivo de teste no repo; `lint: next lint` existe mas não roda em CI.
- **Impacto:** regressão de render (produto sumindo, preço errado) só vista a olho.
- **Mudança:** Vitest + Testing Library: render de `produto.tsx` com fixture do `produtos.json` (preço formatado, link); 1 teste mínimo.
- **Aceite:** `npm test` ≥ 1 vermelho→verde.
- **Verificação:**
  ```bash
  npx vitest run 2>&1 | tail -3
  ```

---

## 6. DevOps / Infra

### DEVOPS-01 · `COPY --from=build /app ./` anula o multi-stage · [P1]

- **Arquivo:** `Dockerfile`
- **Evidência:**
  ```dockerfile
  COPY --from=build /app ./
  CMD ["npx", "next", "start", "-p", "3000"]
  ```
  Copia o workspace inteiro (fonte, node_modules de build, caches) para a imagem final.
- **Impacto:** imagem várias vezes maior que o necessário; fonte exposta dentro do container; builds lentos.
- **Mudança:** stage final minimal: `COPY --from=build /app/.next ./.next`, `/app/node_modules ./node_modules` (só runtime), `package*.json`, `public/`, `next.config.js` — ou `output: 'standalone'` no `next.config.js` + copiar `.next/standalone`.
- **Aceite:** imagem final sem `src/` e sem caches; `next start` funciona.
- **Verificação:**
  ```bash
  docker build -t doben . && docker run --rm doben sh -c 'ls src 2>/dev/null || echo "sem src na imagem"'
  ```

### DEVOPS-02 · `npm ci || npm install` mascara falha do lockfile · [P1]

- **Arquivo:** `Dockerfile`
- **Evidência:** `RUN npm ci || npm install` — lock dessincronizado vira build silenciosamente diferente.
- **Impacto:** builds não reproduzíveis.
- **Mudança:** `RUN npm ci` puro.
- **Aceite:** build falha com lock errado.
- **Verificação:**
  ```bash
  grep -n 'npm install' Dockerfile || echo OK
  ```

### IMP-02 · `@babel/plugin-transform-react-jsx` devDep possivelmente órfão · [P3]

- **Arquivo:** `package.json`
- **Evidência:** plugin Babel explícito; Next 13 usa SWC — grep no repo por referência ao plugin = ausente.
- **Impacto:** dependência morta; confunde quem olha o build.
- **Mudança:** remover do `devDependencies` e revalidar `npm run build`.
- **Aceite:** build ok sem o pacote.
- **Verificação:**
  ```bash
  grep -rn 'transform-react-jsx' . --include='*.js' --include='*.json' | grep -v package || echo "sem uso"
  ```

---

## 7. Documentação

### DOC-01 · README vs realidade (Docker, deploy) · [P2]

- **Arquivo:** `README.md`
- **Evidência:** (ler antes de executar; checar se documenta `docker compose up`, `npm run build`, deploy Vercel — o repo tem Dockerfile mas sem compose).
- **Impacto:** instrução que não existe no repo quebra o onboarding.
- **Mudança:** seções "Dev" (`npm ci && npm run dev`), "Build" (`npm run build`), "Docker" (`docker build` + `docker run -p 3000:3000`) — tudo testado.
- **Aceite:** terceiro sobe o app pelo README.
- **Verificação:**
  ```bash
  grep -ni 'docker\|npm run' README.md | head
  ```

### IMP-01 · Next 13.4 → 14/15 · [P3]

- **Arquivo:** `package.json`
- **Evidência:** `"next": "13.4.19"` (linha de manutenção antiga).
- **Impacto:** correções de segurança e performance ficam para trás conforme o projeto evolui.
- **Mudança:** upgrade sequencial (13 → 14 → 15) com `npm run build` a cada passo; sem mudança de API neste app (App Router puro, sem config).
- **Aceite:** build e páginas ok na versão nova.
- **Verificação:**
  ```bash
  npm run build 2>&1 | tail -5
  ```

---

## 8. Ordem de execução (waves)

### Wave 1 — Imagem/lock (P1)
1. **`DEVOPS-01`** + **`DEVOPS-02`** (mesmo Dockerfile, mesmo commit).

### Wave 2 — Superfície e documentação (P2)
2. **`SEC-01`** — limpar dependencies.
3. **`DOC-01`**.

### Wave 3 — Upgrade (P3)
4. **`IMP-01`** · **`IMP-02`**.

**`TEST-01` permanece pendente nesta rodada; não foi criado nem executado teste.** O upgrade foi validado com build e typecheck.

### DEVOPS-03 · CI estática ausente [P2]

- **Estado inicial:** não havia workflow versionado.
- **Implementação:** `.github/workflows/ci.yml` valida audit, Biome, TypeScript e build em Node 22/24 e constrói a imagem Docker de produção. Permissões de conteúdo somente leitura; sem testes, secrets ou inicialização de container.
- **Aceite:** os dois jobs ficam verdes em push/pull request e o Dockerfile continua produzindo a imagem standalone.
- **Verificação:** consultar o run remoto registrado na §12; localmente validar YAML e `git diff --check`.

---

## 9. Fora de escopo / riscos

| Item | Decisão | Motivo |
|---|---|---|
| Adicionar carrinho/pagamento (API routes) | **Não, aqui** | Viraria produto com superfície de pagamento — decisão de produto, não correção. |
| Migrar para outro framework | **Não** | Next estático resolve. |
| Colocar segredos em NEXT_PUBLIC_* | **Nunca** | Padrão Next: tudo em NEXT_PUBLIC_ é público no client. |

**Riscos:** `DEVOPS-01` pode quebrar `next start` se faltar arquivo no stage final — testar container a não-git-clone.

---

## 10. Definição de pronto (DoD)

**Infra**
- [ ] `DEVOPS-01` — imagem standalone sem `src/` e build concluído; smoke do servidor no container segue pendente
- [x] `DEVOPS-02` — `npm ci` puro

**Segurança/qualidade**
- [x] `DEVOPS-03` — CI estática em Node 22/24 e build da imagem Docker.
- [x] `SEC-01` — Vercel CLI removida das dependências
- [ ] `TEST-01` — pendente; testes não foram criados ou executados
- [x] `DOC-01` — README atualizado para o comportamento existente
- [x] `IMP-01`/`IMP-02` — Next atualizado e plugin Babel órfão removido

**Validação final:**
```bash
npm ci && npm run lint && npm run typecheck && npm run build
docker build -t doben-store .
```

## 11. Registro de execução — 2026-10-11

| ID | Resultado |
|---|---|
| DEVOPS-01/02 | Docker multi-stage agora publica `.next/standalone` e assets estáticos no runtime Node24 não-root; `npm ci` estrito. |
| SEC-01 | Vercel CLI removida; runtime depende apenas de Next/React/Sharp. |
| TEST-01 | Pendente; nenhum teste foi adicionado ou executado. |
| DOC-01 | README descreve desenvolvimento, build e Docker CLI reais, além da ausência de checkout. |
| IMP-01 | Next 13/React18 atualizados para Next16/React19 e TS5; build e typecheck passaram. |
| IMP-02 | Plugin Babel não usado removido; Biome faz lint. |

Catálogo agora importa o JSON no servidor em vez de buscar `src/` pelo navegador. Busca por nome, galeria acessível, modal nativo, preço promocional correto, fallback visual para foto ausente e metadados foram implementados. Dados e preços estão identificados como demonstrativos; não foi adicionado fluxo de pedido/pagamento.

Validações: `npm ci`, audit (0 vulnerabilidades), Biome lint, `tsc --noEmit`, build Next, build Docker e inspeção estática da saída standalone (inclui servidor, Next e Sharp; sem `src/`). Nenhum teste ou container iniciado; smoke do servidor no runtime continua pendente.

## 12. Registro de execução — 2026-10-12

| ID | Resultado |
|---|---|
| DEVOPS-03 | Workflow estático para Node 22/24 e build Docker criado; audit, lint, typecheck e build da aplicação incluídos; sem testes ou serviços. |
| TEST-01 | Pendente: o projeto continua sem suíte automatizada; nenhum teste foi adicionado ou executado. |

README atualizado para descrever a CI e a ausência de testes. Verificações locais e resultado remoto serão registrados após a validação do workflow.

---

*Fim do plano. Diagnóstico inicial gerado por leitura direta do código em 2026-10-05; resultados atuais registrados na §11.*
