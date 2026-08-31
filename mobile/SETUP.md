# Setup do ambiente mobile

**Status: validado de verdade em 2026-08-30.** `:shared:jvmTest` (1 teste, passou) e `:androidApp:assembleDebug` (gerou `androidApp-debug.apk`) rodaram com sucesso nesta máquina Windows, usando o Android Studio + o wrapper do projeto (`./gradlew`).

## Ambiente que funcionou

- **JDK:** o embutido no Android Studio (JBR), **JDK 25** — em `C:\Program Files\Android\Android Studio\jbr`. O Java 1.8 do sistema não serve (Kotlin/AGP modernos exigem 17+); não precisa instalar outro JDK à parte, o do Android Studio já resolve.
- **Android SDK:** instalado pelo Android Studio em `%LOCALAPPDATA%\Android\Sdk` (plataformas 35 e 37, build-tools, platform-tools, emulator).
- **`mobile/local.properties`** aponta pra esse SDK (`sdk.dir=C:/Users/.../AppData/Local/Android/Sdk`) — **não versionado** (está no `.gitignore`), cada máquina gera o seu.
- **Gradle:** `./gradlew` já tem o wrapper completo versionado (`gradle-wrapper.jar` incluso) — não precisa instalar Gradle à parte, o wrapper baixa a versão certa sozinho na primeira execução.

## Comandos que funcionam (testado)

```
cd mobile
./gradlew.bat :shared:jvmTest
./gradlew.bat :androidApp:assembleDebug
```

(No Windows use `gradlew.bat`; em Linux/Mac seria `./gradlew`. Aponte `JAVA_HOME` para o JBR do Android Studio se o Gradle não achar um JDK 17+ sozinho.)

## Versões que tiveram que ser ajustadas — e por quê

O plano original da Fase 2 previa Gradle 8.11.1 / AGP 8.7.2 / Kotlin 2.1.0 como "piso mínimo razoável". Na prática, precisou subir bem mais porque o JDK disponível (o do Android Studio atual) é o 25, lançado depois dessas versões:

| Problema real encontrado | Causa | Solução aplicada |
|---|---|---|
| `IllegalArgumentException: 25.0.2` ao rodar qualquer task | O compilador Kotlin embutido no Gradle 8.11.1/8.14.5 não reconhece a string de versão do JDK 25 | Subiu para **Gradle 9.7.1** (versão corrente em ago/2026) |
| `'com.android.library' is not compatible with 'org.jetbrains.kotlin.multiplatform' since AGP 9.0` | AGP 9 mudou o modelo de integração KMP+Android (recomenda o novo plugin `com.android.kotlin.multiplatform.library`) | Ficamos no modelo antigo de propósito, desligando o default novo via `android.builtInKotlin=false` e `android.newDsl=false` em `gradle.properties` — funcional, mas gera warnings de depreciação. Migrar para o plugin novo é trabalho futuro, não urgente |
| `Cannot find a Java installation ... matching {languageVersion=17}` | `jvmToolchain(17)` explícito no `shared/build.gradle.kts` exigia um JDK 17 exato, e só há o JBR 25 instalado, sem provisionador de toolchain configurado | Removido o pino de toolchain — compilar com o JDK 25 que roda o Gradle já é suficiente para o nosso caso |
| `Inconsistent JVM Target Compatibility` no `androidApp` | `compileOptions` (Java) mirava 17 mas o Kotlin compilava para 25 (padrão) | Adicionado `kotlin { compilerOptions { jvmTarget.set(JVM_17) } }` no `androidApp/build.gradle.kts` |
| Compose BOM exige `compileSdk 37` | O Compose BOM mais recente (`2026.08.00`) já assume APIs do Android 37 | `compileSdk`/`targetSdk` subiram de 35 para **37** em `androidApp` e `shared` |

**Versões finais confirmadas:** Gradle 9.7.1, AGP 9.3.2, Kotlin 2.4.10, Compose BOM 2026.08.00, compileSdk/targetSdk 37, minSdk 26.

## O que ainda não foi validado

- **iOS:** nada disso toca o projeto iOS — impossível nesta máquina (Windows). O job `ios-framework` do CI (`.github/workflows/mobile-ci.yml`) tenta `:shared:assembleSharedDebugXCFramework` num runner macOS, mas o nome exato dessa task não foi confirmado ainda.
- **Migração para `com.android.kotlin.multiplatform.library`** (o jeito "novo" recomendado pelo AGP 9 de integrar KMP): adiada de propósito para não gastar mais tempo da Fase 2 investigando uma API nova; o modo antigo (com os flags de compatibilidade) funciona e não é urgente trocar.
- **Rodar o app num emulador/dispositivo real** — só builda o APK até agora, não foi instalado/executado.

## O que esta fase (Fase 2) entrega

- Estrutura de módulos (`shared`, `androidApp`) e scaffolding de projeto — **compilando de verdade**
- App Android mínimo (Compose Material 3) exibindo uma mensagem de fumaça vinda do `shared` — **APK gerado e existente em `androidApp/build/outputs/apk/debug/androidApp-debug.apk`**
- Teste de fumaça do `shared` — **passou** (`shared/build/test-results/jvmTest/TEST-dev.calctaf.shared.SharedInfoTest.xml`)
- Stubs Swift de referência para o app iOS (sem projeto Xcode, que só existe em um Mac)
- Wrapper do Gradle completo e versionado (`gradlew`, `gradlew.bat`, `gradle-wrapper.jar`)
- CI (`.github/workflows/mobile-ci.yml`) usando o wrapper real, pronto para rodar shared/Android/iOS-framework a cada push

**O que não entra aqui:** a lógica de negócio do TAF (tabelas, cálculo de pontos, nota final). Isso é a Fase 3, e por regra deste projeto (ver `CLAUDE.md`) é migrada seguindo TDD — teste escrito antes da implementação, não depois.
