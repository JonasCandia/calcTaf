# iOS App — Calc TAF

**Esta pasta contém só código-fonte Swift de referência, não um projeto Xcode completo.** Um `.xcodeproj`/`.xcworkspace` real só pode ser criado e aberto em macOS com Xcode instalado — impossível de gerar ou verificar nesta máquina (Windows). Isso é uma limitação de plataforma, não uma tarefa pendente de configuração.

## Passos para criar o projeto real (fazer em um Mac)

1. **Gerar o XCFramework do módulo `shared`** (requer o restante do projeto Gradle configurado — ver `mobile/SETUP.md`):
   ```
   cd mobile
   gradle :shared:assembleSharedDebugXCFramework
   ```
   O artefato sai em algo como `mobile/shared/build/XCFrameworks/debug/Shared.xcframework`.

2. **Criar o projeto no Xcode:** File → New → Project → App. Interface: SwiftUI. Linguagem: Swift. Nome do produto: `CalcTAF`. Deployment target: iOS 16+.

3. **Substituir os arquivos gerados automaticamente** pelo Xcode (`CalcTAFApp.swift`, `ContentView.swift`) pelos desta pasta (`CalcTAF/CalcTAFApp.swift`, `CalcTAF/ContentView.swift`, `CalcTAF/Theme/Colors.swift`).

4. **Linkar o XCFramework:** no target do app, aba "General" → "Frameworks, Libraries, and Embedded Content" → adicionar o `Shared.xcframework` gerado no passo 1 (ou empacotar como Swift Package local — preferível para manutenção contínua, ver Fase 2 do [roadmap.md](../../roadmap.md)).

5. **Bundle identifier:** hoje um placeholder (`dev.calctaf.app`, o mesmo do Android) — confirmar antes da Fase 7 (Publicação), ver `vault/04 - Mobile/Estrutura do Repositório Mobile.md`.

## Por que o código já existe aqui mesmo sem o projeto Xcode

`ContentView.swift` já referencia `import Shared` e `TafCalculator.shared...` para servir de destino claro do passo 4 acima — assim que o XCFramework for linkado, o arquivo compila sem alteração. Isso evita ter que escrever esse código "às cegas" depois, em cima do teclado do Mac.

**Nota:** como a lógica real do TAF (o objeto `TafCalculator`) só é portada na Fase 3, `ContentView.swift` por enquanto chama apenas `SharedInfo.setupCheckMessage()` (o mesmo placeholder de fumaça usado no Android).
