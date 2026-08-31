---
tags: [mobile, tecnico, setup]
---

# Estrutura do Repositório Mobile

← [[00 - Início]] · relacionado: [[ADR-001 KMP vs Codebases Separadas]]

## Decisão

Monorepo único, conforme recomendado na Fase 1/2 do [roadmap.md](../../roadmap.md) — o Gradle já unifica naturalmente o build do módulo `shared` com o app Android, e o iOS consome o artefato gerado (`.xcframework`) sem precisar de um repositório à parte.

## Árvore de diretórios proposta

```
calcTaf/                      # raiz do repositório atual (web + mobile convivem aqui)
├── src/                       # app web (React) — inalterado
├── components/                # componentes shadcn/ui do web — inalterado
├── vault/                     # este vault
├── mobile/                    # raiz dos projetos nativos (criada na Fase 2)
│   ├── SETUP.md                 # pré-requisitos e estado real do ambiente
│   ├── shared/                   # módulo KMP: lógica + tabelas
│   │   ├── src/commonMain/kotlin/dev/calctaf/shared/
│   │   │   ├── SharedInfo.kt        # placeholder de fumaça (Fase 2)
│   │   │   ├── TafData.kt           # Fase 3 — equivalente a taf-data.ts
│   │   │   ├── TafCalculator.kt     # Fase 3 — equivalente a taf-utils.ts
│   │   │   └── AgeCalculator.kt     # Fase 3 — cálculo de idade (hoje em App.tsx)
│   │   └── src/commonTest/kotlin/  # testes do shared (golden-master + unitários, Fase 3)
│   ├── androidApp/                # projeto Android (Compose), depende de :shared
│   └── iosApp/                     # stubs Swift de referência — projeto Xcode real só em macOS
├── roadmap.md
├── roadmap-resumo.md
└── CLAUDE.md
```

## Por que `mobile/` como pasta irmã, não um repo separado

- Um único `CLAUDE.md`/vault cobre web e mobile sem duplicação de contexto.
- Mudança em regra de negócio (web) e a correspondente mudança no `shared` (mobile) podem entrar no mesmo PR, tornando a sincronização entre as duas implementações auditável em um único diff.
- CI único pode rodar os três builds (web, shared+android, ios) e bloquear merge se qualquer um quebrar.

## Nomenclatura

**Nome de exibição — decidido (2026-08-30):** "Calc TAF" — nome neutro, escolhido deliberadamente para não usar a sigla/identidade "CBMRS" sem autorização institucional confirmada (ver [[Modelo de Negócio]]). Revisitar se/quando essa autorização vier antes da Fase 7 (Publicação) do [roadmap.md](../../roadmap.md).

**Bundle ID/package name — resolvido como placeholder técnico (2026-08-30):** `dev.calctaf.app` (app) e `dev.calctaf.shared` (módulo shared), já configurados em `mobile/androidApp/build.gradle.kts` e `mobile/shared/build.gradle.kts`. Não referencia "cbmrs" para não implicar aval institucional sem confirmação. **Ainda é trocável por busca-e-substituição sem custo até a primeira publicação nas lojas** (Fase 7) — depois disso, o `applicationId`/bundle ID vira permanente no Play Store/App Store. Se a autorização institucional vier a ser confirmada antes da Fase 7, revisitar junto com o nome do app.

## Estado real do scaffolding (Fase 2)

Os arquivos acima existem em `mobile/` e, desde 2026-08-30, **estão compilando de verdade**: `:shared:jvmTest` passa e `:androidApp:assembleDebug` gera um APK real, usando o Android Studio instalado nesta máquina + o wrapper do próprio projeto (`./gradlew`). Precisou subir bastante as versões previstas originalmente (Gradle 9.7.1, AGP 9.3.2, Kotlin 2.4.10) por causa do JDK 25 do Android Studio atual — detalhes completos e o motivo de cada ajuste em `mobile/SETUP.md`. iOS continua não verificável em Windows (só via CI, ainda não confirmado).
