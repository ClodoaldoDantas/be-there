# AGENTS.md

Nuxt 4 + Vue 3 + Tailwind v4 app. UI copy is in Portuguese.

## Commands
- Package manager is **pnpm** (uses `pnpm-lock.yaml`). Don't use npm/yarn.
- `pnpm dev` — dev server on `http://localhost:3000` (`devtools` enabled).
- `pnpm build` / `pnpm preview` — production build / serve it locally.
- `pnpm lint` / `pnpm lint:fix` — ESLint via `@nuxt/eslint`.
- `pnpm install` triggers `postinstall: nuxt prepare`, which regenerates the gitignored `.nuxt/` types (auto-imports, tsconfig refs).

## Structure
- Nuxt 4 `app/` srcDir layout: `app/pages`, `app/components`, `app/assets/css`.
- `app/pages/*.vue` are file-routed automatically; there is no `app.vue` or `layouts/` yet.
- Components (`BaseButton`, `BaseInput`, `BaseIconWrap`) are **auto-imported** — do not add explicit imports for them.
- Lucide icons are **not** auto-imported; import named icons from `@lucide/vue` (e.g. `import { CircleAlert } from '@lucide/vue'`).
- Components accept an optional `class` prop exposed as `customClass` (see `BaseIconWrap.vue`), because `class` collides with the native attr.

## Styling
- Tailwind v4 is wired through the `@tailwindcss/vite` plugin in `nuxt.config.ts`, not the `@nuxt/tailwindcss` module.
- Design tokens live in `app/assets/css/main.css` under `@theme` (`--color-*`, `--font-*`). Use the semantic utility names, not raw hex: `bg-accent`, `text-ink`, `text-muted`, `border-line`, `bg-soft`, `text-error`, `font-display`.

## Conventions
- ESLint style (set in `nuxt.config.ts` `eslint.config.stylistic`): no semicolons, single quotes, no trailing commas, 2-space indent. `eslint.config.mjs` is generated from `.nuxt/`.
- Commit messages follow Conventional Commits (`feat: ...`); default branch is `main`.
