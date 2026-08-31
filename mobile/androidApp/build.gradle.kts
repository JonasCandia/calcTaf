// Nota: desde o AGP 9 o Kotlin embutido dispensaria este plugin, mas
// desligamos esse modo em gradle.properties (android.builtInKotlin=false)
// porque ele é incompatível com o :shared (KMP + com.android.library).
// Ver comentário em mobile/gradle.properties.
plugins {
    id("com.android.application")
    kotlin("android")
    id("org.jetbrains.kotlin.plugin.compose")
}

android {
    namespace = "dev.calctaf.app"
    compileSdk = 37

    defaultConfig {
        // PLACEHOLDER — confirmar antes da Fase 7 (Publicação). Ver
        // vault/04 - Mobile/Estrutura do Repositório Mobile.md.
        applicationId = "dev.calctaf.app"
        minSdk = 26
        targetSdk = 37
        versionCode = 1
        versionName = "0.1.0"
    }

    buildFeatures {
        compose = true
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

}

kotlin {
    compilerOptions {
        jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17)
    }
}

dependencies {
    implementation(project(":shared"))

    val composeBom = platform("androidx.compose:compose-bom:2026.08.00")
    implementation(composeBom)
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.activity:activity-compose:1.9.3")
    debugImplementation("androidx.compose.ui:ui-tooling")
}
