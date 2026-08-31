package dev.calctaf.shared

import kotlin.test.Test
import kotlin.test.assertEquals

/**
 * Fase 3 — porta getUpperBodyTest(), calculateFinalScore() e getConcept()
 * de src/lib/taf-utils.ts.
 */
class TafCalculatorScoreAndConceptTest {

    // --- getUpperBodyTest: as 4 combinações sexo x idade ---

    @Test
    fun homemAte39_usaBarraFixa() {
        assertEquals("Barra Fixa (Repetições)", TafCalculator.getUpperBodyTest(Sex.MALE, 39))
    }

    @Test
    fun homemAcimaDe39_usaApoioSobreOSolo() {
        assertEquals("Apoio sobre o solo (Repetições)", TafCalculator.getUpperBodyTest(Sex.MALE, 40))
    }

    @Test
    fun mulherAte39_usaBarraIsometrica() {
        assertEquals("Barra Isométrica (Segundos)", TafCalculator.getUpperBodyTest(Sex.FEMALE, 39))
    }

    @Test
    fun mulherAcimaDe39_usaApoioComJoelhos() {
        assertEquals("Apoio com joelhos (Repetições)", TafCalculator.getUpperBodyTest(Sex.FEMALE, 40))
    }

    // --- calculateFinalScore ---

    @Test
    fun semNatacao_divideAsomaPor4ComPesoDoisNaCorrida() {
        // (5 + 5 + 2*5) / 4 = 5.0
        assertEquals(5.0, TafCalculator.calculateFinalScore(5.0, 5.0, 5.0))
    }

    @Test
    fun comNatacao_divideAsomaPor5ComPesoDoisNaCorrida() {
        // (4 + 4 + 2*4 + 4) / 5 = 4.0
        assertEquals(4.0, TafCalculator.calculateFinalScore(4.0, 4.0, 4.0, swimPoints = 4.0))
    }

    // --- getConcept: cortes 10.0 / 8.5 / 7.0 / 5.0 ---

    @Test
    fun notaMaximaDez_eExcelente() {
        assertEquals(Concept.EXCELENTE, TafCalculator.getConcept(10.0))
    }

    @Test
    fun notaLogoAbaixoDeDez_eMuitoBom() {
        assertEquals(Concept.MUITO_BOM, TafCalculator.getConcept(9.99))
    }

    @Test
    fun notaExatamenteOitoEMeio_eMuitoBom() {
        assertEquals(Concept.MUITO_BOM, TafCalculator.getConcept(8.5))
    }

    @Test
    fun notaLogoAbaixoDeOitoEMeio_eBom() {
        assertEquals(Concept.BOM, TafCalculator.getConcept(8.49))
    }

    @Test
    fun notaExatamenteSete_eBom() {
        assertEquals(Concept.BOM, TafCalculator.getConcept(7.0))
    }

    @Test
    fun notaLogoAbaixoDeSete_eRegular() {
        assertEquals(Concept.REGULAR, TafCalculator.getConcept(6.99))
    }

    @Test
    fun notaExatamenteCinco_eRegular() {
        assertEquals(Concept.REGULAR, TafCalculator.getConcept(5.0))
    }

    @Test
    fun notaLogoAbaixoDeCinco_eInsuficiente() {
        assertEquals(Concept.INSUFICIENTE, TafCalculator.getConcept(4.99))
    }

    @Test
    fun notaZero_eInsuficiente() {
        assertEquals(Concept.INSUFICIENTE, TafCalculator.getConcept(0.0))
    }
}
