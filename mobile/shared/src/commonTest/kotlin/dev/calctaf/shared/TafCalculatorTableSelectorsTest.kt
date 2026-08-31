package dev.calctaf.shared

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertSame

/**
 * Fase 3 — porta getUpperBodyTable/getAbdominalTable/getRunTable/getSwimTable
 * de src/lib/taf-utils.ts, e getUpperBodyAgeGroups (correção do bug de
 * indexação de 2026-08-30, também aplicada em src/lib/taf-utils.ts).
 */
class TafCalculatorTableSelectorsTest {

    @Test
    fun getUpperBodyTable_asQuatroCombinacoesSexoIdade() {
        assertSame(TafData.BARRA_MALE, TafCalculator.getUpperBodyTable(Sex.MALE, 39))
        assertSame(TafData.APOIO_SOLO_MALE, TafCalculator.getUpperBodyTable(Sex.MALE, 40))
        assertSame(TafData.BARRA_ISOMETRICA_FEMALE, TafCalculator.getUpperBodyTable(Sex.FEMALE, 39))
        assertSame(TafData.APOIO_JOELHOS_FEMALE, TafCalculator.getUpperBodyTable(Sex.FEMALE, 40))
    }

    @Test
    fun getAbdominalTable_porSexo() {
        assertSame(TafData.ABDOMINAL_MALE, TafCalculator.getAbdominalTable(Sex.MALE))
        assertSame(TafData.ABDOMINAL_FEMALE, TafCalculator.getAbdominalTable(Sex.FEMALE))
    }

    @Test
    fun getRunTable_porSexo() {
        assertSame(TafData.CORRIDA_MALE, TafCalculator.getRunTable(Sex.MALE))
        assertSame(TafData.CORRIDA_FEMALE, TafCalculator.getRunTable(Sex.FEMALE))
    }

    @Test
    fun getSwimTable_porSexo() {
        assertSame(TafData.NATACAO_MALE, TafCalculator.getSwimTable(Sex.MALE))
        assertSame(TafData.NATACAO_FEMALE, TafCalculator.getSwimTable(Sex.FEMALE))
    }

    @Test
    fun getUpperBodyAgeGroups_ate39UsaAsPrimeirasCincoFaixas() {
        assertEquals(AGE_GROUPS.subList(0, 5), TafCalculator.getUpperBodyAgeGroups(39))
    }

    @Test
    fun getUpperBodyAgeGroups_acimaDe39UsaAsUltimasCincoFaixas() {
        assertEquals(AGE_GROUPS.subList(5, 10), TafCalculator.getUpperBodyAgeGroups(40))
    }

    @Test
    fun regressaoDoBugDeIndexacao_42anos33repeticoesApoioSolo_da10Pontos() {
        // Reprodução do bug real encontrado em 2026-08-30 (ver src/lib/taf-utils.test.ts):
        // sem a fatia correta de AGE_GROUPS, o índice global (5) estourava o
        // array de 5 posições da tabela e a pontuação sempre saía 0.
        val table = TafCalculator.getUpperBodyTable(Sex.MALE, 42)
        val ageGroups = TafCalculator.getUpperBodyAgeGroups(42)
        val points = TafCalculator.calculatePoints(33.0, AgeGroup.DE_40_A_44, table, ageGroupsForTable = ageGroups)
        assertEquals(10.0, points)
    }
}
