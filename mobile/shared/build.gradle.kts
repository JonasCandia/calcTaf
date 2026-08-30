plugins {
    kotlin("multiplatform")
    id("com.android.library")
}

kotlin {
    jvmToolchain(17)

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
        val commonMain by getting
        val commonTest by getting {
            dependencies {
                implementation(kotlin("test"))
            }
        }
    }
}

android {
    namespace = "dev.calctaf.shared"
    compileSdk = 35

    defaultConfig {
        minSdk = 26
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}
