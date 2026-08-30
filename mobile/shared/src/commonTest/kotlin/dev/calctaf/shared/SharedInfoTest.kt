package dev.calctaf.shared

import kotlin.test.Test
import kotlin.test.assertEquals

/**
 * Teste de fumaça do setup (Fase 2) — confirma que o pipeline de testes
 * multiplataforma do módulo `shared` está funcional. Os testes reais de
 * regras de negócio (faixas etárias, pontuação, golden-master das tabelas
 * oficiais) entram na Fase 3, escritos antes da implementação (TDD).
 */
class SharedInfoTest {

    @Test
    fun setupCheckMessage_reportsCurrentVersion() {
        assertEquals("shared module conectado (v0.1.0)", SharedInfo.setupCheckMessage())
    }
}
