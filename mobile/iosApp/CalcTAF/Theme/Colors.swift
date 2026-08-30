import SwiftUI

// Tokens extraídos de src/index.css — ver vault/04 - Mobile/Tokens Visuais.md.
// Mesmos valores do Color.kt do Android (ui/theme/Color.kt), recriados como
// Color do SwiftUI em vez de copiados do CSS.
extension Color {
    static let cbmrsPrimary = Color(red: 0x02 / 255, green: 0x18 / 255, blue: 0x59 / 255)
    static let cbmrsAccent = Color(red: 0xCD / 255, green: 0xA9 / 255, blue: 0x6A / 255)
    static let cbmrsDestructive = Color(red: 0xD9 / 255, green: 0x04 / 255, blue: 0x04 / 255)
    static let cbmrsWarning = Color(red: 0xF2 / 255, green: 0xE4 / 255, blue: 0x16 / 255)
    static let cbmrsSuccessLight = Color(red: 0x16 / 255, green: 0xA3 / 255, blue: 0x4A / 255)
    static let cbmrsSuccessDark = Color(red: 0x22 / 255, green: 0xC5 / 255, blue: 0x5E / 255)

    static let lightBackground = Color(red: 0xEE / 255, green: 0xF2 / 255, blue: 0xF5 / 255)
    static let lightText = Color(red: 0x01 / 255, green: 0x16 / 255, blue: 0x40 / 255)
    static let lightTextMuted = Color(red: 0x63 / 255, green: 0x6E / 255, blue: 0x72 / 255)

    static let darkBackground = Color(red: 0x01 / 255, green: 0x16 / 255, blue: 0x40 / 255)
    static let darkText = Color(red: 0xF1 / 255, green: 0xF2 / 255, blue: 0xF6 / 255)
    static let darkTextMuted = Color(red: 0xA4 / 255, green: 0xB0 / 255, blue: 0xBE / 255)

    // Cores de conceito — fixas, não mudam com o tema
    static let conceptExcelente = Color(red: 0x02 / 255, green: 0x18 / 255, blue: 0x59 / 255)
    static let conceptMuitoBom = Color(red: 0x0D / 255, green: 0x2D / 255, blue: 0x8A / 255)
    static let conceptBom = cbmrsAccent
    static let conceptRegular = cbmrsWarning
    static let conceptInsuficiente = cbmrsDestructive
}
