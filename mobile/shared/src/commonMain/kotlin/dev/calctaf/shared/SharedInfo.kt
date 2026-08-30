package dev.calctaf.shared

/**
 * Placeholder de setup (Fase 2 do roadmap). A lógica real do TAF — tabelas
 * oficiais, cálculo de pontos, nota final, conceito — é portada na Fase 3,
 * seguindo TDD (ver CLAUDE.md e vault/03 - Técnico/Regras de Negócio.md).
 *
 * Este objeto existe só para provar, nesta fase, que o módulo `shared`
 * compila e é consumível a partir do app Android e do app iOS.
 */
object SharedInfo {
    const val VERSION: String = "0.1.0"

    fun setupCheckMessage(): String = "shared module conectado (v$VERSION)"
}
