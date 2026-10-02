# Integração do formulário com a tabela guests

## 1. Objetivo

Persistir no banco (Turso + Drizzle) os dados enviados pelo `ConfirmationForm.vue`. Para isso, expor uma rota `POST /api/guests` no Nitro e fazer o formulário chamá-la, substituindo o `console.log` atual, que só navega para `/confirmed`.

## 2. Escopo

- Dentro: criação da rota `POST /api/guests` com validação e insert na tabela `guests`; integração do `ConfirmationForm.vue` com a rota usando `$fetch`; tratamento de sucesso e de erro no formulário.
- Fora: mudanças no schema/migrations ou na camada `database/` (já implementada em `specs/spec-database-turso-drizzle.md`); autenticação; listagem/edição de convidados; envio de WhatsApp; alterações visuais de design.

## 3. Requisitos

- REQ-001: Criar uma rota `POST /api/guests` que recebe `name`, `whatsapp` e `attendants`, insere uma linha na tabela `guests` e responde com o registro criado.
- REQ-002: A rota deve validar o corpo da requisição antes do insert, rejeitando dados inválidos.
- REQ-003: A rota deve retornar status `201` sem corpo de resposta quando o insert é bem-sucedido.
- REQ-004: A rota deve retornar status `400` com uma mensagem de erro legível quando a validação falhar, sem executar o insert.
- REQ-005: O `ConfirmationForm.vue` deve enviar o payload já normalizado (nome com `trim`, WhatsApp somente dígitos, `attendants` numérico) para `POST /api/guests`.
- REQ-006: O formulário deve navegar para `/confirmed` somente após resposta de sucesso da rota.
- REQ-007: Em caso de falha na rota ou na rede, o formulário deve interromper o estado de loading e exibir uma mensagem de erro ao usuário, sem navegar.
- SEC-001: O acesso ao banco deve permanecer exclusivamente server-side; `database/client.ts` e as variáveis `TURSO_CONNECTION_URL`/`TURSO_AUTH_TOKEN` não podem ser expostas ao client.
- CON-001: Usar `db` de `database/client.ts` via import explícito (`~~/database/client`), conforme a spec do banco.
- CON-002: Seguir o estilo do ESLint do projeto (sem ponto e vírgula, aspas simples, sem vírgula final, indentação de 2 espaços) e `pnpm` como gerenciador.

## 4. Interfaces e dados

Rota: `server/api/guests.post.ts`.

Corpo da requisição:

```ts
{
  name: string        // obrigatório, trim, min 3 caracteres
  whatsapp: string    // obrigatório, somente dígitos, 10 ou 11
  attendants: number  // inteiro, 0 a 3
}
```

Resposta de sucesso (`201`):
Sem corpo, apenas o status `201`.

Resposta de erro de validação (`400`):

```ts
{
  statusCode: 400
  statusMessage: string
}
```

Uso do banco na rota (referência; não implementar aqui):

```ts
import { db } from '~~/database/client'
import { guests } from '~~/database/schema'

await db.insert(guests).values({ name, whatsapp, attendants }).returning()
```

Chamada no formulário (referência):

```ts
await $fetch('/api/guests', {
  method: 'POST',
  body: payload
})
await navigateTo('/confirmed')
```

## 5. Critérios de aceite

- Dado o servidor em execução, quando um `POST /api/guests` com `name`, `whatsapp` e `attendants` válidos é enviado, então a tabela `guests` recebe uma nova linha e a resposta `201` é retornada.
- Dado um corpo com `name` vazio ou com menos de 3 caracteres, quando a rota é chamada, então retorna `400` e nenhuma linha é inserida.
- Dado um `whatsapp` com menos de 10 ou mais de 11 dígitos, quando a rota é chamada, então retorna `400` e nenhuma linha é inserida.
- Dado `attendants` fora do intervalo 0 a 3 ou não inteiro, quando a rota é chamada, então retorna `400` e nenhuma linha é inserida.
- Dado o formulário preenchido com dados válidos, quando o usuário confirma a presença, então o app chama `POST /api/guests` e só então navega para `/confirmed`.
- Dado que a rota responde com erro, quando o usuário confirma a presença, então o loading é encerrado, uma mensagem de erro é exibida e não há navegação para `/confirmed`.
- Dado o payload do formulário, quando o `whatsapp` é mascarado (`(11) 99999-0000`), então a rota recebe apenas os dígitos (`11999990000`).
- Dado o build do client, quando os bundles são inspecionados, então não contêm `TURSO_AUTH_TOKEN` nem o client do banco.

## 6. Arquivos afetados

- `server/api/guests.post.ts`: novo; valida o corpo e insere em `guests`, retornando o registro criado.
- `app/components/ConfirmationForm.vue`: substituir `console.log`/`delay` pela chamada `$fetch('/api/guests')`, navegar apenas em sucesso e exibir erro em falha.
- `database/schema.ts`: referência da tabela `guests` (sem alteração prevista).
- `database/client.ts`: referência da instância `db` (sem alteração prevista).

## 7. Questões em aberto

- Onde a mensagem de erro de REQ-007 deve aparecer: nos `errors` dos `BaseInput` (quando o erro for de campo) e/ou em um aviso geral do formulário?
- O schema de validação deve ser compartilhado entre client e server (ex.: em `shared/` ou `app/utils/`) para evitar duplicação, ou cada lado define o seu?
- Deve haver prevenção de duplicidade de `whatsapp` na tabela `guests`?
- Qual o formato final de erro da rota: o padrão `createError` do Nitro (`data`/`statusMessage`) ou um payload customizado?
