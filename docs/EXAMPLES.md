```markdown
# 🎯 Praktische Beispiele

Dieser Guide zeigt Ihnen praktische Anwendungsfälle für den Perplexity Expert MCP Server.

## Schnellstart-Beispiele

### Basis-Verwendung in Trae IDE

```

@Builder with MCP

Verwende "smart-expert-route" für: "Erkläre mir die Unterschiede zwischen React Server Components und Client Components"

```

## 💻 Coding & Development

### Code-Review

```

@Builder with MCP

Nutze "consult-expert" mit:

- expert_model: "claude-4-sonnet"
- task_type: "coding"
- query: "Reviewe diesen TypeScript Code und gib Verbesserungsvorschläge:

```tsx
function getUserData(id: string) {
  const user = fetch('/api/users/' + id).then(res => res.json());
  return user;
}

```

```markdown

### Architektur-Entscheidungen

```

@Builder with MCP

Verwende "claude-4-sonnet-thinking" über "consult-expert" für:
"Analysiere die Vor- und Nachteile von GraphQL vs REST API für eine E-Commerce Platform mit 100k+ daily active users. Berücksichtige Performance, Entwicklungsgeschwindigkeit und Wartbarkeit."

```markdown

### Multi-Expert Code-Vergleich

```

@Builder with MCP

Nutze "compare-experts" mit models ["claude-4-sonnet", "gemini-2.5-pro", "gpt-4-omni"] für:
"Wie würdet ihr eine Rate-Limiting Middleware in Express.js implementieren? Zeigt unterschiedliche Ansätze."

```markdown

## 🔍 Research & Analysis

### Marktforschung

```

@Builder with MCP

Verwende "sonar-reasoning-pro" über "consult-expert" für:
"Was sind die aktuellen Trends im KI-Markt 2025? Analysiere besonders die Entwicklungen bei Large Language Models und deren kommerzielle Anwendungen."

```markdown

### Technologie-Bewertung

```

@Builder with MCP

Smart-Route diese Anfrage: "Vergleiche die neuesten JavaScript Frontend-Frameworks. Was sind die Vor- und Nachteile von Next.js 15, Nuxt 4, und SvelteKit?"

```markdown

## 🧠 Komplexe Problemlösung

### Strategische Planung

```

@Builder with MCP

Nutze "claude-4-sonnet-thinking" mit force_thinking: true für:
"Entwickle eine Schritt-für-Schritt Strategie für die Migration einer Legacy-Monolith-Anwendung zu Microservices. Die App hat 2M Nutzer, 500GB Datenbank, und 50 Entwickler."

```markdown

### Systemdesign

```

@Builder with MCP

Verwende "r1-1776" über "consult-expert" für:
"Designe ein fault-tolerantes, skalierares Chat-System für 10M gleichzeitige Nutzer. Berücksichtige Message-Delivery, Presence-Status, File-Sharing und Verschlüsselung."

```markdown

## 🎨 Kreative Aufgaben

### Content-Erstellung

```

@Builder with MCP

Nutze "gpt-4-omni" für creative tasks:
"Schreibe einen technischen Blog-Post über 'Zero-Downtime Deployments' für ein Developer-Publikum. Der Artikel soll praxisnah, aber unterhaltsam sein."

```markdown

### Marketing-Content

```

@Builder with MCP

Verwende "gemini-2.5-pro" für:
"Erstelle eine Social Media Kampagne für ein neues SaaS-Tool für Entwickler. Include Posts für LinkedIn, Twitter und Reddit mit verschiedenen Tonalitäten."

```markdown

## 🏢 Business & Strategie

### Produktstrategie

```

@Builder with MCP

Smart-Route: "Analysiere die Marktchancen für ein neues Code-Editor Plugin. Berücksichtige Konkurrenz, Zielgruppe, Pricing-Strategien und Go-to-Market Ansätze."

```markdown

### ROI-Analyse

```

@Builder with MCP

Nutze "claude-4-sonnet-thinking" für:
"Berechne und analysiere den ROI für die Einführung von AI-Pair-Programming Tools in einem 200-Personen Entwicklerteam. Berücksichtige Costs, Productivity-Gains und Training."

```markdown

## 🔧 DevOps & Infrastructure

### Cloud-Migration

```

@Builder with MCP

Compare experts ["claude-4-sonnet", "claude-4-sonnet-thinking"] für:
"Erstelle einen detaillierten Plan für die Migration von On-Premise Infrastructure zu AWS. 50 Services, 500GB/day Traffic, 99.9% Uptime Requirement."

```markdown

### Monitoring-Setup

```

@Builder with MCP

Verwende "claude-4-sonnet" für:
"Designe ein umfassendes Monitoring- und Alerting-System für eine Microservices-Architektur mit Prometheus, Grafana und ELK Stack."

```markdown

## 📊 Datenanalyse

### Database-Optimierung

```

@Builder with MCP

Nutze "claude-4-sonnet-thinking" für:
"Analysiere und optimiere diese PostgreSQL-Abfrage für bessere Performance:

