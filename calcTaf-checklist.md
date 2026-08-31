# calcTaf — Checklist de recomendações do conselho

Checklist consolidado a partir da revisão do conselho (4 pareceres independentes + revisão cruzada) sobre o repositório [calcTaf](https://github.com/JonasCandia/calcTaf). Os itens estão ordenados por prioridade: valide os dados antes de qualquer coisa, depois transparência/infra, e só então distribuição.

## 1. Validação dos dados (prioridade máxima)

- [ ] Criar suíte de testes automatizados travando exemplos oficiais conhecidos (resultados/gabaritos de editais já publicados) contra a saída da calculadora
- [ ] Verificar `taf-data.ts` célula a célula contra o texto oficial da IR 001/2024 — idealmente com um segundo revisor, e registrar o resultado no repositório
- [ ] Checar se alguma das 9 tabelas tem um limiar legitimamente igual a `0`, para confirmar ou descartar o risco já mapeado no `CLAUDE.md` (`threshold === 0` como sentinela frágil)

## 2. Transparência na interface

- [ ] Adicionar disclaimer visível na própria UI (não só no README): "ferramenta não-oficial, não substitui o documento oficial, use como apoio"
- [ ] Exibir a versão/data da IR 001/2024 usada como fonte, com data da última verificação
- [ ] Citar explicitamente a norma junto das tabelas de referência mostradas nos modais

## 3. Higiene de projeto e infraestrutura

- [ ] Corrigir `package.json` (nome genérico "react-example", versão "0.0.0")
- [ ] Remover ou justificar dependências residuais do template (`@google/genai`, `express`, `dotenv`)
- [ ] Definir e declarar uma licença
- [ ] Publicar um deploy real com link público

## 4. Distribuição e timing

- [ ] Confirmar se a fase de TAF do edital vigente (ex. SD-B) ainda está aberta
- [ ] Verificar se o CBM-RS já publica (ou pretende publicar) uma calculadora oficial própria
- [ ] Só depois dos itens 1–3: levar o link ativamente para grupos de WhatsApp/Telegram e páginas de Instagram específicas do edital certo
- [ ] Evitar distribuir agressivamente antes de fechar a validação dos dados — é o cenário de maior risco (cálculo eliminatório não verificado exposto a milhares de candidatos perto da prova)

## 5. Validação social/externa

- [ ] Buscar validação pública por terceiros (ex.: comparar resultados da calculadora com planilhas/resultados oficiais e documentar que bateram)

## 6. Sequenciamento do roadmap

- [ ] Pausar o roadmap de port para mobile (Kotlin/KMP) até os itens 1–3 estarem fechados

---
*Gerado a partir da sessão de council sobre o repositório JonasCandia/calcTaf.*
