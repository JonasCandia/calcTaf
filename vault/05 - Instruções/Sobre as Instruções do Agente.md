---
tags: [instrucoes, agente]
---

# Sobre as Instruções do Agente

← [[00 - Início]]

As instruções operacionais para qualquer agente (Claude) trabalhando neste repositório ficam em **[CLAUDE.md](../../CLAUDE.md)**, na raiz do repositório — não dentro do vault.

## Por que fora do vault

`CLAUDE.md` na raiz é carregado automaticamente pelo Claude Code no início de toda sessão neste projeto. Se estivesse dentro de `vault/`, essa leitura automática não seria garantida. Esta nota existe só para que quem navega o vault saiba que o arquivo existe e onde encontrá-lo.

## O que esse arquivo cobre, em resumo

- Regra de que qualquer mudança de código deve seguir **TDD** (teste primeiro, sempre)
- Como tratar mudanças em regras/tabelas do TAF (alto impacto — ver [[Regras de Negócio]] e [[Contexto Institucional]])
- Convenções de código e commit já em uso no projeto
- O que nunca fazer (adicionar backend, coleta de dados, dependências não usadas, funcionalidades não solicitadas — ver [[Modelo de Negócio]])

## Manutenção

Se as instruções em `CLAUDE.md` mudarem de forma relevante para o negócio/produto (não só estilo de código), refletir aqui um resumo atualizado para manter o vault como mapa confiável do projeto.
