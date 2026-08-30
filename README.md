<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Calculadora TAF CBMRS

Aplicação web para calcular a pontuação do **Teste de Aptidão Física (TAF)** do Corpo de Bombeiros Militar do Rio Grande do Sul, com base nas tabelas oficiais da Instrução Reguladora **IR 001/2024**.

O usuário informa sexo, data de nascimento/idade e os resultados dos testes físicos (força, abdominal, corrida e, opcionalmente, natação). A aplicação:

- Determina automaticamente a faixa etária e o teste de força superior aplicável (barra fixa, barra isométrica, apoio no solo ou apoio nos joelhos, conforme sexo e idade).
- Converte cada resultado em pontos (0 a 10) usando as tabelas oficiais de referência.
- Calcula a nota final ponderada (a corrida tem peso 2) e classifica o conceito: Excelente, Muito Bom, Bom, Regular ou Insuficiente, indicando aprovação/reprovação (nota mínima 5,0).
- Exibe as tabelas de referência completas em um modal, com destaque para a faixa etária e a pontuação obtida.
- Suporta validação de campos, tema claro/escuro e impressão do resultado.

Todo o cálculo é feito no lado do cliente (não depende de backend nem de chamadas a APIs externas para funcionar).

## Stack técnica

- **React 19** + **TypeScript** + **Vite 6** — SPA e build tool.
- **Tailwind CSS 4** (`@tailwindcss/vite`) — estilização utilitária.
- **shadcn/ui** sobre **Base UI** (`@base-ui/react`) — componentes de interface (Dialog, Select, Tabs, Popover, etc.), com `class-variance-authority`, `clsx` e `tailwind-merge` para composição de classes.
- **Motion** (`motion/react`) — animações de transição e do contador de pontuação.
- **Lucide React** — ícones.
- **@fontsource-variable/geist** — fonte Geist Variable.
- Dependências de suporte não usadas pela calculadora em si: `@google/genai`, `express`, `dotenv` (herdadas do template AI Studio; a integração com Gemini está preparada em `vite.config.ts`/`.env.example`, mas não é consumida pelo código atual).

## Estrutura do projeto

```
src/
  App.tsx              # UI principal e lógica de formulário/resultado
  lib/taf-utils.ts      # Regras de negócio: faixa etária, pontuação, nota final, conceito
  constants/taf-data.ts # Tabelas oficiais de pontuação (IR 001/2024)
  index.css / main.tsx
components/ui/          # Componentes shadcn/ui (button, card, dialog, select, table, tabs, ...)
lib/utils.ts             # Helper `cn` para merge de classes Tailwind
```

## Rodando localmente

**Pré-requisitos:** Node.js

1. Instale as dependências:
   `npm install`
2. (Opcional) Defina `GEMINI_API_KEY` em `.env.local` caso deseje habilitar integrações futuras com a API Gemini — não é necessária para o funcionamento da calculadora.
3. Rode a aplicação:
   `npm run dev`

Outros scripts disponíveis:

- `npm run build` — build de produção.
- `npm run preview` — preview do build de produção.
- `npm run lint` — checagem de tipos (`tsc --noEmit`).
- `npm run clean` — remove a pasta `dist`.
