plugins {
    kotlin("multiplatform")
    id("com.android.library")
}

kotlin {
    // Sem jvmToolchain(17) fixo de propósito: isso exigiria um provisionador de
    // toolchain (ex.: plugin foojay-resolver-convention) para baixar um JDK 17
    // exato quando só houver JDKs de outra major version instalados — como é o
    // caso aqui, só o JBR 25 do Android Studio. Compilar com o JDK que roda o
    // Gradle (25, ou qualquer 17+) já é suficiente; se um dia for necessário
    // fixar exatamente 17, adicionar o foojay-resolver-convention em
    // settings.gradle.kts em vez de reintroduzir este pino sem provisionamento.

    // jvm() permite rodar os testes de lógica pura sem precisar de emulador/simulador.
    // Atenção (ver mobile/SETUP.md): como este módulo também aplica o plugin Android
    // (necessário para o androidTarget()), o Gradle ainda exige ANDROID_HOME configurado
    // para SINCRONIZAR o projeto, mesmo que a tarefa executada seja só `:shared:jvmTest`.
    jvm()

    androidTarget()

    listOf(
        iosX64(),
        iosArm64(),
        iosSimulatorArm64(),
    ).forEach { target ->
        target.binaries.framework {
            baseName = "Shared"
        }
    }

    sourceSets {
        getByName("commonTest") {
            dependencies {
                implementation(kotlin("test"))
            }
        }
    }
}

android {
    namespace = "dev.calctaf.shared"
    compileSdk = 37

    defaultConfig {
        minSdk = 26
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}
