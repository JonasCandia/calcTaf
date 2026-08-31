// Versões confirmadas em 2026-08-30 (ver mobile/SETUP.md — validado nesta máquina
// com Gradle 9.7.1, necessário porque o JDK embutido do Android Studio é o 25,
// que o Gradle 8.x não consegue interpretar).
plugins {
    id("com.android.application") version "9.3.2" apply false
    id("com.android.library") version "9.3.2" apply false
    kotlin("multiplatform") version "2.4.10" apply false
    kotlin("android") version "2.4.10" apply false
    id("org.jetbrains.kotlin.plugin.compose") version "2.4.10" apply false
}
