---
tags: [mobile, roadmap]
---

# Visão Geral do Projeto Mobile

← [[00 - Início]] · relacionado: [[ADR-001 KMP vs Codebases Separadas]], [[Arquitetura Atual (Web)]]

O plano completo de transformação do app web em apps nativos Android/iOS vive fora do vault, na raiz do repositório:

- **[roadmap.md](../../roadmap.md)** — plano completo: 8 fases, mapeamento de componentes, estimativas, riscos, ferramentas
- **[roadmap-resumo.md](../../roadmap-resumo.md)** — versão enxuta em checklist para consulta rápida do dia a dia

Esta nota existe só para linkar esses documentos ao restante do conhecimento do projeto (não duplica o conteúdo — evita desatualização).

## Decisão central

Ver [[ADR-001 KMP vs Codebases Separadas]].

## Como isso se conecta ao resto do vault

- A paridade funcional exigida no mobile está definida em [[Funcionalidades Atuais (Web)]] — nenhuma funcionalidade nova.
- As regras que serão portadas para o módulo `shared` (KMP) são exatamente as descritas em [[Regras de Negócio]].
- As premissas de produto (offline, sem coleta de dados, gratuito) vêm de [[Modelo de Negócio]] e se mantêm inalteradas no mobile.
