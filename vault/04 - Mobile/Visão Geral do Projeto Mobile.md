---
tags: [mobile, roadmap]
---

# Visão Geral do Projeto Mobile

← [[00 - Início]] · relacionado: [[ADR-001 KMP vs Codebases Separadas]], [[Arquitetura Atual (Web)]]

O plano completo de transformação do app web em apps nativos Android/iOS vive fora do vault, na raiz do repositório:

- **[roadmap.md](../../roadmap.md)** — plano completo: 8 fases, mapeamento de componentes, estimativas, riscos, ferramentas
- **[roadmap-resumo.md](../../roadmap-resumo.md)** — versão enxuta em checklist para consulta rápida do dia a dia

Esta nota existe só para linkar esses documentos ao restante do conhecimento do projeto (não duplica o conteúdo — evita desatualização).

## Decisão central

Ver [[ADR-001 KMP vs Codebases Separadas]].

## Andamento — Fase 1 (Análise e Levantamento)

- [x] Mapeamento de funcionalidades → [[Funcionalidades Atuais (Web)]]
- [x] Regras de negócio em linguagem de domínio → [[Regras de Negócio]]
- [x] Decisão arquitetural formal → [[ADR-001 KMP vs Codebases Separadas]]
- [x] Tratamento das divergências de UX web→mobile → [[Decisões UX Web → Mobile]]
- [x] Escopo do MVP → [[Escopo do MVP Mobile]]
- [x] Tokens visuais → [[Tokens Visuais]]
- [x] Estrutura de repositório → [[Estrutura do Repositório Mobile]]
- [x] Nome de exibição do app → decidido: "Calc TAF" (neutro) — ver [[Modelo de Negócio]] e [[Estrutura do Repositório Mobile]]
- [x] Bundle ID/package name → resolvido como placeholder técnico na Fase 2 (`dev.calctaf.app`/`dev.calctaf.shared`), ver [[Estrutura do Repositório Mobile]]

**Fase 1 concluída.**

## Andamento — Fase 2 (Arquitetura e Setup)

- [x] Módulo `shared` (KMP) criado com source sets `commonMain`/`commonTest`, alvos `jvm()`, `androidTarget()`, `iosX64()`/`iosArm64()`/`iosSimulatorArm64()`
- [x] App Android (`androidApp`) criado: Compose Material 3, tema com os tokens de [[Tokens Visuais]], dependência em `:shared`
- [x] Stubs Swift para o app iOS (sem projeto Xcode real — impossível gerar/verificar em Windows, ver `mobile/iosApp/README.md`)
- [x] CI (GitHub Actions) configurado: 3 jobs (shared/Android/iOS-framework) — `.github/workflows/mobile-ci.yml`
- [x] Convenção de versionamento e branches — [[Convenções de Versionamento e Branches]]
- [~] **Spike de validação do KMP** — os arquivos foram gerados, mas **não foram compilados nesta máquina** (sem JDK 17+, sem Android SDK; Xcode impossível em Windows). O spike real (build de fato) só acontece quando alguém abrir `mobile/` no Android Studio ou rodar os comandos em `mobile/SETUP.md`. Isso é uma limitação de ambiente conhecida, não um item pulado.

**Fase 2 preparada, mas com verificação pendente** — ver `mobile/SETUP.md` para o que falta e por quê. Próximo passo: Fase 3 (Migração da Lógica de Negócio, com TDD).

## Como isso se conecta ao resto do vault

- A paridade funcional exigida no mobile está definida em [[Funcionalidades Atuais (Web)]] — nenhuma funcionalidade nova.
- As regras que serão portadas para o módulo `shared` (KMP) são exatamente as descritas em [[Regras de Negócio]].
- As premissas de produto (offline, sem coleta de dados, gratuito) vêm de [[Modelo de Negócio]] e se mantêm inalteradas no mobile.
