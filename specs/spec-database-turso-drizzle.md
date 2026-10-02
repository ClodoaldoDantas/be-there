# Spec — Banco de dados (Turso DB + Drizzle ORM)

Status: **implementado** — migration `0000_free_prima.sql` aplicada no Turso.

## Objetivo

Configurar a camada de banco de dados do projeto usando **Turso DB (libSQL)** + **Drizzle ORM**, expondo uma tabela para armazenar os convidados que preencherem o formulário de confirmação.

## Escopo

Cobrir **apenas a camada de banco**: schema, client Drizzle e migrations.

**Fora do escopo** (implementação posterior):
- Endpoint `POST /api/guests`.
- Integração do `app/components/ConfirmationForm.vue` para persistir no Turso.

## Decisões

- IDs gerados em **CUID2** via `@paralleldrive/cuid2` (`createId`), aplicados com `$defaultFn` no Drizzle.
- Campos: `id`, `name`, `whatsapp`, `attendants`, `created_at`.
- Variáveis de ambiente já presentes no `.env`:
  - `TURSO_CONNECTION_URL` (formato `libsql://...`)
  - `TURSO_AUTH_TOKEN`
- Tabela chamada `guests`.

## Dependências (pnpm)

| Pacote | Tipo |
| --- | --- |
| `drizzle-orm` | runtime |
| `@libsql/client` | runtime |
| `@paralleldrive/cuid2` | runtime |
| `drizzle-kit` | dev |
| `dotenv` | dev (para o `drizzle.config.ts` ler o `.env`) |

## Estrutura de arquivos

A pasta `database/` fica na **raiz do projeto** (fora de `server/`), por decisão de organização.

```
database/
  schema.ts        # definição da tabela guests
  client.ts        # instância do Drizzle (libsql)
  migrations/      # geradas pelo drizzle-kit
drizzle.config.ts  # config do drizzle-kit (dialect: 'turso')
```

> Como fica fora de `server/`, o `db` **não** é auto-importado — importe explicitamente (`import { db } from '~~/database/client'`).

## `database/schema.ts`

```ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { createId } from '@paralleldrive/cuid2'

export const guests = sqliteTable('guests', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  whatsapp: text('whatsapp').notNull(),
  attendants: integer('attendants').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
})
```

## `database/client.ts`

```ts
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!
})

export const db = drizzle(client, { schema })
```

Acesso server-side via `process.env`, exposto pelo Nitro em runtime. Nenhuma mudança de `runtimeConfig` é necessária neste escopo.

## `drizzle.config.ts`

```ts
import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './database/schema.ts',
  out: './database/migrations',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!
  }
})
```

## Scripts (`package.json`)

- `db:generate` → `drizzle-kit generate`
- `db:migrate` → `drizzle-kit migrate`
- `db:push` → `drizzle-kit push`
- `db:studio` → `drizzle-kit studio`

## Aplicar no Turso

1. `pnpm db:generate` — gera o SQL em `database/migrations/`.
2. `pnpm db:migrate` — aplica as migrations no banco remoto via `TURSO_CONNECTION_URL`.

## Verificação

- `pnpm lint` (ESLint: sem ponto-e-vírgula, aspas simples, indentação de 2 espaços).
- `pnpm exec drizzle-kit check` — valida config e schema.
- Confirmar a tabela `guests` no Turso (Studio ou `turso db shell`).

## Ordem de implementação

1. Instalar dependências (runtime + dev).
2. Criar `database/schema.ts`.
3. Criar `database/client.ts`.
4. Criar `drizzle.config.ts`.
5. Adicionar scripts `db:*` no `package.json`.
6. `pnpm db:generate`.
7. `pnpm db:migrate`.
8. Rodar `pnpm lint` e validar a tabela no Turso.
