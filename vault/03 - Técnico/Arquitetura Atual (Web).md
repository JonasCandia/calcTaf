---
tags: [tecnico, arquitetura]
---

# Arquitetura Atual (Web)

← [[00 - Início]] · relacionado: [[Stack e Dependências]], [[Regras de Negócio]]

## Estrutura

```
src/
  App.tsx              # UI principal, estado do formulário, orquestração do cálculo
  lib/taf-utils.ts      # Regras de negócio puras (ver [[Regras de Negócio]])
  constants/taf-data.ts # Tabelas oficiais de pontuação (IR 001/2024)
  index.css / main.tsx
components/ui/          # Componentes shadcn/ui (button, card, dialog, select, table, tabs, ...)
lib/utils.ts             # Helper `cn` de merge de classes Tailwind
```

## Características que importam para decisões futuras

- **100% client-side.** Nenhuma chamada de rede é necessária para a aplicação funcionar — princípio que se mantém no mobile (ver [[Modelo de Negócio]]).
- **Lógica de negócio isolada da UI.** `taf-utils.ts` e `taf-data.ts` não importam nada de React — são funções e dados puros. Isso é o que torna viável a estratégia de compartilhamento de lógica via KMP descrita em [[Visão Geral do Projeto Mobile]]. **Preservar essa separação é uma regra de arquitetura, não só um detalhe de organização de pasta.**
- **Sem testes automatizados hoje.** `package.json` só tem `tsc --noEmit` como "lint" — não há Jest/Vitest configurado. Isso é um débito a resolver antes de aplicar TDD (ver [[../../CLAUDE.md|CLAUDE.md]]).

Detalhes de stack/versões: [[Stack e Dependências]].
