package dev.calctaf.shared

/** Espelha `AgeGroup`/`AGE_GROUPS` de src/constants/taf-data.ts — mesma ordem. */
enum class AgeGroup(val label: String) {
    ATE_19("até 19"),
    DE_20_A_24("20-24"),
    DE_25_A_29("25-29"),
    DE_30_A_34("30-34"),
    DE_35_A_39("35-39"),
    DE_40_A_44("40-44"),
    DE_45_A_49("45-49"),
    DE_50_A_54("50-54"),
    DE_55_A_59("55-59"),
    SESSENTA_MAIS("60+"),
}

val AGE_GROUPS: List<AgeGroup> = AgeGroup.entries
