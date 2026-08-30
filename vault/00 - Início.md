---
tags: [moc, indice]
---

# Vault — Calculadora TAF CBMRS

Este é o ponto de entrada do vault do projeto. Aqui vivem o **modelo de negócio**, as **decisões de produto/arquitetura** e o **glossário de domínio** — tudo que não é código, mas que explica o *porquê* do código.

> Abra a pasta `vault/` (ou a raiz do repositório) no Obsidian para navegar pelos `[[wikilinks]]` abaixo.

Para instruções operacionais de como o agente (Claude) deve trabalhar neste repositório, veja **[CLAUDE.md](../CLAUDE.md)** — esse arquivo fica fora do vault, na raiz do repo, porque é lido automaticamente a cada sessão.

---

## Mapa do vault

### 01 — Negócio
- [[Modelo de Negócio]]
- [[Stakeholders e Público-Alvo]]
- [[Contexto Institucional]]

### 02 — Produto
- [[Visão do Produto]]
- [[Funcionalidades Atuais (Web)]]
- [[Glossário TAF]]

### 03 — Técnico
- [[Arquitetura Atual (Web)]]
- [[Regras de Negócio]]
- [[Stack e Dependências]]

### 04 — Mobile
- [[Visão Geral do Projeto Mobile]]
- [[ADR-001 KMP vs Codebases Separadas]]
- [[Decisões UX Web → Mobile]]
- [[Escopo do MVP Mobile]]
- [[Tokens Visuais]]
- [[Estrutura do Repositório Mobile]]
- [[Convenções de Versionamento e Branches]]

### 05 — Instruções
- [[Sobre as Instruções do Agente]]

---

## Como manter este vault

- Toda nota nova entra na pasta numerada correspondente e é linkada aqui.
- Fatos sobre **regras oficiais da IR 001/2024** (tabelas, faixas etárias, fórmulas) têm uma única fonte de verdade: o código em `src/lib/taf-utils.ts` e `src/constants/taf-data.ts`. As notas técnicas devem **descrever e linkar** essas regras, não duplicá-las — evita o vault ficar desatualizado em relação ao código.
- Decisões de arquitetura relevantes (ex.: KMP vs. nativo puro) viram um ADR em `04 - Mobile/`, não ficam soltas em conversa.
