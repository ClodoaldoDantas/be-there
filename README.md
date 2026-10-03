# Be There

Aplicação de confirmação de presença em eventos. O convidado informa nome, WhatsApp e quantos acompanhantes levará; os dados são salvos no banco e a lista de confirmações pode ser consultada via API. Projeto de estudo e demonstração.

## Stack

- **Nuxt 4** + Vue 3 + TypeScript
- **Tailwind CSS v4**
- **VeeValidate** + **Zod** (formulário e validação)
- **Turso (libSQL)** + **Drizzle ORM**
- **pnpm** como gerenciador de pacotes

## Pré-requisitos

- Node.js 20+
- pnpm
- Uma conta/banco no [Turso](https://turso.tech)

## Setup

1. Instale as dependências:

   ```bash
   pnpm install
   ```

2. Configure as variáveis de ambiente em `.env` (baseie-se em `.env.example`):

   ```bash
   TURSO_CONNECTION_URL=libsql://...
   TURSO_AUTH_TOKEN=...
   ```

3. Aplique as migrations no banco:

   ```bash
   pnpm db:migrate
   ```

4. (Opcional) Popule o banco com convidados de exemplo:

   ```bash
   pnpm db:seed
   ```

## Desenvolvimento

Inicie o servidor em `http://localhost:3000`:

```bash
pnpm dev
```

## Scripts

| Comando | Descrição |
| --- | --- |
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm preview` | Pré-visualiza o build de produção |
| `pnpm lint` | Executa o ESLint |
| `pnpm lint:fix` | Corrige problemas de lint |
| `pnpm db:generate` | Gera migrations a partir do schema |
| `pnpm db:migrate` | Aplica as migrations no banco |
| `pnpm db:push` | Sincroniza o schema direto no banco |
| `pnpm db:studio` | Abre o Drizzle Studio |
| `pnpm db:seed` | Insere convidados de exemplo |

## API

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/api/guests` | Lista os convidados cadastrados |
| `POST` | `/api/guests` | Cadastra um convidado (`name`, `whatsapp`, `attendants`) |

Para conferir os convidados cadastrados, com o servidor rodando:

```bash
curl http://localhost:3000/api/guests
```

## Estrutura

```
app/            # Front-end (pages, components, layouts, assets)
database/       # Schema, client Drizzle e seed
server/api/     # Rotas do Nitro (endpoints)
specs/          # Especificações das features
```

## Fluxo

1. O usuário acessa `/` e preenche o formulário (`ConfirmationForm`).
2. O app envia `POST /api/guests` e persiste a confirmação.
3. Em caso de sucesso, navega para `/confirmed`.
4. A lista cadastrada pode ser conferida em `GET /api/guests`.
