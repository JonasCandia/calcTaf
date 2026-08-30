---
tags: [mobile, adr, arquitetura]
---

# ADR-001 — Compartilhamento de lógica via KMP vs. codebases 100% separadas

← [[00 - Início]] · relacionado: [[Visão Geral do Projeto Mobile]], [[Regras de Negócio]]

**Status:** Proposto (definido no planejamento, ver [roadmap.md](../../roadmap.md))
**Data:** 2026-08-30

## Contexto

O app precisa existir nativamente em Android e iOS, com a mesma lógica de cálculo do TAF (tabelas oficiais da IR 001/2024 + funções de pontuação). A lógica é puramente computacional, sem dependência de APIs de plataforma. O maior risco identificado é a fidelidade das tabelas de pontuação — transcrevê-las duas vezes manualmente (uma em Kotlin, outra em Swift) é uma tarefa repetitiva e propensa a erro, com consequência real: pontuação incorreta em um teste físico militar.

## Decisão

Usar **Kotlin Multiplatform (KMP)** para compartilhar exclusivamente o módulo de lógica de negócio e as tabelas de dados (`shared`) entre Android e iOS. A interface permanece **100% nativa**: Jetpack Compose no Android, SwiftUI no iOS — sem Compose Multiplatform, sem UI compartilhada.

## Alternativa considerada

Codebases 100% separadas (Kotlin puro + Swift puro, cada um com sua própria transcrição das tabelas). Rejeitada como escolha principal porque exige transcrição manual duplicada exatamente na parte mais sensível a erro do sistema, e qualquer atualização futura da IR 001/2024 exigiria alterar dois lugares com risco de divergência silenciosa.

## Consequências

- Positivo: uma única fonte de verdade para as tabelas e fórmulas; atualização futura da IR toca um só lugar.
- Positivo: risco de transcrição incorreta mitigado por construção, reforçado por *golden-master test* (comparação automatizada entre `shared` e o `taf-data.ts` original).
- Negativo: custo de setup adicional (build KMP → `.xcframework` consumido pelo Xcode) e curva de aprendizado se a equipe não tiver experiência prévia.
- Mitigação: spike de validação de meio dia na fase de setup antes de comprometer o cronograma inteiro a essa abordagem. Se o spike falhar, plano de contingência é cair para codebases separadas com golden-master test **obrigatório** (não fica dispensado nesse cenário).

## Comparação completa

Ver a tabela de critérios detalhada na seção "Decisão Arquitetural" do [roadmap.md](../../roadmap.md).
