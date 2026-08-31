package dev.calctaf.shared

/**
 * Porta de src/lib/taf-utils.ts (Fase 3 do roadmap). Funções puras — sem
 * dependência de framework, para viabilizar o compartilhamento via KMP
 * (ver vault/04 - Mobile/ADR-001 KMP vs Codebases Separadas.md).
 */
object TafCalculator {

    fun getAgeGroup(age: Int): AgeGroup = when {
        age <= 19 -> AgeGroup.ATE_19
        age <= 24 -> AgeGroup.DE_20_A_24
        age <= 29 -> AgeGroup.DE_25_A_29
        age <= 34 -> AgeGroup.DE_30_A_34
        age <= 39 -> AgeGroup.DE_35_A_39
        age <= 44 -> AgeGroup.DE_40_A_44
        age <= 49 -> AgeGroup.DE_45_A_49
        age <= 54 -> AgeGroup.DE_50_A_54
        age <= 59 -> AgeGroup.DE_55_A_59
        else -> AgeGroup.SESSENTA_MAIS
    }

    fun calculatePoints(
        value: Double,
        ageGroup: AgeGroup,
        table: ScoringTable,
        lowerIsBetter: Boolean = false,
        ageGroupsForTable: List<AgeGroup> = AGE_GROUPS,
    ): Double {
        val ageIndex = ageGroupsForTable.indexOf(ageGroup)
        val sortedPoints = table.keys.sortedDescending()

        for (points in sortedPoints) {
            val threshold = table[points]?.getOrNull(ageIndex) ?: continue
            if (threshold == 0.0) continue

            if (lowerIsBetter) {
                if (value <= threshold) return points
            } else {
                if (value >= threshold) return points
            }
        }

        return 0.0
    }

    fun getUpperBodyTest(sex: Sex, age: Int): String = when (sex) {
        Sex.MALE -> if (age <= 39) "Barra Fixa (Repetições)" else "Apoio sobre o solo (Repetições)"
        Sex.FEMALE -> if (age <= 39) "Barra Isométrica (Segundos)" else "Apoio com joelhos (Repetições)"
    }

    fun calculateFinalScore(
        upperBodyPoints: Double,
        abdominalPoints: Double,
        runPoints: Double,
        swimPoints: Double? = null,
    ): Double = if (swimPoints != null) {
        (upperBodyPoints + abdominalPoints + 2 * runPoints + swimPoints) / 5
    } else {
        (upperBodyPoints + abdominalPoints + 2 * runPoints) / 4
    }

    fun getConcept(score: Double): Concept = when {
        score >= 10.0 -> Concept.EXCELENTE
        score >= 8.5 -> Concept.MUITO_BOM
        score >= 7.0 -> Concept.BOM
        score >= 5.0 -> Concept.REGULAR
        else -> Concept.INSUFICIENTE
    }

    fun getUpperBodyTable(sex: Sex, age: Int): ScoringTable = when (sex) {
        Sex.MALE -> if (age <= 39) TafData.BARRA_MALE else TafData.APOIO_SOLO_MALE
        Sex.FEMALE -> if (age <= 39) TafData.BARRA_ISOMETRICA_FEMALE else TafData.APOIO_JOELHOS_FEMALE
    }

    fun getAbdominalTable(sex: Sex): ScoringTable =
        if (sex == Sex.MALE) TafData.ABDOMINAL_MALE else TafData.ABDOMINAL_FEMALE

    fun getRunTable(sex: Sex): ScoringTable =
        if (sex == Sex.MALE) TafData.CORRIDA_MALE else TafData.CORRIDA_FEMALE

    fun getSwimTable(sex: Sex): ScoringTable =
        if (sex == Sex.MALE) TafData.NATACAO_MALE else TafData.NATACAO_FEMALE

    // BARRA_MALE/BARRA_ISOMETRICA_FEMALE só têm colunas para as 5 faixas <=39;
    // APOIO_SOLO_MALE/APOIO_JOELHOS_FEMALE só têm colunas para as 5 faixas >39.
    // calculatePoints precisa desta fatia para indexar essas tabelas — sem
    // isso, o índice global (5-9 para idade > 39) estoura o array de 5
    // posições e a pontuação sempre sai 0 (bug corrigido em 2026-08-30,
    // mesma correção aplicada em src/lib/taf-utils.ts).
    fun getUpperBodyAgeGroups(age: Int): List<AgeGroup> =
        if (age <= 39) AGE_GROUPS.subList(0, 5) else AGE_GROUPS.subList(5, 10)
}
