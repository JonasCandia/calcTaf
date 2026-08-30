---
tags: [mobile, ux, decisao]
---

# Decisões UX Web → Mobile

← [[00 - Início]] · relacionado: [[Visão Geral do Projeto Mobile]], [[Escopo do MVP Mobile]]

Fase 1 do [roadmap.md](../../roadmap.md) pede que cada divergência inevitável entre web e mobile seja **decidida**, não só listada. Registro aqui as decisões formais.

## 1. Impressão (`window.print()`)

**Decisão:** substituir por geração de PDF nativo + compartilhamento do sistema.
- Android: `PdfDocument`/Print Framework, disparado via `Intent.ACTION_SEND` ou `PrintManager`
- iOS: `UIGraphicsPDFRenderer` + `UIActivityViewController` (a folha de compartilhamento do iOS já expõe impressão via AirPrint como uma das opções, sem esforço extra)
- O PDF replica o cabeçalho institucional que hoje só aparece em `@media print` no CSS (nome da corporação, "TAF CBMRS", data do TAF, idade, sexo)
- **Validação obrigatória:** confirmar no beta fechado (Fase 6) que usuários reais aceitam essa substituição como equivalente ao "imprimir resultado" que já usam hoje

## 2. Modal de tabelas de referência (`Dialog` + `Tabs`)

**Observação útil:** o CSS atual já emula um comportamento de bottom sheet em telas pequenas (`max-sm:bottom-0 max-sm:rounded-t-2xl`, dialog "gruda" na base da tela). Ou seja, a decisão mobile só está formalizando algo que o design já sinalizava.

**Decisão:**
- Android: `ModalBottomSheet` (Material 3) com `TabRow` + `HorizontalPager` para as 4 modalidades
- iOS: `.sheet(isPresented:)` com `.presentationDetents([.large])`, conteúdo com segmented control ou `TabView(.page)` para as modalidades
- Preservar o destaque visual: coluna da faixa etária atual e linha da pontuação obtida em cor de destaque (`--primary`)

## 3. Popover de ajuda (`InfoTooltip`)

**Decisão:** usar o tooltip/popover nativo de cada plataforma (`TooltipBox`/`PlainTooltip` no Compose, `.popover()` no SwiftUI), acionado por toque no ícone de informação — não por hover, que não existe em touch. Manter o texto de ajuda idêntico ao já escrito em `App.tsx` (`getUpperBodyHelp` e os textos fixos dos demais campos).

## 4. Estilo neumórfico (`nm-card`, `nm-inset`, `nm-btn`)

**Decisão:** não replicar as sombras duplas neumórficas pixel a pixel — isso não é idiomático em nenhuma das duas plataformas e pesa em performance de renderização. Adaptar preservando a **assinatura visual**, não a técnica de sombra:
- Cor primária `#021859`, dourado de destaque `#CDA96A`, vermelho de alerta `#D90404` — mantidos como estão (ver [[Tokens Visuais]])
- Border-radius generoso (cards ~20px, inputs/botões ~12px) — mantido, adaptado para os tokens de `shape` do Material 3 e para `RoundedRectangle`/`.cornerRadius` no SwiftUI
- Elevação: Android usa tonal elevation do Material 3 (surface tint, não sombra dura); iOS usa materiais (`.regularMaterial`) e sombra sutil padrão do sistema

## 5. Tipografia técnica (rótulos uppercase com tracking, valores em fonte monoespaçada)

**Decisão:** preservar como característica de identidade visual — é o que dá o tom "instrumento oficial/técnico" ao app, não decorativo à toa. Usar uma fonte monoespaçada nativa disponível em ambas plataformas para os valores numéricos (`technical-value`) e manter o padrão de rótulos em uppercase com letter-spacing amplo (`technical-header`). Ver detalhes em [[Tokens Visuais]].

## 6. Contador animado da nota final e ícone de reset

**Decisão:** portar como está — Compose (`Animatable`) e SwiftUI (`withAnimation(.timingCurve(...))`) suportam nativamente a mesma curva de easing (`cubic-bezier(0.22, 1, 0.36, 1)`) usada hoje via Motion. Nenhuma adaptação de comportamento necessária, só de API.
