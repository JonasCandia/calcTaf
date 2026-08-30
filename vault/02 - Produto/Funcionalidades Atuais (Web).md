---
tags: [produto]
---

# Funcionalidades Atuais (Web)

← [[00 - Início]] · relacionado: [[Visão do Produto]], [[Glossário TAF]], [[Arquitetura Atual (Web)]]

Inventário funcional do app web hoje (`src/App.tsx`). Esta é a lista de referência para checar paridade na versão mobile — nenhuma funcionalidade nova deve ser adicionada sem passar antes por [[Visão do Produto]].

## Entrada de dados

- Sexo (masculino/feminino)
- Data de nascimento + data do TAF → idade calculada automaticamente (com trava entre 18 e 70 anos)
- Idade também editável manualmente
- Resultado do teste de força superior (rótulo muda dinamicamente conforme sexo/idade — ver [[Glossário TAF]])
- Resultado do abdominal remador (repetições)
- Resultado da corrida de 12 minutos (metros)
- Natação 50m (opcional, ativada por checkbox) — tempo em segundos

## Validação

- Campos obrigatórios bloqueiam o cálculo se vazios/inválidos
- Avisos não-bloqueantes para valores fora da faixa plausível (ex.: corrida < 500m ou > 6000m, indicando possível erro de unidade)
- Mensagens de erro anunciadas via região viva (`aria-live`) para leitores de tela

## Cálculo e resultado

- Determinação automática da faixa etária e do teste de força aplicável
- Pontuação individual (0 a 10) por tabela oficial, com contador animado
- Nota final ponderada (corrida com peso 2; divisor 4 sem natação, 5 com natação)
- Classificação em conceito: Excelente, Muito Bom, Bom, Regular, Insuficiente
- Indicador de Aprovado/Reprovado (nota mínima 5,0)

## Tabelas de referência

- Modal com abas por modalidade (Força, Abdominal, Corrida, Natação)
- Destaque visual da coluna da faixa etária do usuário e da linha da pontuação obtida

## Outras funcionalidades

- Tema claro/escuro
- Impressão do resultado (com cabeçalho institucional exclusivo para impressão)
- Reset do formulário

Detalhamento técnico de como cada regra é calculada: [[Regras de Negócio]].
