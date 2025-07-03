```markdown
# 📚 API Dokumentation

## Überblick

Der Perplexity Pro Expert Delegation MCP Server stellt 4 Haupttools zur Verfügung, die intelligente LLM-Delegation ermöglichen.

## Tools

### 1. consult-expert

**Beschreibung**: Konsultiert ein spezifisches Expert-LLM für komplexe Aufgaben.

**Parameter**:

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|-----|--------------|--------------|
| `query` | string | ✅ | Die komplexe Anfrage für den Experten |
| `expert_model` | enum | ✅ | Welches Expert-Modell verwendet werden soll |
| `context` | string | ❌ | Zusätzlicher Kontext für den Experten |
| `temperature` | number | ❌ | Temperature-Wert (0.0-2.0, default: modell-spezifisch) |
| `task_type` | enum | ❌ | Art der Aufgabe zur Prompt-Optimierung |

**Verfügbare Modelle** (`expert_model`):
- `claude-4-sonnet`
- `claude-4-sonnet-thinking`
- `gemini-2.5-pro`
- `sonar-reasoning-pro`
- `gpt-4-omni`
- `r1-1776`

**Task Types** (`task_type`):
- `analysis` - Umfassende Analysen und strukturierte Bewertungen
- `coding` - Software-Entwicklung und Programmierung
- `creative` - Kreative Inhalte und innovative Lösungen
- `research` - Recherche und aktuelle Informationen
- `problem-solving` - Strategische Problemlösung und Planung

**Beispiel**:

```

```json
{
"tool": "consult-expert",
"parameters": {
"query": "Entwickle eine skalierbare Microservices-Architektur für 1M+ Nutzer",
"expert_model": "claude-4-sonnet-thinking",
"task_type": "problem-solving",
"temperature": 0.1
}
}
```

```markdown

### 2. smart-expert-route

**Beschreibung**: Automatische Auswahl und Konsultation des besten Expert-Modells basierend auf Anfrage-Analyse.

**Parameter**:

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|-----|--------------|--------------|
| `query` | string | ✅ | Die Anfrage zur Analyse und Weiterleitung |
| `context` | string | ❌ | Zusätzlicher Kontext für die Analyse |
| `force_thinking` | boolean | ❌ | Erzwinge Verwendung von Reasoning-Modellen |

**Routing-Logik**:

| Erkannte Keywords | Gewähltes Modell | Begründung |
|-------------------|------------------|------------|
| code, programming, debug | claude-4-sonnet | Beste Coding-Performance |
| complex, analyze, strategy | claude-4-sonnet-thinking | Extended Thinking für komplexe Analysen |
| research, current, news | sonar-reasoning-pro | Web-Zugang mit Reasoning |
| image, multimodal, visual | gemini-2.5-pro | Multimodale Fähigkeiten |
| creative, write, story | gpt-4-omni | Vielseitiger Allrounder |

**Beispiel**:

```

```json
{
"tool": "smart-expert-route",
"parameters": {
"query": "Implementiere eine Real-time Chat-Anwendung mit WebSockets",
"context": "React Frontend, Node.js Backend"
}
}
```

```markdown

### 3. compare-experts

**Beschreibung**: Vergleicht Antworten von mehreren Expert-Modellen parallel.

**Parameter**:

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|-----|--------------|--------------|
| `query` | string | ✅ | Die Anfrage für alle Experten |
| `models` | array | ❌ | Array von Modell-Namen (2-4 Modelle) |
| `context` | string | ❌ | Zusätzlicher Kontext für alle Experten |
| `temperature` | number | ❌ | Temperature für alle Modelle |

**Standard-Modelle**: `["claude-4-sonnet", "gemini-2.5-pro"]`

**Beispiel**:

```

```json
{
"tool": "compare-experts",
"parameters": {
"query": "Was sind die Vor- und Nachteile von serverless vs. containerized deployments?",
"models": ["claude-4-sonnet", "claude-4-sonnet-thinking", "gemini-2.5-pro"],
"temperature": 0.2
}
}
```

```markdown

### 4. model-info

**Beschreibung**: Zeigt Informationen über alle verfügbaren Expert-Modelle.

**Parameter**: Keine

**Response**: Übersicht aller Modelle mit ihren Eigenschaften und Capabilities.

**Beispiel**:

```

```json
{
"tool": "model-info",
"parameters": {}
}
```

```markdown

## Response-Format

Alle Tools geben Antworten im folgenden Format zurück:

### Erfolgreiche Antwort

```

```json
{
"content": [
{
"type": "text",
"text": "# 🎯 Expert Consultation Ergebnis\n\n..."
}
]
}
```