```sql
SELECT u.name, p.title, c.content, c.created_at
FROM users u
JOIN posts p ON u.id = p.user_id
JOIN comments c ON p.id = c.post_id
WHERE u.created_at > '2024-01-01'
AND p.published = true
ORDER BY c.created_at DESC
LIMIT 100;

```

```markdown

### Data-Pipeline Design

```

@Builder with MCP

Smart-Route: "Entwirf eine real-time Data Pipeline für E-Commerce Analytics. Input: 1M events/hour, Output: Dashboard mit <1min Latency, Budget: $5k/month."

```markdown

## 🤖 AI & Machine Learning

### Model-Selection

```

@Builder with MCP

Compare models ["claude-4-sonnet-thinking", "gemini-2.5-pro"] für:
"Ich möchte ein Recommendation-System für eine Video-Platform bauen. Vergleiche verschiedene ML-Ansätze: Collaborative Filtering, Content-based, und Hybrid-Systeme."

```markdown

### Prompt-Engineering

```

@Builder with MCP

Verwende "r1-1776" für:
"Entwickle eine Prompt-Engineering Strategie für einen Code-Generator. Der Assistant soll sauberen, getesteten Code mit Dokumentation für verschiedene Programmiersprachen erzeugen."

```markdown

## 🎯 Workflow-Optimierung

### Multi-Step Analysis

```

@Builder with MCP

# Schritt 1: Research

Verwende "sonar-reasoning-pro" für: "Was sind die aktuellen Best Practices für API-Design in 2025?"

# Schritt 2: Deep Analysis

Dann nutze "claude-4-sonnet-thinking": "Basierend auf den Research-Ergebnissen, entwickle API-Design Guidelines für unser Team."

# Schritt 3: Implementation

Schließlich "claude-4-sonnet": "Erstelle Code-Templates und Beispiele für diese Guidelines."

```markdown

### A/B Testing Strategy

```

@Builder with MCP

Smart-Route: "Designe eine A/B Testing Strategie für eine neue Checkout-Page. Berücksichtige statistiche Signifikanz, Sample-Größe und Success-Metriken."

```markdown

## 📈 Advanced Use Cases

### Complex System Integration

```

@Builder with MCP

Nutze "claude-4-sonnet-thinking" mit context:
"
Context: Enterprise mit 500k Kunden, 20 Legacy-Systeme, SAP Integration, Compliance Requirements (GDPR, SOX)

Query: Entwickle eine Integrationsstrategie für ein neues CRM-System. Berücksichtige Data-Migration, API-Design, Security und Rollback-Strategien.
"

```markdown

### Technical Due Diligence

```

@Builder with MCP

Compare experts ["claude-4-sonnet", "claude-4-sonnet-thinking", "gemini-2.5-pro"] für:
"Bewerte dieses Startup aus technischer Sicht: React/Node.js App, 100k Users, MongoDB, AWS-hosted, 5 Entwickler, 2 Jahre alt, Series A Funding Round."

```markdown

## 🎛️ Configuration Examples

### Custom Temperature Settings

```

@Builder with MCP

# Für präzise technische Antworten

Nutze "consult-expert" mit temperature: 0.0

# Für kreative Lösungsansätze

Nutze "consult-expert" mit temperature: 0.8

# Für ausgewogene Antworten

Nutze "consult-expert" mit temperature: 0.3

```markdown

### Context-Rich Queries

```

@Builder with MCP

Verwende "claude-4-sonnet" mit:

- context: "Startup, 10 Entwickler, React/Python Stack, 50k Users, Budget $100k/Jahr, AWS hosted"
- task_type: "problem-solving"
- query: "Wie skalieren wir unsere Architektur für 500k Users in den nächsten 6 Monaten?"

```markdown

## 🚀 Pro Tips

### 1. Modell-Auswahl Cheat Sheet

- **Quick Code Fixes**: `claude-4-sonnet`
- **Complex Architecture**: `claude-4-sonnet-thinking`
- **Current Tech News**: `sonar-reasoning-pro`
- **Creative Solutions**: `gpt-4-omni` oder `gemini-2.5-pro`
- **Unknown Problem**: `smart-expert-route`

### 2. Bessere Prompts

```

# ❌ Vage

"Hilf mir mit meiner Website"

# ✅ Spezifisch

"Optimiere die Performance meiner React-E-Commerce-App. Core Web Vitals sind schlecht: LCP 4.2s, FID 280ms, CLS 0.28. Traffic: 10k/day, Stack: Next.js 14, Vercel hosting."

```markdown

### 3. Iterative Verbesserung

```

@Builder with MCP

# Round 1: Overview

Smart-Route: "Wie implementiere ich Real-time Features in meiner App?"

# Round 2: Deep Dive

Nutze "claude-4-sonnet-thinking": "Basierend auf WebSockets vs SSE Comparison, erstelle detaillierte Implementation für Chat-Features"

# Round 3: Code

Verwende "claude-4-sonnet": "Schreibe Production-ready WebSocket Code mit Error Handling und Reconnection Logic"

```markdown

Diese Beispiele zeigen die Vielseitigkeit und Power des Expert Delegation Systems. Experimentieren Sie mit verschiedenen Kombinationen und finden Sie Ihren optimalen Workflow!

```