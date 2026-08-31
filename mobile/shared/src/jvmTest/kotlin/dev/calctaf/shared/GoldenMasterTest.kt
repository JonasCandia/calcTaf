package dev.calctaf.shared

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.fail

/**
 * Fase 3 — valida que TafData.kt (transcrição manual das tabelas oficiais)
 * é idêntico ao JSON gerado diretamente de src/constants/taf-data.ts por
 * mobile/scripts/export-taf-tables.mjs. Essa é a fonte independente: o JSON
 * não foi digitado à mão, foi exportado do TypeScript original.
 *
 * Só roda no alvo JVM (não em commonTest) porque leitura de recurso via
 * classloader é o jeito mais simples e verificável nesta máquina — ver
 * mobile/SETUP.md sobre o que ainda não foi validado em Android/iOS.
 */
class GoldenMasterTest {

    @Serializable
    private data class GoldenTables(
        val AGE_GROUPS: List<String>,
        val tables: Map<String, Map<String, List<Double>>>,
    )

    private val kotlinTables: Map<String, ScoringTable> = mapOf(
        "ABDOMINAL_MALE" to TafData.ABDOMINAL_MALE,
        "ABDOMINAL_FEMALE" to TafData.ABDOMINAL_FEMALE,
        "BARRA_MALE" to TafData.BARRA_MALE,
        "BARRA_ISOMETRICA_FEMALE" to TafData.BARRA_ISOMETRICA_FEMALE,
        "APOIO_SOLO_MALE" to TafData.APOIO_SOLO_MALE,
        "APOIO_JOELHOS_FEMALE" to TafData.APOIO_JOELHOS_FEMALE,
        "CORRIDA_MALE" to TafData.CORRIDA_MALE,
        "CORRIDA_FEMALE" to TafData.CORRIDA_FEMALE,
        "NATACAO_MALE" to TafData.NATACAO_MALE,
        "NATACAO_FEMALE" to TafData.NATACAO_FEMALE,
    )

    @Test
    fun agesGroupsBatemComOOriginal() {
        val golden = loadGolden()
        val labels = AGE_GROUPS.map { it.label }
        assertEquals(golden.AGE_GROUPS, labels, "AGE_GROUPS diverge do taf-data.ts original")
    }

    @Test
    fun todasAs9TabelasBatemValorAValorComOOriginal() {
        val golden = loadGolden()
        assertEquals(golden.tables.keys, kotlinTables.keys, "Conjunto de tabelas diverge do taf-data.ts original")

        for ((tableName, goldenTable) in golden.tables) {
            val kotlinTable = kotlinTables.getValue(tableName)

            assertEquals(
                goldenTable.keys.map { it.toDouble() }.toSet(),
                kotlinTable.keys,
                "Tabela $tableName: conjunto de pontuações (chaves) diverge",
            )

            for ((pointsStr, goldenThresholds) in goldenTable) {
                val points = pointsStr.toDouble()
                val kotlinThresholds = kotlinTable[points]
                    ?: fail("Tabela $tableName: pontuação $points existe no golden mas não no Kotlin")

                assertEquals(
                    goldenThresholds,
                    kotlinThresholds,
                    "Tabela $tableName, pontuação $points: limiares divergem do taf-data.ts original",
                )
            }
        }
    }

    private fun loadGolden(): GoldenTables {
        val stream = javaClass.classLoader.getResourceAsStream("taf-tables-golden.json")
            ?: fail("taf-tables-golden.json não encontrado no classpath de teste — rode: npx tsx mobile/scripts/export-taf-tables.mjs")
        val text = stream.bufferedReader().use { it.readText() }
        return Json.decodeFromString(GoldenTables.serializer(), text)
    }
}