```markdown

### Fehler-Antwort

```

```json
{
"content": [
{
"type": "text",
"text": "# ❌ Expert Consultation Fehlgeschlagen\n\n..."
}
],
"isError": true
}
```

```markdown

## Modell-Spezifikationen

### Claude 4 Sonnet
- **Stärke**: Coding, komplexe Aufgaben
- **Max Tokens**: 4096
- **Default Temperature**: 0.1
- **Reasoning**: Nein
- **Besonderheiten**: Überlegene Code-Qualität, präzise technische Analysen

### Claude 4 Sonnet Thinking
- **Stärke**: Analyse, Problemlösung
- **Max Tokens**: 8192
- **Default Temperature**: 0.1
- **Reasoning**: Ja (Extended Thinking)
- **Besonderheiten**: Tiefere Denkprozesse, schrittweise Problemlösung

### Gemini 2.5 Pro
- **Stärke**: Multimodal, vielseitige Aufgaben
- **Max Tokens**: 4096
- **Default Temperature**: 0.2
- **Reasoning**: Nein
- **Besonderheiten**: Große Kontextfenster, multimodale Fähigkeiten

### Sonar Reasoning Pro
- **Stärke**: Research, Web-Suche
- **Max Tokens**: 6144
- **Default Temperature**: 0.1
- **Reasoning**: Ja
- **Besonderheiten**: Live-Web-Zugang, aktuelle Informationen

### GPT-4 Omni
- **Stärke**: Allgemeine Aufgaben
- **Max Tokens**: 4096
- **Default Temperature**: 0.1
- **Reasoning**: Nein
- **Besonderheiten**: Vielseitiger Allrounder, gute Balance

### R1 1776
- **Stärke**: Analyse, tiefes Reasoning
- **Max Tokens**: 6144
- **Default Temperature**: 0.1
- **Reasoning**: Ja
- **Besonderheiten**: Spezialisiert auf komplexe Problemlösung

## Error Codes

| HTTP Status | Error Type | Beschreibung | Lösung |
|-------------|------------|--------------|--------|
| 401 | Authentication | Ungültiger API-Schlüssel | PERPLEXITY_API_KEY überprüfen |
| 402 | Billing | Kontingent erschöpft | Pro-Abo überprüfen |
| 429 | Rate Limit | Zu viele Anfragen | Warten und wiederholen |
| 500 | Server Error | API-Server Fehler | Später wiederholen |
| TIMEOUT | Network | Request timeout | Kürzere Anfrage verwenden |

## Best Practices

### 1. Modell-Auswahl

- **Coding-Aufgaben**: `claude-4-sonnet`
- **Komplexe Analysen**: `claude-4-sonnet-thinking` oder `r1-1776`
- **Research**: `sonar-reasoning-pro`
- **Multimodale Tasks**: `gemini-2.5-pro`
- **Unbekannte Aufgaben**: `smart-expert-route` verwenden

### 2. Temperature-Einstellungen

- **Präzise Antworten**: 0.0 - 0.2
- **Ausgewogene Kreativität**: 0.3 - 0.7
- **Hohe Kreativität**: 0.8 - 1.2
- **Maximale Kreativität**: 1.3 - 2.0

### 3. Context-Optimierung

```

```json
{
"context": "Projektkontext: E-Commerce Platform\nTechstack: React, Node.js, MongoDB\nTeamgröße: 5 Entwickler\nZeitrahmen: 3 Monate",
"query": "Wie strukturieren wir am besten unser Backend?"
}
```

```markdown

### 4. Batch-Verarbeitung

Für mehrere verwandte Anfragen verwenden Sie `compare-experts`:

```

```json
{
"tool": "compare-experts",
"parameters": {
"query": "Bewerte diese drei Architektur-Optionen",
"models": ["claude-4-sonnet", "claude-4-sonnet-thinking", "gemini-2.5-pro"]
}
}
```

```markdown

## Rate Limits

- **Standard-Modelle**: ~60 Anfragen/Minute
- **Reasoning-Modelle**: ~20 Anfragen/Minute
- **Parallele Anfragen**: Max 3 gleichzeitig

## Timeouts

- **Standard-Anfragen**: 60 Sekunden
- **Reasoning-Anfragen**: 180 Sekunden
- **Multi-Expert-Vergleich**: 300 Sekunden

## Monitoring

Der Server loggt automatisch:
- Anfrage-Statistiken
- Error-Rates
- Response-Zeiten
- Modell-Performance

Aktivieren Sie Debug-Mode für detaillierte Logs:

```

```json
DEBUG=true
```

```

```