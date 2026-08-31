package dev.calctaf.shared

/**
 * Espelha `ScoringTable` de src/constants/taf-data.ts: cada chave é uma
 * pontuação (0.5 a 10.0) e o valor é a lista de limiares, um por AgeGroup,
 * na mesma ordem de AGE_GROUPS. Limiar `0.0` = "não listado nesta faixa"
 * (ver TafCalculator.calculatePoints).
 */
typealias ScoringTable = Map<Double, List<Double>>
