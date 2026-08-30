---
tags: [mobile, produto, escopo]
---

# Escopo do MVP Mobile

← [[00 - Início]] · relacionado: [[Funcionalidades Atuais (Web)]], [[Decisões UX Web → Mobile]]

## Definição

O MVP mobile é **paridade funcional 100% com o app web**, nem mais nem menos. Critério de "pronto para lançar": cada item da lista abaixo funciona de forma idêntica (mesmo cálculo, mesma validação) nos apps Android e iOS.

## Dentro do escopo (= [[Funcionalidades Atuais (Web)]])

- Entrada: sexo, nascimento, data do TAF, idade (manual ou calculada)
- Determinação automática de faixa etária e teste de força aplicável
- Campos de força, abdominal, corrida e natação (opcional)
- Validação com erros bloqueantes e avisos não-bloqueantes
- Cálculo de pontos por teste, nota final ponderada, conceito, aprovação/reprovação
- Modal/sheet de tabelas de referência com destaque de faixa etária e pontuação
- Tema claro/escuro
- "Impressão" (adaptada, ver [[Decisões UX Web → Mobile]] item 1)
- Reset do formulário

## Fora do escopo do MVP (e de qualquer versão, até decisão explícita em contrário)

- Contas de usuário, login, qualquer autenticação
- Histórico de resultados salvos/sincronizados
- Comparação entre usuários ou ranking
- Notificações push
- Qualquer coleta de dados analíticos de uso além de crash reporting operacional (ver Fase 8 do [roadmap.md](../../roadmap.md))
- Suporte a idiomas além de português
- Suporte prioritário a tablet/iPad (tratado como nice-to-have, não MVP — ver [roadmap.md](../../roadmap.md))

## Critério de aceite do MVP

Rodar a mesma matriz de entradas (sexo × faixa etária × valores de teste, incluindo casos de fronteira) nos dois apps e no web, e obter exatamente o mesmo resultado nos três. Este é o mesmo "teste de paridade" descrito na Fase 6 do [roadmap.md](../../roadmap.md).
