## 🛠️ Installation

### Voraussetzungen

- Node.js 18.0.0 oder höher
- Perplexity Pro Account mit API-Zugang
- MCP-kompatible IDE (Trae, Cline, etc.)

### Schritt 1: Repository klonen und installieren

git clone https://
```markdown
# 📥 Detaillierte Installationsanleitung

## Systemanforderungen

- **Node.js**: Version 18.0.0 oder höher
- **NPM**: Version 8.0.0 oder höher
- **Perplexity Pro**: Aktives Abonnement mit API-Zugang
- **MCP-Client**: Trae IDE, Cline oder andere MCP-kompatible Software

## Schritt-für-Schritt Installation

### 1. Repository Setup

```

# Repository klonen

```jsx
git clone <your-repository-url>
cd perplexity-expert-mcp
```

# Dependencies installieren

```jsx
npm install
```

# Development Dependencies (optional)

```jsx
npm install --save-dev
```

```markdown

### 2. Perplexity API-Schlüssel einrichten

1. **Perplexity Account**:
   - Gehen Sie zu [perplexity.ai](<https://perplexity.ai>)
   - Melden Sie sich an oder erstellen Sie einen Account
   - Upgraden Sie zu Perplexity Pro

2. **API-Schlüssel generieren**:
   - Gehen Sie zu Settings > API
   - Klicken Sie auf "Generate API Key"
   - Kopieren Sie den Schlüssel (beginnt mit `pplx-`)

3. **Umgebungsvariablen konfigurieren**:

```

```jsx
cp .env.example .env
```

```markdown

Bearbeiten Sie `.env`:

```

```jsx
PERPLEXITY_API_KEY=pplx-your-actual-api-key-here
```

```markdown

### 3. Projekt builden

```

# TypeScript kompilieren

```jsx
npm run build
```

# Test ob alles funktioniert

```jsx
npm start
```

```markdown

Der Server sollte starten und folgende Ausgabe zeigen:

```

🚀 Perplexity Pro Expert Delegation MCP Server läuft
🎯 Verfügbare Modelle: claude-4-sonnet, claude-4-sonnet-thinking, gemini-2.5-pro, sonar-reasoning-pro, gpt-4-omni, r1-1776
⚡ Powered by Perplexity Pro API

```markdown

### 4. Global installieren (Empfohlen)

```

# Global installieren für einfache Nutzung

```jsx
npm install -g .
```

# Testen

```jsx
perplexity-expert-mcp --help
```

```markdown

## IDE-Integration

### Trae IDE

1. **Öffnen Sie Trae IDE**
2. **Gehen Sie zu Einstellungen**:
   - Klicken Sie auf das Zahnrad-Symbol
   - Wählen Sie "MCP"

3. **Neuen Server hinzufügen**:
   - Klicken Sie auf "+"
   - Wählen Sie "Manual Configuration"

4. **Konfiguration einfügen**:

```

```jsx
{
"name": "Perplexity Expert Delegation",
"description": "Expert-LLM Delegation via Perplexity Pro",
"transport": "stdio",
"command": "perplexity-expert-mcp",
"env": {
"PERPLEXITY_API_KEY": "pplx-your-actual-api-key"
}
}
```

```markdown

5. **Speichern und aktivieren**

### Cline (VS Code Extension)

1. **Installieren Sie Cline** aus dem VS Code Marketplace
2. **Öffnen Sie VS Code Settings** (Ctrl/Cmd + ,)
3. **Suchen Sie nach "Cline MCP"**
4. **Fügen Sie Server-Konfiguration hinzu**:

```

```jsx
{
"mcpServers": {
"perplexity-expert": {
"command": "perplexity-expert-mcp",
"env": {
"PERPLEXITY_API_KEY": "pplx-your-actual-api-key"
}
}
}
}
```

```markdown

### Cursor IDE

1. **Öffnen Sie Cursor Settings**
2. **Navigieren Sie zu Extensions > MCP**
3. **Fügen Sie neue Server-Konfiguration hinzu**:

```

```jsx
{
"name": "perplexity-expert",
"command": ["perplexity-expert-mcp"],
"env": {
"PERPLEXITY_API_KEY": "pplx-your-actual-api-key"
}
}
```

