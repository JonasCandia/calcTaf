---
tags: [mobile, design, tokens]
---

# Tokens Visuais

← [[00 - Início]] · relacionado: [[Decisões UX Web → Mobile]], [[Stack e Dependências]]

Extraído de `src/index.css`. Esta é a especificação de referência para os temas do Compose (Android) e do `ColorScheme`/`Font` extensions (iOS) — não é para copiar CSS, é para recriar os mesmos valores com a API nativa de cada plataforma.

## Cores — modo claro

| Token | Valor | Uso |
|---|---|---|
| `bg` / `surface` | `#eef2f5` | Fundo da tela e dos cards |
| `primary` | `#021859` | Azul institucional — títulos, ações primárias, badge "Excelente" |
| `primary-foreground` | `#ffffff` | Texto sobre `primary` |
| `accent` | `#CDA96A` | Dourado — destaque, badge "Bom" |
| `brand-red` / `destructive` | `#D90404` | Erros, badge "Insuficiente" |
| `warning` | `#F2E416` | Avisos, badge "Regular" |
| `success` | `#16a34a` | Estado aprovado |
| `text` | `#011640` | Texto principal |
| `text-muted` | `#636e72` | Texto secundário/rótulos |

## Cores — modo escuro

| Token | Valor | Uso |
|---|---|---|
| `bg` / `surface` | `#011640` | Fundo da tela e dos cards |
| `primary` | `#021859` (troca para `#D90404` nos tokens shadcn de tema, ver nota abaixo) | Ver nota |
| `accent` | `#CDA96A` | Mantido igual ao claro |
| `success` | `#22c55e` | Estado aprovado (mais vivo que no claro) |
| `text` | `#f1f2f6` | Texto principal |
| `text-muted` | `#a4b0be` | Texto secundário |

> **Nota de inconsistência a resolver na implementação nativa:** o arquivo define duas camadas de tokens de cor (`--primary` na paleta "CBMRS" = `#021859` em ambos os temas, mas o bloco de tokens shadcn no fim do arquivo redefine `--primary` no modo escuro para `#D90404`). Isso é uma particularidade do tema shadcn atual — **confirmar visualmente no app web rodando em dark mode** qual comportamento é o pretendido antes de fixar o token no tema nativo, em vez de assumir um dos dois valores.

## Cores de conceito (fixas, não mudam com o tema)

| Conceito | Cor de fundo | Cor de texto |
|---|---|---|
| Excelente | `#021859` | branco |
| Muito Bom | `#0d2d8a` | branco |
| Bom | `#CDA96A` | branco |
| Regular | `#F2E416` | `#011640` |
| Insuficiente | `#D90404` | branco |

## Tipografia

- **Fonte principal:** Geist Variable (via `@fontsource-variable/geist`) — usada em todo o corpo do texto
- **Fonte monoespaçada (`technical-header`, `technical-value`):** declarada como `"JetBrains Mono", ui-monospace, SFMono-Regular, monospace` — **atenção:** não há import de JetBrains Mono no projeto (só o import da Geist existe); na prática, o navegador cai no fallback monoespaçado do sistema. Nativamente, usar a fonte monoespaçada padrão de cada plataforma (`monospace` no Compose via `FontFamily.Monospace`, `.monospaced()` no SwiftUI) é fiel ao comportamento real de hoje — não é necessário embutir JetBrains Mono
- **Padrão de rótulo técnico:** uppercase, `letter-spacing` amplo (`0.1em`), peso 600, tamanho pequeno (`0.75rem`) — preservar como padrão de componente reutilizável em ambas plataformas

## Forma (border-radius)

- Cards (`nm-card`): raio grande, ~20px
- Inputs/inset (`nm-inset`): ~12px
- Botões (`nm-btn`, `nm-btn-primary`): ~12px
- Escala shadcn adicional disponível no tema: `radius` base `0.625rem` (~10px), com variantes `sm`/`md`/`lg`/`xl`/`2xl`/`3xl`/`4xl` multiplicando esse valor — útil como referência de escala ao definir `shapes` no Material 3

## Elevação/sombra

O CSS usa sombras neumórficas duplas (`--nm-shadow-out`, `--nm-shadow-in`, `--nm-shadow-sm`). Conforme decisão em [[Decisões UX Web → Mobile]], **não replicar a técnica**; usar tonal elevation (Material 3) e materiais (iOS) mantendo a mesma hierarquia visual: card > inset (campo de entrada, aparência "afundada") > botão (aparência "elevada").

## Movimento

- Curva de easing padrão em toda a UI: `cubic-bezier(0.22, 1, 0.36, 1)` ("ease out quint") — usar a mesma curva nativamente (`CubicBezierEasing` no Compose, `.timingCurve(0.22, 1, 0.36, 1, duration:)` no SwiftUI)
- Respeitar `prefers-reduced-motion` (já implementado no CSS) — equivalente nativo: checar a preferência de acessibilidade do sistema (`Settings.Global.ANIMATOR_DURATION_SCALE`/`AccessibilityManager` no Android, `UIAccessibility.isReduceMotionEnabled` no iOS) e reduzir/eliminar animações não essenciais
