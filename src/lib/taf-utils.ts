
import { 
  AGE_GROUPS, 
  AgeGroup, 
  ScoringTable,
  ABDOMINAL_MALE,
  ABDOMINAL_FEMALE,
  BARRA_MALE,
  BARRA_ISOMETRICA_FEMALE,
  APOIO_SOLO_MALE,
  APOIO_JOELHOS_FEMALE,
  CORRIDA_MALE,
  CORRIDA_FEMALE,
  NATACAO_MALE,
  NATACAO_FEMALE
} from '../constants/taf-data';

export type Sex = 'M' | 'F';

export function getAgeGroup(age: number): AgeGroup {
  if (age <= 19) return 'até 19';
  if (age <= 24) return '20-24';
  if (age <= 29) return '25-29';
  if (age <= 34) return '30-34';
  if (age <= 39) return '35-39';
  if (age <= 44) return '40-44';
  if (age <= 49) return '45-49';
  if (age <= 54) return '50-54';
  if (age <= 59) return '55-59';
  return '60+';
}

export function calculatePoints(
  value: number, 
  ageGroup: AgeGroup, 
  table: ScoringTable, 
  lowerIsBetter: boolean = false
): number {
  const ageIndex = AGE_GROUPS.indexOf(ageGroup);
  const sortedPoints = Object.keys(table)
    .map(Number)
    .sort((a, b) => b - a); // Sort points descending (10.0 to 0.5)

  for (const points of sortedPoints) {
    const threshold = table[points.toFixed(1)][ageIndex];
    if (threshold === undefined || threshold === 0) continue;

    if (lowerIsBetter) {
      if (value <= threshold) return points;
    } else {
      if (value >= threshold) return points;
    }
  }

  return 0;
}

export function getUpperBodyTest(sex: Sex, age: number): string {
  if (sex === 'M') {
    return age <= 39 ? 'Barra Fixa (Repetições)' : 'Apoio sobre o solo (Repetições)';
  } else {
    return age <= 39 ? 'Barra Isométrica (Segundos)' : 'Apoio com joelhos (Repetições)';
  }
}

export function calculateFinalScore(
  upperBodyPoints: number,
  abdominalPoints: number,
  runPoints: number,
  swimPoints?: number
): number {
  if (swimPoints !== undefined) {
    return (upperBodyPoints + abdominalPoints + 2 * runPoints + swimPoints) / 5;
  }
  return (upperBodyPoints + abdominalPoints + 2 * runPoints) / 4;
}

export function getConcept(score: number): string {
  if (score >= 10.0) return 'EXCELENTE';
  if (score >= 8.5) return 'MUITO BOM';
  if (score >= 7.0) return 'BOM';
  if (score >= 5.0) return 'REGULAR';
  return 'INSUFICIENTE';
}

export function getUpperBodyTable(sex: Sex, age: number): ScoringTable {
  if (sex === 'M') {
    return age <= 39 ? BARRA_MALE : APOIO_SOLO_MALE;
  } else {
    return age <= 39 ? BARRA_ISOMETRICA_FEMALE : APOIO_JOELHOS_FEMALE;
  }
}

export function getAbdominalTable(sex: Sex): ScoringTable {
  return sex === 'M' ? ABDOMINAL_MALE : ABDOMINAL_FEMALE;
}

export function getRunTable(sex: Sex): ScoringTable {
  return sex === 'M' ? CORRIDA_MALE : CORRIDA_FEMALE;
}

export function getSwimTable(sex: Sex): ScoringTable {
  return sex === 'M' ? NATACAO_MALE : NATACAO_FEMALE;
}