```markdown

## Erweiterte Konfiguration

### Umgebungsvariablen

Erstellen Sie eine `.env` Datei mit folgenden Optionen:

```

# Erforderlich

```jsx
PERPLEXITY_API_KEY=pplx-your-api-key
```

# Optional: Debug-Modus

```jsx
DEBUG=true
```

# Optional: Timeout-Einstellungen (Millisekunden)

```jsx
DEFAULT_TIMEOUT=60000
REASONING_TIMEOUT=180000
```

# Optional: Retry-Einstellungen

```jsx
MAX_RETRIES=3
RETRY_DELAY=1000
```

```markdown

### Docker Installation

```

# Docker Image erstellen

```jsx
docker build -t perplexity-expert-mcp .
```

# Container starten

```jsx
docker run -e PERPLEXITY_API_KEY=pplx-your-key perplexity-expert-mcp
```

```markdown

### Development Setup

```

# Development dependencies installieren

```jsx
npm install --save-dev
```

# Development Server starten (mit Hot Reload)

```jsx
npm run dev
```

# Tests ausführen (wenn vorhanden)

```jsx
npm test
```

# Code linting

```jsx
npm run lint
```

```markdown

## Fehlerbehebung

### Installation schlägt fehl

**Problem**: `npm install` schlägt fehl

```

# Node.js Version prüfen

```jsx
node --version  # Sollte >= 18.0.0 sein
```

# NPM Cache leeren

```jsx
npm cache clean --force
```

# Dependencies neu installieren

```jsx
rm -rf node_modules package-lock.json
npm install
```

```markdown

### TypeScript Compilation Fehler

**Problem**: `npm run build` schlägt fehl

```

# TypeScript global installieren

```jsx
npm install -g typescript
```

# Sicherstellen dass alle Types installiert sind

```jsx
npm install --save-dev @types/node
```

# Manual compilation

```jsx
npx tsc
```

```markdown

### API-Schlüssel Probleme

**Problem**: "Ungültiger API-Schlüssel"
1. Überprüfen Sie dass der Schlüssel mit `pplx-` beginnt
2. Stellen Sie sicher dass Ihr Pro-Abo aktiv ist
3. Testen Sie den Schlüssel direkt:

```

```jsx
curl -H "Authorization: Bearer pplx-your-key" \
https://api.perplexity.ai/chat/completions
```

```markdown

### MCP Connection Fehler

**Problem**: IDE kann nicht mit Server verbinden
1. Überprüfen Sie dass der Server läuft: `perplexity-expert-mcp`
2. Prüfen Sie die Pfade in der IDE-Konfiguration
3. Stellen Sie sicher dass die Umgebungsvariablen korrekt sind

## Performance Optimierung

### Für bessere Performance:

1. **Caching aktivieren** (falls verfügbar):

```

```jsx
ENABLE_CACHE=true
CACHE_TTL=300
```

```markdown

2. **Timeout anpassen**:

```

```jsx
DEFAULT_TIMEOUT=30000      # Für schnelle Modelle
REASONING_TIMEOUT=120000   # Für Reasoning-Modelle
```

```markdown

3. **Parallele Anfragen begrenzen**:

```

```jsx
MAX_CONCURRENT_REQUESTS=3
```

```markdown

## Monitoring & Logging

### Debug-Logs aktivieren:

```

```jsx
DEBUG=true
LOG_LEVEL=debug
```

```markdown

### Log-Output umleiten:

```

# Logs in Datei speichern

```jsx
perplexity-expert-mcp 2> server.log
```

# Real-time Monitoring

```jsx
tail -f server.log
```

```markdown

## Nächste Schritte

Nach erfolgreicher Installation:

1. **Lesen Sie [docs/API.md](API.md)** für API-Details
2. **Schauen Sie sich [docs/EXAMPLES.md](EXAMPLES.md)** für Beispiele an
3. **Testen Sie die verschiedenen Tools** in Ihrer IDE
4. **Konfigurieren Sie erweiterte Features** nach Bedarf

Bei weiteren Fragen erstellen Sie ein Issue im Repository oder kontaktieren Sie den Support.

```