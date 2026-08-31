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
- [x] **Spike de validação do KMP — validado de verdade em 2026-08-30.** Depois que o Android Studio foi instalado nesta máquina, `:shared:jvmTest` (1 teste, passou) e `:androidApp:assembleDebug` (gerou o APK) rodaram com sucesso via `./gradlew`. Precisou subir as versões (Gradle 9.7.1, AGP 9.3.2, Kotlin 2.4.10, compileSdk 37) por causa do JDK 25 embutido no Android Studio atual — detalhes de cada ajuste em `mobile/SETUP.md`. iOS continua não verificável nesta máquina (Windows).

**Fase 2 concluída e validada (Android/shared).** iOS validado só via CI (macOS), ainda não confirmado. Próximo passo: Fase 3 (Migração da Lógica de Negócio, com TDD).

## Como isso se conecta ao resto do vault

- A paridade funcional exigida no mobile está definida em [[Funcionalidades Atuais (Web)]] — nenhuma funcionalidade nova.
- As regras que serão portadas para o módulo `shared` (KMP) são exatamente as descritas em [[Regras de Negócio]].
- As premissas de produto (offline, sem coleta de dados, gratuito) vêm de [[Modelo de Negócio]] e se mantêm inalteradas no mobile.
