---
name: pencil-to-vue
description: Converte a camada selecionada no Pencil (pen.dev) em um componente Vue no projeto Nuxt, fiel ao design e responsivo em mobile, tablet e desktop. Use quando o usuário pedir um componente Vue a partir de uma camada/nó do Pencil (ou de um arquivo .pen), ou pedir para adaptar o responsivo desse design.
---

# Pencil (pen.dev) → Componente Vue

Transforma camadas selecionadas no Pencil (ou nós indicados via MCP) em um componente Vue
neste projeto Nuxt, fiel ao design e responsivo.

## Passo 1 — Identificar as camadas
Leia no Pencil os **nodes selecionados** e o `.pen` ativo. Se não houver seleção nem indicação,
pergunte. Olhe o pai/frame para entender a seção.

## Passo 2 — Ler o design
Abra as camadas no Pencil e leia a árvore já com os valores resolvidos (cores, fontes), além de
tirar um screenshot para conferir o visual. Quando houver componentes reutilizáveis, os textos
chegam como substituições — use exatamente o que aparece ali.

## Passo 3 — Implementar
- Crie o componente `<NomePascalCase>.vue` em `app/components/`.
- UI repetida via `v-for`. 
- Use o texto literal do design — não assuma `uppercase`.

## Passo 4 — Responsividade
Compare o mesmo nó nos frames mobile/tablet/desktop do `.pen`. Breakpoints: mobile = base,
tablet = `md:`, desktop = `lg:`. Ex.: cards `md:flex-row md:flex-1`, título `text-3xl md:text-4xl`.
Se o **texto** mudar por breakpoint, mantenha os dois e alterne com `md:hidden` / `hidden md:block`
(evite `matchMedia` para não quebrar a hidratação).

## Passo 5 — Validar no browser
Utilize o MCP do Playwright para validar o que foi implementado no browser. Confira os estilos computados (`fontSize`, `letterSpacing`, `textTransform`) contra o design e o layout/contraste.
Valide nos 3 breakpoints: mobile, tablet, desktop.

## Passo 6 — Lint e limpeza
Rode `pnpm lint`, remova temporários e não commite sem o usuário pedir.

## Checklist
- [ ] Design e layout **exatos** (incluindo cores, fontes, espaçamento).
- [ ] Componentes base e ícones reutilizados; tokens semânticos, sem valores hardcoded.
- [ ] Responsivo validado nos 3 breakpoints; `pnpm lint` passando.
