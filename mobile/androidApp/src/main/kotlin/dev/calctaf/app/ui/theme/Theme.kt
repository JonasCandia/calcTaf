package dev.calctaf.app.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

private val LightColors = lightColorScheme(
    primary = CbmrsPrimary,
    secondary = CbmrsAccent,
    error = CbmrsDestructive,
    background = LightBackground,
    surface = LightBackground,
    onBackground = LightText,
    onSurface = LightText,
)

private val DarkColors = darkColorScheme(
    primary = CbmrsPrimary,
    secondary = CbmrsAccent,
    error = CbmrsDestructive,
    background = DarkBackground,
    surface = DarkBackground,
    onBackground = DarkText,
    onSurface = DarkText,
)

/**
 * Ver vault/04 - Mobile/Tokens Visuais.md: o `--primary` do modo escuro no
 * CSS atual tem uma inconsistência não resolvida entre a paleta "CBMRS"
 * (#021859) e o tema shadcn (#D90404). Este tema usa o valor #021859 nos
 * dois modos até essa inconsistência ser confirmada visualmente no app web.
 */
@Composable
fun CalcTafTheme(content: @Composable () -> Unit) {
    val colors = if (isSystemInDarkTheme()) DarkColors else LightColors
    MaterialTheme(colorScheme = colors, content = content)
}
