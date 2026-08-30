package dev.calctaf.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import dev.calctaf.app.ui.theme.CalcTafTheme
import dev.calctaf.shared.SharedInfo

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            CalcTafTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    SetupCheckScreen()
                }
            }
        }
    }
}

/**
 * Tela provisória da Fase 2 (setup) — só confirma que o módulo `shared`
 * está corretamente conectado ao app Android. As telas reais do formulário
 * TAF entram na Fase 4 do roadmap, depois da migração de lógica (Fase 3).
 */
@Composable
private fun SetupCheckScreen() {
    Column(modifier = Modifier.padding(24.dp)) {
        Text("Calc TAF", style = MaterialTheme.typography.headlineMedium)
        Text(SharedInfo.setupCheckMessage(), style = MaterialTheme.typography.bodyMedium)
    }
}
