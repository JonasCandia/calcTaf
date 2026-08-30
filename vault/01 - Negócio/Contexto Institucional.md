---
tags: [negocio, normativo]
---

# Contexto Institucional

← [[00 - Início]] · relacionado: [[Modelo de Negócio]], [[Regras de Negócio]]

## Instrução Reguladora IR 001/2024

Toda a lógica de pontuação do app é derivada da **IR 001/2024** do Corpo de Bombeiros Militar do Rio Grande do Sul (CBMRS), que define:

- As faixas etárias usadas para pontuação (10 faixas, de "até 19" a "60+")
- Os testes aplicáveis por sexo e idade (força superior tem 4 variantes conforme sexo/idade)
- As tabelas de conversão de marca → pontos (0 a 10) para cada teste
- A fórmula da nota final ponderada e os limites de conceito/aprovação

Essas tabelas estão implementadas em `src/constants/taf-data.ts`, com comentários no código indicando a página de origem na IR (ex.: `// Page 37: Abdominal Remador`).

## Regra de governança para mudanças normativas

Se a IR 001/2024 for revisada (nova versão, tabelas atualizadas), isso é um evento de **alto impacto**:

1. A fonte oficial da nova instrução deve ser obtida e conferida página a página contra os valores atuais.
2. As tabelas em `taf-data.ts` são o único lugar a editar (single source of truth) — ver [[Regras de Negócio]].
3. Qualquer alteração de tabela deve vir acompanhada de atualização dos testes que validam essas tabelas (ver [[../../CLAUDE.md|CLAUDE.md]], seção de TDD).
4. No cenário mobile (ver [[Visão Geral do Projeto Mobile]]), a mesma alteração deve ser refletida no módulo `shared` (KMP) e revalidada via *golden-master test* antes de publicar atualização nas duas lojas.

## Nota de precisão

Este vault **não substitui** a leitura da IR 001/2024 original. Ele documenta como o código a interpreta hoje; em caso de dúvida sobre a norma em si, a fonte oficial da corporação prevalece.
