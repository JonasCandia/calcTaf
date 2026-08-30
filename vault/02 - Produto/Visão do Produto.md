---
tags: [produto]
---

# Visão do Produto

← [[00 - Início]] · relacionado: [[Funcionalidades Atuais (Web)]], [[Modelo de Negócio]]

## Em uma frase

Uma calculadora oficial e confiável do resultado do TAF do CBMRS, que funciona em qualquer lugar (offline) e nunca diverge do que a IR 001/2024 determina.

## Princípios de produto (derivados do que já existe)

1. **Fidelidade normativa acima de tudo.** O valor do produto é ser exato. Qualquer atalho de UX que arrisque a exatidão do cálculo é inaceitável — ver [[Regras de Negócio]] e a seção de TDD em [[../../CLAUDE.md|CLAUDE.md]].
2. **Offline first.** Sem backend, sem dependência de rede, sem coleta de dados. Isso é uma restrição de produto, não só técnica — ver [[Modelo de Negócio]].
3. **Transparência do cálculo.** O app não só dá a nota final: mostra o breakdown por modalidade e as tabelas de referência completas (com destaque da faixa etária e pontuação do usuário), para que o usuário confie no resultado e consiga auditar manualmente se quiser.
4. **Simplicidade de uso em campo.** Formulário curto, validação clara (erros bloqueantes vs. avisos não-bloqueantes), sem etapas desnecessárias.

## Horizonte atual

- **Hoje:** web app funcional, cobrindo o fluxo completo descrito em [[Funcionalidades Atuais (Web)]].
- **Próximo:** apps nativos Android/iOS com paridade funcional total — plano detalhado em [[Visão Geral do Projeto Mobile]] e nos arquivos [roadmap.md](../../roadmap.md) / [roadmap-resumo.md](../../roadmap-resumo.md).

## Fora de escopo (deliberadamente)

Não fazem parte da visão de produto, a menos que decidido explicitamente em uma conversa futura: contas de usuário, histórico de resultados na nuvem, comparação entre usuários, notificações, qualquer coleta de dados pessoais. Ver [[Modelo de Negócio]].
