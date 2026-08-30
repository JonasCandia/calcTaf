---
tags: [negocio]
---

# Modelo de Negócio

← [[00 - Início]]

## Natureza do produto

A Calculadora TAF CBMRS **não é um produto comercial**. É uma ferramenta institucional/utilitária, de uso gratuito, sem monetização, sem coleta de dados e sem backend — todo o cálculo roda no dispositivo do usuário. Isso está documentado no [[roadmap]] (../roadmap.md) como premissa que se mantém integralmente na versão mobile.

## Proposta de valor

- Elimina o cálculo manual das tabelas oficiais da **IR 001/2024** (Instrução Reguladora do CBMRS), que são extensas e propensas a erro de leitura quando feitas à mão.
- Padroniza a forma como o resultado do TAF é apurado, reduzindo divergência entre avaliadores.
- Funciona offline — relevante para uso em campo, quartéis ou locais de treinamento sem conectividade garantida.

Ver [[Regras de Negócio]] para o detalhamento técnico de como o cálculo é feito.

## Modelo de distribuição

- **Hoje:** aplicação web (SPA), acesso direto via navegador, sem cadastro.
- **Planejado:** apps nativos Android/iOS publicados nas lojas oficiais, gratuitos, sem anúncios, sem compras internas (ver [[Visão Geral do Projeto Mobile]]).

## Suposição em aberto — validar com o solicitante

> Não há, no código ou na documentação atual, um vínculo institucional formal declarado com o CBMRS (ex.: publicação sob conta oficial da corporação, aval jurídico para usar o nome/brasão). Antes de publicar o app nas lojas como referência à corporação, **confirmar formalmente** se há autorização institucional — isso afeta nome do app, uso de identidade visual e a política de privacidade a ser publicada.

**Decisão tomada (2026-08-30):** enquanto essa autorização institucional não é confirmada, o app mobile usa um **nome de exibição neutro** ("Calc TAF", em vez de "TAF CBMRS"/"Calculadora TAF CBMRS") — ver [[Estrutura do Repositório Mobile]]. Isso reduz o risco de publicar algo que pareça oficial/institucional sem aval. Se a autorização vier a ser confirmada, revisitar o nome antes da submissão às lojas (Fase 7 do [roadmap.md](../../roadmap.md)).

## Stakeholders

Ver [[Stakeholders e Público-Alvo]].
