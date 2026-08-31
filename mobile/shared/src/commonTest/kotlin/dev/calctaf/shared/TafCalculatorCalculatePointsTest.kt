package dev.calctaf.shared

import kotlin.test.Test
import kotlin.test.assertEquals

/**
 * Fase 3 — porta calculatePoints() de src/lib/taf-utils.ts. Usa uma tabela
 * pequena e inventada (não uma tabela oficial) só para testar o algoritmo de
 * busca em si; a fidelidade das tabelas oficiais é validada à parte pelo
 * golden-master test.
 */
class TafCalculatorCalculatePointsTest {

    // AgeGroup.ATE_19 é o índice 0 nesta tabela de teste.
    private val tabelaTeste: ScoringTable = mapOf(
        10.0 to listOf(50.0, 45.0),
        7.0 to listOf(40.0, 35.0),
        5.0 to listOf(30.0, 25.0),
        // 0.0 = sentinela "não listado nesta faixa etária" — deve ser ignorado
        3.0 to listOf(20.0, 0.0),
    )

    @Test
    fun valorExatamenteNoLimiar_retornaAquelaPontuacao() {
        assertEquals(10.0, TafCalculator.calculatePoints(50.0, AgeGroup.ATE_19, tabelaTeste))
    }

    @Test
    fun valorAcimaDoMaiorLimiar_retornaPontuacaoMaxima() {
        assertEquals(10.0, TafCalculator.calculatePoints(999.0, AgeGroup.ATE_19, tabelaTeste))
    }

    @Test
    fun valorEntreDoisLimiares_retornaOMenorDosDois() {
        // Entre 40 (7.0 pts) e 50 (10.0 pts) -> fica com 7.0, não arredonda pra cima
        assertEquals(7.0, TafCalculator.calculatePoints(45.0, AgeGroup.ATE_19, tabelaTeste))
    }

    @Test
    fun valorAbaixoDoMenorLimiarListado_retornaZero() {
        assertEquals(0.0, TafCalculator.calculatePoints(1.0, AgeGroup.ATE_19, tabelaTeste))
    }

    @Test
    fun limiarSentinelaZero_eIgnorado() {
        // DE_20_A_24 (índice 1) tem limiar 0.0 na pontuação 3.0 -> deve pular
        // direto para "não listado" em vez de tratar 0.0 como limiar válido.
        assertEquals(0.0, TafCalculator.calculatePoints(1.0, AgeGroup.DE_20_A_24, tabelaTeste))
    }

    @Test
    fun lowerIsBetter_valorMenorOuIgualAoLimiar_retornaAquelaPontuacao() {
        val tabelaNatacao: ScoringTable = mapOf(
            10.0 to listOf(40.0),
            5.0 to listOf(90.0),
        )
        assertEquals(
            10.0,
            TafCalculator.calculatePoints(38.0, AgeGroup.ATE_19, tabelaNatacao, lowerIsBetter = true),
        )
    }

    @Test
    fun lowerIsBetter_valorAcimaDoMenorLimiar_naoGanhaAquelaPontuacao() {
        val tabelaNatacao: ScoringTable = mapOf(
            10.0 to listOf(40.0),
            5.0 to listOf(90.0),
        )
        assertEquals(
            5.0,
            TafCalculator.calculatePoints(60.0, AgeGroup.ATE_19, tabelaNatacao, lowerIsBetter = true),
        )
    }
}
