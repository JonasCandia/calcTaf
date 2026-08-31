package dev.calctaf.shared

import kotlin.test.Test
import kotlin.test.assertEquals

/**
 * Fase 3 — porta getAgeGroup() de src/lib/taf-utils.ts. Casos de fronteira
 * conforme vault/03 - Técnico/Regras de Negócio.md.
 */
class TafCalculatorGetAgeGroupTest {

    @Test
    fun idadeNoLimiteInferior_18_ficaNaFaixaAte19() {
        assertEquals(AgeGroup.ATE_19, TafCalculator.getAgeGroup(18))
    }

    @Test
    fun idade19_ficaNaFaixaAte19() {
        assertEquals(AgeGroup.ATE_19, TafCalculator.getAgeGroup(19))
    }

    @Test
    fun idade20_viraDe20A24() {
        assertEquals(AgeGroup.DE_20_A_24, TafCalculator.getAgeGroup(20))
    }

    @Test
    fun idade24_aindaDe20A24() {
        assertEquals(AgeGroup.DE_20_A_24, TafCalculator.getAgeGroup(24))
    }

    @Test
    fun idade25_viraDe25A29() {
        assertEquals(AgeGroup.DE_25_A_29, TafCalculator.getAgeGroup(25))
    }

    @Test
    fun idade29_aindaDe25A29() {
        assertEquals(AgeGroup.DE_25_A_29, TafCalculator.getAgeGroup(29))
    }

    @Test
    fun idade30_viraDe30A34() {
        assertEquals(AgeGroup.DE_30_A_34, TafCalculator.getAgeGroup(30))
    }

    @Test
    fun idade34_aindaDe30A34() {
        assertEquals(AgeGroup.DE_30_A_34, TafCalculator.getAgeGroup(34))
    }

    @Test
    fun idade35_viraDe35A39() {
        assertEquals(AgeGroup.DE_35_A_39, TafCalculator.getAgeGroup(35))
    }

    @Test
    fun idade39_aindaDe35A39() {
        assertEquals(AgeGroup.DE_35_A_39, TafCalculator.getAgeGroup(39))
    }

    @Test
    fun idade40_viraDe40A44() {
        assertEquals(AgeGroup.DE_40_A_44, TafCalculator.getAgeGroup(40))
    }

    @Test
    fun idade44_aindaDe40A44() {
        assertEquals(AgeGroup.DE_40_A_44, TafCalculator.getAgeGroup(44))
    }

    @Test
    fun idade45_viraDe45A49() {
        assertEquals(AgeGroup.DE_45_A_49, TafCalculator.getAgeGroup(45))
    }

    @Test
    fun idade49_aindaDe45A49() {
        assertEquals(AgeGroup.DE_45_A_49, TafCalculator.getAgeGroup(49))
    }

    @Test
    fun idade50_viraDe50A54() {
        assertEquals(AgeGroup.DE_50_A_54, TafCalculator.getAgeGroup(50))
    }

    @Test
    fun idade54_aindaDe50A54() {
        assertEquals(AgeGroup.DE_50_A_54, TafCalculator.getAgeGroup(54))
    }

    @Test
    fun idade55_viraDe55A59() {
        assertEquals(AgeGroup.DE_55_A_59, TafCalculator.getAgeGroup(55))
    }

    @Test
    fun idade59_aindaDe55A59() {
        assertEquals(AgeGroup.DE_55_A_59, TafCalculator.getAgeGroup(59))
    }

    @Test
    fun idade60_viraSessentaMais() {
        assertEquals(AgeGroup.SESSENTA_MAIS, TafCalculator.getAgeGroup(60))
    }

    @Test
    fun idadeNoLimiteSuperior_70_ficaSessentaMais() {
        assertEquals(AgeGroup.SESSENTA_MAIS, TafCalculator.getAgeGroup(70))
    }
}
