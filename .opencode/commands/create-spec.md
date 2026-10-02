---
description: Criar uma especificação para um novo recurso
agent: build
---

Crie uma especificação para: $ARGUMENTS

Se `$ARGUMENTS` estiver vazio, pergunte ao usuário qual recurso especificar antes de continuar.

## Regras
- Salve em `specs/spec-<slug>.md`. Crie a pasta `specs/` se ela não existir.
- `<slug>`: derivado do título, minúsculo, kebab-case, sem acentos nem pontuação (ex.: "Login com Google" → `login-with-google`). O nome do arquivo deve ser em inglês.
- Se o arquivo já existir, NÃO sobrescreva: avise o usuário e peça a decisão (renomear ou revisar o existente).
- Escreva em pt-BR, com frases curtas e sem ambiguidade. Não use emojis.
- Explore o código antes de escrever (leia @AGENTS.md e busque os arquivos relevantes). Baseie-se no que já existe; não invente APIs, tipos, props nem caminhos.
- Não implemente nada e não altere código. Só escreva o arquivo da spec.
- Cada requisito deve ser testável. Se algo estiver indefinido, registre em "Questões em aberto" e não suponha.
- Garanta que todo REQ-### tenha ao menos um critério de aceite correspondente.

## Template
Use exatamente esta estrutura (mantenha a numeração e os IDs):

# <título>

## 1. Objetivo
<1-3 frases: o que e por quê>

## 2. Escopo
- Dentro: ...
- Fora: ...

## 3. Requisitos
- REQ-001: ...
- SEC-001: ...  (segurança, se aplicável)
- CON-001: ...  (restrições)

## 4. Interfaces e dados
<APIs, tipos, props, schemas, eventos. Use blocos de código.>

## 5. Critérios de aceite
- Dado <contexto>, quando <ação>, então <resultado>.

## 6. Arquivos afetados
- `caminho/arquivo`: <mudança prevista>

## 7. Questões em aberto
- <dúvida ou decisão pendente que possa afetar a implementação>

Ao terminar, responda apenas com o caminho do arquivo criado e um resumo de 1-2 linhas.
