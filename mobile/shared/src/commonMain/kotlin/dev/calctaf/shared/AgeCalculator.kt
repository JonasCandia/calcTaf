package dev.calctaf.shared

import kotlinx.datetime.LocalDate

/**
 * Porta do cálculo de idade hoje embutido em src/App.tsx (useEffect que
 * deriva a idade a partir de nascimento + data do TAF). Separado em duas
 * funções, como no original: calcular a idade bruta, e decidir se ela é
 * aceitável (18-70) — a UI decide o que fazer se não for.
 */
object AgeCalculator {

    fun calculateAge(birthDate: LocalDate, testDate: LocalDate): Int {
        var age = testDate.year - birthDate.year
        @Suppress("DEPRECATION")
        val monthDiff = testDate.monthNumber - birthDate.monthNumber
        if (monthDiff < 0 || (monthDiff == 0 && testDate.day < birthDate.day)) {
            age--
        }
        return age
    }

    fun isAgeAccepted(age: Int): Boolean = age in 18..70
}
