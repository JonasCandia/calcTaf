# Instruções do Projeto — Calculadora TAF CBMRS

Este arquivo é carregado automaticamente no início de toda sessão neste repositório. **Leia-o antes de fazer qualquer alteração de código.**

Contexto de negócio, glossário de domínio, decisões de arquitetura e o plano de migração mobile vivem no vault em [`vault/00 - Início.md`](vault/00%20-%20Início.md) — consulte-o quando a tarefa envolver regras do TAF, decisões de produto ou o roadmap mobile. Este arquivo aqui é só o "como trabalhar", não o "o que é o projeto".

---

## 1. O que é este projeto (resumo mínimo)

SPA React 19 + TypeScript + Vite, 100% client-side, sem backend, que calcula a pontuação do Teste de Aptidão Física (TAF) do CBMRS conforme a Instrução Reguladora IR 001/2024. A lógica de negócio está isolada em `src/lib/taf-utils.ts` (funções puras) e `src/constants/taf-data.ts` (tabelas oficiais). Detalhes completos: [`vault/03 - Técnico/`](vault/03%20-%20Técnico/).

---

## 2. Metodologia obrigatória: TDD (Test-Driven Development)

**Toda alteração em código de comportamento — lógica de negócio, funções utilitárias, handlers de estado — segue o ciclo Red → Green → Refactor, sem exceção.** Isso não é uma preferência, é a regra deste projeto.

### Por que isso é inegociável aqui

Este app decide aprovação/reprovação em um teste físico militar oficial. Um bug silencioso em `calculatePoints`, `calculateFinalScore` ou nas tabelas de `taf-data.ts` produz um resultado incorreto que ninguém percebe até alguém ser injustamente aprovado ou reprovado. TDD aqui não é dogma de processo — é a forma mais barata de detectar esse tipo de erro antes que ele exista em produção.

### Pré-requisito: não há test runner configurado ainda

`package.json` hoje só tem `tsc --noEmit` como "lint" — **não existe Jest/Vitest instalado**. Antes da primeira tarefa que envolva lógica de negócio, configure o Vitest (integra nativamente com a config do Vite já existente):

```
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Adicione um script `"test": "vitest"` ao `package.json`. Não prossiga com TDD sem isso rodando.

### O ciclo, na prática

1. **Red:** escreva o teste que descreve o comportamento esperado (incluindo casos de fronteira — ver [`vault/03 - Técnico/Regras de Negócio.md`](vault/03%20-%20Técnico/Regras%20de%20Negócio.md) para os limiares exatos de cada faixa etária e conceito). Rode e confirme que falha pelo motivo certo.
2. **Green:** escreva o mínimo de código necessário para o teste passar. Nada além disso.
3. **Refactor:** com o teste verde como rede de segurança, limpe o código se necessário. Rode os testes de novo.

### Onde isso se aplica com mais rigor

- Qualquer mudança em `src/lib/taf-utils.ts` (faixa etária, cálculo de pontos, nota final, conceito)
- Qualquer mudança em `src/constants/taf-data.ts` (tabelas oficiais) — ver regra de validação cruzada abaixo
- Qualquer lógica de validação de formulário em `App.tsx` (regras de erro/aviso)
- Cálculo de idade a partir de data de nascimento

### Onde TDD é dispensável (mas testes ainda são bem-vindos)

Ajustes puramente visuais/estilísticos sem lógica condicional (espaçamento, cor, animação decorativa) não exigem um teste prévio — não há "comportamento" a especificar. Na dúvida, se a mudança tem um `if`, um cálculo ou um branch de decisão, ela tem comportamento e entra no ciclo TDD.

---

## 3. Regras específicas do domínio TAF

- **Tabelas oficiais (`taf-data.ts`) são a fonte de verdade normativa.** Nunca altere um valor numérico dessas tabelas por suposição, "correção de estilo" ou refatoração automática. Qualquer alteração de valor exige a fonte oficial da IR (atual ou revisada) como justificativa, registrada no commit.
- **Mudança em tabela ou fórmula = mudança de alto impacto.** Trate como uma ação difícil de reverter silenciosamente: confirme o motivo com quem pediu antes de aplicar, mesmo que a alteração pareça pequena.
- **Preserve a separação lógica/UI.** `taf-utils.ts` e `taf-data.ts` não devem importar nada de React ou de bibliotecas de UI. Essa pureza é o que viabiliza a futura migração para o módulo `shared` em Kotlin Multiplatform (ver [`vault/04 - Mobile/ADR-001 KMP vs Codebases Separadas.md`](vault/04%20-%20Mobile/ADR-001%20KMP%20vs%20Codebases%20Separadas.md)) — não a quebre introduzindo dependências de framework nessa camada.
- Ao mexer em qualquer regra de pontuação, releia [`vault/03 - Técnico/Regras de Negócio.md`](vault/03%20-%20Técnico/Regras%20de%20Negócio.md) para não reintroduzir um erro já mapeado ali (ex.: limiar `0` como sentinela de "não listado", `lowerIsBetter` na natação).

---

## 4. Padrões de código deste projeto

- **Sem comentários óbvios.** Comente só quando o *porquê* não é derivável do código (uma referência de página da IR 001/2024, por exemplo, já é um bom motivo — os comentários existentes em `taf-data.ts` seguem esse padrão, mantenha-o).
- **Sem abstração prematura.** Este projeto é pequeno e a lógica é tabular; não crie camadas genéricas "para o futuro" sem uma necessidade concreta presente.
- **TypeScript estrito.** Não introduza `any` para contornar erro de tipo; resolva o tipo real.
- **Sem novas dependências sem necessidade clara.** O app é deliberadamente enxuto e 100% offline — antes de adicionar uma lib, confirme que não dá para resolver com o que já está instalado.
- **Acessibilidade existente não regride.** `aria-live`, `aria-label` e navegação por teclado já presentes em `App.tsx` (ex.: o card de resultado é focável e ativável por Enter/Espaço) devem ser preservados em qualquer refatoração daquela área.

---

## 5. Commits

Siga o padrão já usado no histórico deste repositório: prefixo de tipo em minúsculo (`feat:`, `fix:`, `refactor:`, `docs:`), mensagem curta e no que descreve a mudança. Não faça commit a menos que explicitamente pedido.

---

## 6. O que nunca fazer neste projeto sem confirmação explícita

- Adicionar backend, chamada de API externa ou qualquer forma de coleta/transmissão de dados do usuário — o app é 100% offline por princípio de produto, não só por escolha técnica (ver [`vault/01 - Negócio/Modelo de Negócio.md`](vault/01%20-%20Negócio/Modelo%20de%20Negócio.md)).
- Portar `@google/genai`, `express` ou `dotenv` para qualquer funcionalidade nova — são resíduos de template, não fazem parte do produto.
- Inventar funcionalidade que não existe hoje no app (ver inventário completo em [`vault/02 - Produto/Funcionalidades Atuais (Web).md`](vault/02%20-%20Produto/Funcionalidades%20Atuais%20(Web).md)) sem que tenha sido pedida.
- Alterar valores das tabelas oficiais sem fonte normativa citada.
