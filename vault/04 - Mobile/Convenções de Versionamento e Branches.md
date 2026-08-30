---
tags: [mobile, tecnico, processo]
---

# Convenções de Versionamento e Branches

← [[00 - Início]] · relacionado: [[Estrutura do Repositório Mobile]]

## Versionamento semântico

Apps mobile seguem `MAJOR.MINOR.PATCH` (ex.: `0.1.0`, versão inicial já configurada em `mobile/androidApp/build.gradle.kts`):

- **MAJOR:** mudança de ruptura na experiência ou na forma de calcular (ex.: nova versão da IR altera a fórmula)
- **MINOR:** nova funcionalidade dentro do escopo do MVP (ex.: telas novas, mas ainda paridade com o web)
- **PATCH:** correção de bug, ajuste visual, atualização de dependência

`versionCode` (Android) incrementa a cada release enviado à loja, independente do `versionName`. iOS usa `CFBundleShortVersionString` (= versionName) e `CFBundleVersion` (equivalente ao versionCode).

## Branches

Reaproveita a estratégia já usada no repositório (branch `main` protegida, trabalho em branches de feature, PR obrigatório). Para o código mobile especificamente:

- Mudanças em `mobile/shared/` (lógica/tabelas) — PR deve citar a fonte normativa quando alterar valores, conforme `CLAUDE.md`
- Mudanças em `mobile/androidApp/` e `mobile/iosApp/` podem ser branches independentes, já que rodam em paralelo (Fases 4/5 do [roadmap.md](../../roadmap.md))
- CI (`.github/workflows/mobile-ci.yml`) roda em push/PR que toquem `mobile/**` e bloqueia merge se algum dos 3 jobs falhar

## Commits

Mesmo padrão do restante do repositório: prefixo de tipo (`feat:`, `fix:`, `refactor:`, `docs:`), curto e descritivo. Para mudanças que tocam `mobile/shared/` e afetam simultaneamente o comportamento do app web (caso raro, já que a lógica web permanece em TypeScript), citar ambos os arquivos afetados no corpo do commit.
