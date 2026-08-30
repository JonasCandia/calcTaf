---
tags: [tecnico, regras]
---

# Regras de Negócio

← [[00 - Início]] · relacionado: [[Glossário TAF]], [[Contexto Institucional]], [[Arquitetura Atual (Web)]]

Resumo em linguagem de domínio das regras implementadas em `src/lib/taf-utils.ts` e `src/constants/taf-data.ts`. **Esta nota descreve; o código é a fonte de verdade.** Se este resumo divergir do código, o código está certo e esta nota precisa ser corrigida.

## 1. Faixa etária

10 faixas: `até 19`, `20-24`, `25-29`, `30-34`, `35-39`, `40-44`, `45-49`, `50-54`, `55-59`, `60+`. Determinada pela idade atual do militar.

## 2. Seleção do teste de força superior

| Sexo | Idade ≤ 39 | Idade > 39 |
|---|---|---|
| Masculino | Barra Fixa (repetições) | Apoio sobre o solo (repetições) |
| Feminino | Barra Isométrica (segundos) | Apoio com joelhos (repetições) |

## 3. Conversão marca → pontos

Cada tabela mapeia um valor de pontos (0,5 a 10,0) a um limiar por faixa etária. O algoritmo percorre os pontos em ordem decrescente e retorna o primeiro cujo limiar é atingido:

- Testes "quanto maior, melhor" (força, abdominal, corrida): marca **≥** limiar
- Natação (quanto menor o tempo, melhor): marca **≤** limiar
- Limiar `0` é tratado como "não listado nesta faixa etária/pontuação" e ignorado

## 4. Nota final

```
Sem natação:  (força + abdominal + 2×corrida) / 4
Com natação:  (força + abdominal + 2×corrida + natação) / 5
```

A corrida tem peso dobrado em relação aos demais testes.

## 5. Conceito e aprovação

| Nota final | Conceito |
|---|---|
| ≥ 10,0 | Excelente |
| ≥ 8,5 | Muito Bom |
| ≥ 7,0 | Bom |
| ≥ 5,0 | Regular |
| < 5,0 | Insuficiente |

Aprovação exige nota final **≥ 5,0**.

## 6. Cálculo de idade

A partir de data de nascimento + data do TAF, com ajuste de mês/dia (aniversário ainda não completado no ano do teste desconta 1 ano) e aceitação apenas entre 18 e 70 anos.

---

## Regra de mudança

Qualquer alteração nesta lógica ou nas tabelas de `taf-data.ts` é uma mudança de **alto impacto** (afeta aprovação/reprovação em um teste físico militar oficial). Segue obrigatoriamente TDD e validação cruzada contra a fonte normativa — ver [[../../CLAUDE.md|CLAUDE.md]] e [[Contexto Institucional]].
