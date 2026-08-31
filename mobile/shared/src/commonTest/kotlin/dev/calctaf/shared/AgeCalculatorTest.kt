package dev.calctaf.shared

import kotlinx.datetime.LocalDate
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

/**
 * Fase 3 — porta o cálculo de idade hoje embutido em App.tsx (useEffect que
 * deriva a idade de nascimento + data do TAF).
 */
class AgeCalculatorTest {

    @Test
    fun aniversarioJaPassouNoAno_idadeSimples() {
        // Nasceu 15/01/1990, teste em 30/08/2026 -> já fez aniversário este ano
        val birth = LocalDate(1990, 1, 15)
        val test = LocalDate(2026, 8, 30)
        assertEquals(36, AgeCalculator.calculateAge(birth, test))
    }

    @Test
    fun aniversarioAindaNaoChegouNoAno_descontaUmAno() {
        // Nasceu 15/12/1990, teste em 30/08/2026 -> ainda não fez aniversário
        val birth = LocalDate(1990, 12, 15)
        val test = LocalDate(2026, 8, 30)
        assertEquals(35, AgeCalculator.calculateAge(birth, test))
    }

    @Test
    fun mesmoMesDiaDoTesteAntesDoDiaDoNascimento_descontaUmAno() {
        // Nasceu 31/08/1990, teste em 30/08/2026 -> falta 1 dia pro aniversário
        val birth = LocalDate(1990, 8, 31)
        val test = LocalDate(2026, 8, 30)
        assertEquals(35, AgeCalculator.calculateAge(birth, test))
    }

    @Test
    fun aniversarioExatamenteNoDiaDoTeste_jaContaOAno() {
        // Nasceu 30/08/1990, teste em 30/08/2026 -> faz 36 anos hoje
        val birth = LocalDate(1990, 8, 30)
        val test = LocalDate(2026, 8, 30)
        assertEquals(36, AgeCalculator.calculateAge(birth, test))
    }

    @Test
    fun isAgeAccepted_dentroDaFaixa18a70_verdadeiro() {
        assertTrue(AgeCalculator.isAgeAccepted(18))
        assertTrue(AgeCalculator.isAgeAccepted(70))
        assertTrue(AgeCalculator.isAgeAccepted(42))
    }

    @Test
    fun isAgeAccepted_foraDaFaixa_falso() {
        assertFalse(AgeCalculator.isAgeAccepted(17))
        assertFalse(AgeCalculator.isAgeAccepted(71))
    }
}
