---
tags: [tecnico, stack]
---

# Stack e Dependências

← [[00 - Início]] · relacionado: [[Arquitetura Atual (Web)]]

## Stack ativa

- **React 19** + **TypeScript** + **Vite 6** — SPA e build tool
- **Tailwind CSS 4** (`@tailwindcss/vite`) — estilização utilitária
- **shadcn/ui** sobre **Base UI** (`@base-ui/react`) — Dialog, Select, Tabs, Popover, etc.
- **Motion** (`motion/react`) — animações (contador de nota, transições)
- **Lucide React** — ícones
- **@fontsource-variable/geist** — fonte Geist Variable

## Dependências presentes mas não usadas pela calculadora

`@google/genai`, `express`, `dotenv` — heranças do template original do projeto (AI Studio). O README já documenta isso explicitamente. **Não portar para mobile** — ver suposição registrada no [roadmap.md](../../roadmap.md).

## Scripts (`package.json`)

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de produção
- `npm run lint` — na verdade roda `tsc --noEmit` (checagem de tipos, não é um linter tradicional)

## Lacuna conhecida

**Não há framework de testes configurado.** Antes de aplicar TDD (obrigatório, ver [[../../CLAUDE.md|CLAUDE.md]]), é preciso configurar um test runner — Vitest é a escolha natural por já rodar sobre a config do Vite existente.
