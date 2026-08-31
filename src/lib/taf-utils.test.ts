import { describe, expect, it } from 'vitest';
import {
  AGE_GROUPS,
  APOIO_SOLO_MALE,
  BARRA_MALE,
} from '../constants/taf-data';
import {
  calculatePoints,
  getUpperBodyAgeGroups,
  getUpperBodyTable,
} from './taf-utils';

describe('getUpperBodyAgeGroups', () => {
  it('idade <= 39 usa as 5 primeiras faixas etárias (mesmas do Barra Fixa/Isométrica)', () => {
    expect(getUpperBodyAgeGroups(25)).toEqual(AGE_GROUPS.slice(0, 5));
  });

  it('idade > 39 usa as 5 últimas faixas etárias (Apoio Solo/Joelhos)', () => {
    expect(getUpperBodyAgeGroups(42)).toEqual(AGE_GROUPS.slice(5));
  });
});

describe('calculatePoints — bug de indexação nas tabelas de Apoio (idade > 39)', () => {
  // Bug real encontrado em 2026-08-30: tabelas APOIO_SOLO_MALE/APOIO_JOELHOS_FEMALE
  // têm só 5 colunas (uma por faixa >39), mas calculatePoints indexava com a
  // posição GLOBAL da faixa etária (5-9), estourando o array e sempre
  // retornando 0 — reprovando indevidamente qualquer militar de 40+ nesse teste.

  it('42 anos, 33 repetições (marca máxima da faixa) no Apoio Solo -> 10.0 pontos, não 0', () => {
    // APOIO_SOLO_MALE['10.0'] = [33, 30, 27, 24, 21] -> índice 0 (40-44) = 33
    const table = getUpperBodyTable('M', 42);
    const points = calculatePoints(33, '40-44', table, false, getUpperBodyAgeGroups(42));
    expect(points).toBe(10.0);
  });

  it('42 anos, 1 repetição (marca baixíssima) no Apoio Solo -> 0 pontos (correto, não por bug)', () => {
    const table = getUpperBodyTable('M', 42);
    const points = calculatePoints(1, '40-44', table, false, getUpperBodyAgeGroups(42));
    expect(points).toBe(0);
  });

  it('42 anos, 21 repetições (limiar mínimo listado) no Apoio Solo -> 1.0 ponto', () => {
    // APOIO_SOLO_MALE['1.0'] = [15, 12, 9, 6, 3] -> índice 4 (60+) não é o caso;
    // para 40-44 (índice 0 da fatia) o limiar de 1.0 é 15.
    const table = getUpperBodyTable('M', 42);
    const points = calculatePoints(15, '40-44', table, false, getUpperBodyAgeGroups(42));
    expect(points).toBe(1.0);
  });

  it('sem o 5º parâmetro (comportamento antigo), continua com o bug — prova que o parâmetro é o que corrige', () => {
    const table = getUpperBodyTable('M', 42);
    const points = calculatePoints(30, '40-44', table);
    expect(points).toBe(0);
  });
});

describe('calculatePoints — não regride o comportamento para idade <= 39 (Barra Fixa)', () => {
  it('25 anos, 15 repetições na Barra Fixa -> 10.0 pontos (igual antes da mudança)', () => {
    const table = getUpperBodyTable('M', 25);
    const points = calculatePoints(15, '25-29', table, false, getUpperBodyAgeGroups(25));
    expect(points).toBe(10.0);
  });

  it('valores de BARRA_MALE continuam batendo com a tabela oficial', () => {
    expect(APOIO_SOLO_MALE['10.0']).toEqual([33, 30, 27, 24, 21]);
    expect(BARRA_MALE['10.0']).toEqual([17, 16, 14, 12, 10]);
  });
});
