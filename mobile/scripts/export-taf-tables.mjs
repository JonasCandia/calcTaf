// Exporta as tabelas oficiais de src/constants/taf-data.ts para JSON — fonte
// independente usada pelo golden-master test do módulo shared (Fase 3 do
// roadmap). Rodar sempre que taf-data.ts mudar:
//
//   npx tsx mobile/scripts/export-taf-tables.mjs
//
// O JSON gerado é consumido como recurso de teste em
// mobile/shared/src/jvmTest/resources/taf-tables-golden.json.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import * as tafData from '../../src/constants/taf-data.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));

const TABLES = {
  ABDOMINAL_MALE: tafData.ABDOMINAL_MALE,
  ABDOMINAL_FEMALE: tafData.ABDOMINAL_FEMALE,
  BARRA_MALE: tafData.BARRA_MALE,
  BARRA_ISOMETRICA_FEMALE: tafData.BARRA_ISOMETRICA_FEMALE,
  APOIO_SOLO_MALE: tafData.APOIO_SOLO_MALE,
  APOIO_JOELHOS_FEMALE: tafData.APOIO_JOELHOS_FEMALE,
  CORRIDA_MALE: tafData.CORRIDA_MALE,
  CORRIDA_FEMALE: tafData.CORRIDA_FEMALE,
  NATACAO_MALE: tafData.NATACAO_MALE,
  NATACAO_FEMALE: tafData.NATACAO_FEMALE,
};

const outPath = resolve(__dirname, '../shared/src/jvmTest/resources/taf-tables-golden.json');
writeFileSync(outPath, JSON.stringify({ AGE_GROUPS: tafData.AGE_GROUPS, tables: TABLES }, null, 2));
console.log(`Golden tables exported to ${outPath}`);
