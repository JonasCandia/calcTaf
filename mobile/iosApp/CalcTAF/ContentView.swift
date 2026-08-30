import SwiftUI
import Shared

/// Tela provisória da Fase 2 (setup) — só confirma que o framework `Shared`
/// (gerado pelo módulo KMP) está corretamente linkado ao app iOS. As telas
/// reais do formulário TAF entram na Fase 5 do roadmap, depois da migração
/// de lógica (Fase 3). Ver mobile/iosApp/README.md para como linkar o
/// XCFramework antes deste arquivo compilar.
struct ContentView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Calc TAF")
                .font(.headline)
            Text(SharedInfo.shared.setupCheckMessage())
                .font(.body)
        }
        .padding(24)
    }
}
