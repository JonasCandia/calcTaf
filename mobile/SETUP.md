# Setup do ambiente mobile

Este arquivo documenta honestamente o que foi gerado na Fase 2, o que **não** pôde ser verificado nesta máquina, e os passos exatos para colocar o ambiente de pé.

## Estado desta máquina (checado em 2026-08-30)

- **Java:** só 1.8 instalado. Kotlin 2.x / Android Gradle Plugin 8.x exigem **JDK 17+**.
- **Android SDK:** não instalado (sem `ANDROID_HOME`, sem Android Studio).
- **Xcode:** impossível nesta máquina — é Windows. Xcode só roda em macOS. O projeto iOS real só pode ser criado/buildado em um Mac (ou runner macOS de CI).

**Consequência:** nenhum dos arquivos Gradle/Kotlin/Swift criados nesta fase foi compilado ou testado de fato. Foram escritos seguindo a configuração padrão recomendada para o stack (Kotlin Multiplatform + Compose + SwiftUI), mas precisam da primeira sincronização real para confirmar que estão corretos.

## Caminho recomendado: abrir no Android Studio

O jeito mais simples de colocar isso para rodar é instalar o **Android Studio** (ele já traz JDK compatível embutido e facilita instalar o Android SDK) e abrir a pasta `mobile/` como projeto. O Android Studio:
- Detecta o projeto Gradle e gera o `gradle-wrapper.jar` automaticamente (esse arquivo é binário — por isso não foi versionado por texto; só `gradle/wrapper/gradle-wrapper.properties`, que é texto, já está pronto).
- Oferece para instalar o Android SDK/NDK que faltarem.
- Sincroniza e aponta os primeiros erros reais de configuração, se houver.

## Caminho alternativo: linha de comando

Se preferir sem Android Studio:

1. Instalar um JDK 17+ (ex.: Temurin).
2. Instalar as Android SDK Command-line Tools e configurar `ANDROID_HOME`.
3. Gerar o wrapper com um Gradle já instalado no sistema:
   ```
   cd mobile
   gradle wrapper --gradle-version 8.11.1
   ```
4. A partir daí, usar `./gradlew` (Linux/Mac) ou `gradlew.bat` (Windows) normalmente.

## Por que o Android SDK é necessário mesmo só para testar o `shared`

O módulo `shared` declara um alvo Android (`androidTarget()`) e aplica o plugin `com.android.library`, porque o app Android precisa depender dele. Isso faz o Gradle exigir `ANDROID_HOME` configurado para **sincronizar** o projeto inteiro, mesmo que a tarefa que você queira rodar seja só `:shared:jvmTest`. Não é um erro de configuração — é uma característica de como Kotlin Multiplatform + Android se integram.

## Comandos para validar o setup depois de pronto

```
# testes do módulo shared (roda na JVM, mais rápido)
gradle -p mobile :shared:jvmTest

# build do app Android
gradle -p mobile :androidApp:assembleDebug

# build do framework iOS (ainda só o .xcframework — o app completo depende do Xcode, ver mobile/iosApp/README.md)
gradle -p mobile :shared:assembleSharedDebugXCFramework
```

## O que esta fase (Fase 2) entrega

- Estrutura de módulos (`shared`, `androidApp`) e scaffolding de projeto
- App Android mínimo (Compose Material 3) exibindo uma mensagem de fumaça vinda do `shared`
- Stubs Swift de referência para o app iOS (sem projeto Xcode, que só existe em um Mac)
- Tema/cores de cada plataforma já usando os tokens documentados em `vault/04 - Mobile/Tokens Visuais.md`
- CI (`.github/workflows/mobile-ci.yml`) pronto para rodar shared/Android/iOS-framework a cada push

**O que não entra aqui:** a lógica de negócio do TAF (tabelas, cálculo de pontos, nota final). Isso é a Fase 3, e por regra deste projeto (ver `CLAUDE.md`) é migrada seguindo TDD — teste escrito antes da implementação, não depois.
