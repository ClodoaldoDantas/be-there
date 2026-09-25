# AGENTS.md

App Nuxt 4 + Vue 3 + Tailwind v4.

## Comandos
- O gerenciador de pacotes é o **pnpm** (usa `pnpm-lock.yaml`). Não use npm/yarn.
- `pnpm dev` — servidor de desenvolvimento em `http://localhost:3000` (`devtools` habilitado).
- `pnpm build` / `pnpm preview` — build de produção / servir localmente.
- `pnpm lint` / `pnpm lint:fix` — ESLint via `@nuxt/eslint`.
- `pnpm install` dispara `postinstall: nuxt prepare`, que regenera os tipos do `.nuxt/` (gitignored) (auto-imports, refs do tsconfig).

## Estrutura
- Layout de srcDir `app/` do Nuxt 4: `app/pages`, `app/components`, `app/assets/css`.
- `app/pages/*.vue` são roteadas por arquivo automaticamente; não existe `app.vue`.
- Components (`BaseButton`, `BaseInput`, `BaseIconWrap`) são **auto-importados** — não adicione imports explícitos para eles.
- Ícones do Lucide **não** são auto-importados; importe os ícones nomeados de `@lucide/vue` (ex.: `import { CircleAlert } from '@lucide/vue'`).

## Estilização
- O Tailwind v4 é conectado através do plugin `@tailwindcss/vite` no `nuxt.config.ts`, e não do módulo `@nuxt/tailwindcss`.
- Os design tokens ficam em `app/assets/css/main.css` sob `@theme` (`--color-*`, `--font-*`). Use os nomes de utilitários semânticos, não hex bruto: `bg-accent`, `text-ink`, `text-muted`, `border-line`, `bg-soft`, `text-error`, `font-display`.
- Prefira a escala nativa do Tailwind a valores arbitrários entre colchetes ou pixels crus. Arredonde valores de design para o passo mais próximo (`text-5xl` em vez de `text-[46px]`, `pb-8` em vez de `pb-[30px]`, `tracking-widest` em vez de `tracking-[2.4px]`). O espaçamento dinâmico do Tailwind v4 (`h-108`, `gap-7`) é válido; valores `[...]` e em `px` são último recurso.

## Convenções
- Estilo do ESLint (definido em `nuxt.config.ts` `eslint.config.stylistic`): sem ponto e vírgula, aspas simples, sem vírgula final, indentação de 2 espaços. O `eslint.config.mjs` é gerado a partir do `.nuxt/`.
- As mensagens de commit seguem Conventional Commits (`feat: ...`); a branch padrão é `main`.
