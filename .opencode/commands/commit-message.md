---
description: Cria um commit usando o padrão Conventional Commits
agent: build
---

## Contexto
Crie commits git padronizados e semânticos usando o padrão Conventional Commits. Analise o diff para determinar o tipo, o escopo e a descrição do commit.

## Formato de Commit

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

O `scope` é opcional: use `<type>: <description>` quando a mudança for ampla.
Para mudanças que quebram compatibilidade, adicione `!` após o tipo/escopo (`feat(api)!: <descrição>`) e/ou um footer `BREAKING CHANGE: <descrição>`.

## Commit Types

| Type       | Purpose                        |
| ---------- | ------------------------------ |
| `feat`     | Nova feature                   |
| `fix`      | Correção de bug                |
| `docs`     | Atualização de documentação    |
| `style`    | Formatação/estilo (sem lógica) |
| `refactor` | Refatoração (sem feature/fix)  |
| `perf`     | Melhoria de performance        |
| `test`     | Adição/atualização de testes   |
| `build`    | Sistema de build/dependências  |
| `ci`       | Atualização de CI/config       |
| `chore`    | Manutenção e utilitários       |
| `revert`   | Reversão de commit anterior    |

## Workflow

### 1. Analisar as mudanças

```
# Status atual
git status --porcelain

# Se houver arquivos staged, use o diff staged
git diff --staged

# Senão, use o diff da working tree
git diff
```

### 2. Preparar o commit
- Se nada estiver staged, adicione apenas os arquivos relevantes com `git add <arquivos>`. Nunca use `git add -A` às cegas.
- Não inclua arquivos não relacionados nem segredos/credenciais.

### 3. Gerar a mensagem do commit
Analise o diff para determinar:
- **Tipo**: que tipo de mudança está sendo feita?
- **Escopo**: em qual parte do código a mudança acontece? (opcional)
- **Descrição**: resumo curto da mudança, no imperativo e no tempo presente (ex.: `add`, não `added`).

```
# Commit de uma linha
git commit -m "<type>(<scope>): <description>"

# Commit com corpo/footer
git commit -m "$(cat <<'EOF'
<type>(<scope>): <description>

<optional body>

<optional footer>
EOF
)"
```

### 4. Confirmar antes de criar o commit
Mostre um preview da mensagem e dos arquivos que serão commitados e peça confirmação ao usuário com a ferramenta de perguntas. Só execute `git commit` depois da confirmação.

## O que não deve ser feito
- NUNCA atualize o git config
- NUNCA execute comandos destrutivos (como `git reset --hard` ou `git push --force`)
- NUNCA pule hooks (como `git commit --no-verify`)
- NUNCA force push na branch principal
- NUNCA use `git commit --amend` em commits já publicados
- Se o commit falhar por causa de hooks, corrija o problema e faça um novo commit
