#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as dotenv from "dotenv";
import { EXPERT_MODELS, TASK_TYPES, TaskType } from './config/models.js';
import { PerplexityService, PerplexityMessage } from './services/perplexity.js';
import { SmartRouter } from './utils/routing.js';

dotenv.config();

const perplexityService = new PerplexityService(process.env.PERPLEXITY_API_KEY || '');

const server = new McpServer({
  name: "Perplexity Pro Expert Delegation Server",
  version: "1.0.0"
});

const availableModels = Object.keys(EXPERT_MODELS) as [string, ...string[]];

// Tool 1: Expert Consultation
server.tool(
  "consult-expert",
  "Konsultiere ein spezifisches Expert-LLM über Perplexity Pro für komplexe Aufgaben",
  {
    query: z.string().describe("Die komplexe Anfrage für den Experten"),
    expert_model: z.enum(availableModels).describe("Welches Expert-Modell verwendet werden soll"),
    context: z.string().optional().describe("Zusätzlicher Kontext für den Experten"),
    temperature: z.number().min(0).max(2).optional().describe("Temperature-Wert (0.0-2.0, default: Modell-spezifisch)"),
    task_type: z.enum(["analysis", "coding", "creative", "research", "problem-solving"]).optional().describe("Art der Aufgabe zur Prompt-Optimierung")
  },
  async ({ query, expert_model, context, temperature, task_type = "analysis" }) => {
    try {
      const modelConfig = EXPERT_MODELS[expert_model];
      if (!modelConfig) {
        throw new Error(`Unbekanntes Modell: ${expert_model}`);
      }

      const systemPrompts: Record<TaskType, string> = {
        analysis: "Du bist ein Experte für tiefgreifende Analysen. Liefere umfassende, datengestützte Erkenntnisse und strukturierte Bewertungen mit klaren Schlussfolgerungen.",
        coding: "Du bist ein Senior Software-Architekt und Coding-Experte. Liefere saubere, effiziente und gut dokumentierte Lösungen mit Best Practices. Erkläre deine Designentscheidungen.",
        creative: "Du bist ein kreativer Experte für innovative und originelle Inhalte. Denke außerhalb der gewohnten Bahnen und entwickle einzigartige, ansprechende Lösungen.",
        research: "Du bist ein Forschungsexperte, der präzise, gut recherchierte Informationen und tiefgreifende Erkenntnisse liefert. Beziehe aktuelle Entwicklungen ein.",
        "problem-solving": "Du bist ein strategischer Problemlöser, der komplexe Herausforderungen systematisch in umsetzbare Lösungen aufteilt. Berücksichtige verschiedene Perspektiven."
      };

      let expertPrompt = query;
      if (context) {
        expertPrompt = `**Kontext:**\n${context}\n\n**Aufgabe:**\n${query}`;
      }

      const messages: PerplexityMessage[] = [
        { role: "system", content: systemPrompts[task_type] },
        { role: "user", content: expertPrompt }
      ];

      const result = await perplexityService.callExpert(
        modelConfig,
        messages,
        temperature ?? modelConfig.defaultTemperature
      );
      if (!result) {
        throw new Error("Unerwartete API-Antwort: Kein Content erhalten");
      }

      const thinkingNote = modelConfig.reasoning
        ? "\n\n🧠 **Extended Thinking aktiviert** - Dieses Modell hat tiefere Analyse-Schritte durchgeführt."
        : "";

      const strengthEmoji = {
        coding: "💻",
        analysis: "🔍",
        multimodal: "🎨",
        research: "📚",
        general: "🌟",
        creative: "✨"
      }[modelConfig.strength] || "🤖";

      return {
        content: [
          {
            type: "text",
            text: `# 🎯 Expert Consultation Ergebnis\n\n## ${strengthEmoji} ${expert_model}\n\n${result}${thinkingNote}\n\n---\n\n**📊 Modell-Details:**\n- *${modelConfig.description}*\n- *🔧 Task Type: ${task_type}*\n- *🌡️ Temperature: ${temperature ?? modelConfig.defaultTemperature}*\n- *⚡ Powered by Perplexity Pro*`
          }
        ]
      };

    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: `# ❌ Expert Consultation Fehlgeschlagen\n\n**Modell:** ${expert_model}\n**Fehler:** ${error.message}\n\n## 💡 Mögliche Lösungen:\n- Überprüfen Sie Ihren PERPLEXITY_API_KEY\n- Stellen Sie sicher, dass Ihr Pro-Abo aktiv ist\n- Das gewählte Modell könnte temporär nicht verfügbar sein\n- Bei Timeout: Versuchen Sie eine kürzere/einfachere Anfrage`
          }
        ],
        isError: true
      };
    }
  }
);

// Tool 2: Smart Expert Router
server.tool(
  "smart-expert-route",
  "Automatische Auswahl und Konsultation des besten Expert-Modells basierend auf Anfrage-Analyse",
  {
    query: z.string().describe("Die Anfrage zur Analyse und Weiterleitung an den optimalen Experten"),
    context: z.string().optional().describe("Zusätzlicher Kontext für die Analyse"),
    force_thinking: z.boolean().optional().describe("Erzwinge Verwendung von Reasoning-Modellen")
  },
  async ({ query, context, force_thinking = false }) => {
    try {
      const routing = SmartRouter.analyzeAndRoute(query, force_thinking);
      const modelConfig = EXPERT_MODELS[routing.selectedModel];
      if (!modelConfig) {
        throw new Error(`Modell-Konfiguration für ${routing.selectedModel} nicht gefunden`);
      }

      const systemPrompts: Record<TaskType, string> = {
        analysis: "Du bist ein Experte für umfassende Analysen und präzise Bewertungen.",
        coding: "Du bist ein Senior Software-Experte für saubere, effiziente Lösungen.",
        "problem-solving": "Du bist ein strategischer Problemlöser für komplexe Herausforderungen.",
        research: "Du bist ein Forschungsexperte für präzise, aktuelle Informationen.",
        creative: "Du bist ein kreativer Experte für innovative Inhalte."
      };

      let expertPrompt = query;
      if (context) {
        expertPrompt = `**Kontext:**\n${context}\n\n**Aufgabe:**\n${query}`;
      }

      const messages: PerplexityMessage[] = [
        { role: "system", content: systemPrompts[routing.taskType] },
        { role: "user", content: expertPrompt }
      ];

      const result = await perplexityService.callExpert(modelConfig, messages);
      if (!result) {
        throw new Error("Unerwartete API-Antwort: Kein Content erhalten");
      }

      const thinkingNote = modelConfig.reasoning
        ? "\n\n🧠 **Extended Thinking aktiviert**"
        : "";

      const confidenceBar = "█".repeat(Math.floor(routing.confidence * 10)) +
        "░".repeat(10 - Math.floor(routing.confidence * 10));

      const strengthEmoji = {
        coding: "💻",
        analysis: "🔍",
        multimodal: "🎨",
        research: "📚",
        general: "🌟",
        creative: "✨"
      }[modelConfig.strength] || "🤖";

      return {
        content: [
          {
            type: "text",
            text: `# 🤖 Smart Expert Routing Ergebnis\n\n## 🎯 Routing-Analyse\n- **Gewähltes Modell:** ${strengthEmoji} ${routing.selectedModel}\n- **Begründung:** ${routing.reasoning}\n- **Task-Typ:** ${routing.taskType}\n- **Confidence:** ${confidenceBar} ${(routing.confidence * 100).toFixed(0)}%\n\n## 🎭 Expert Response\n\n${result}${thinkingNote}\n\n---\n\n**📊 Modell-Details:**\n- *${modelConfig.description}*\n- *⚡ Powered by Perplexity Pro*`
          }
        ]
      };

    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: `# ❌ Smart Routing Fehlgeschlagen\n\n**Fehler:** ${error.message}\n\nBitte überprüfen Sie Ihre Konfiguration und versuchen Sie es erneut.`
          }
        ],
        isError: true
      };
    }
  }
);

// Tool 3: Multi-Expert Comparison
server.tool(
  "compare-experts",
  "Vergleiche Antworten von mehreren Expert-Modellen parallel über Perplexity Pro",
  {
    query: z.string().describe("Die Anfrage, die an mehrere Experten gesendet werden soll"),
    models: z.array(z.enum(availableModels))
      .min(2)
      .max(4)
      .describe("Welche Modelle verglichen werden sollen (2-4 Modelle)")
      .default(["claude-4-sonnet", "gemini-2.5-pro"]),
    context: z.string().optional().describe("Zusätzlicher Kontext für alle Experten"),
    temperature: z.number().min(0).max(2).optional().describe("Temperature für alle Modelle")
  },
  async ({ query, models, context, temperature }) => {
    try {
      const uniqueModels = [...new Set(models)];
      const results = await Promise.allSettled(
        uniqueModels.map(async (modelName) => {
          const modelConfig = EXPERT_MODELS[modelName];
          if (!modelConfig) {
            throw new Error(`Modell-Konfiguration für ${modelName} nicht gefunden`);
          }

          let expertPrompt = query;
          if (context) {
            expertPrompt = `**Kontext:**\n${context}\n\n**Aufgabe:**\n${query}`;
          }

          const messages: PerplexityMessage[] = [
            {
              role: "system",
              content: "Du bist ein AI-Experte, der detaillierte, präzise Analysen liefert. Fokussiere dich auf deine Stärken und liefere eine einzigartige Perspektive."
            },
            {
              role: "user",
              content: expertPrompt
            }
          ];

          const result = await perplexityService.callExpert(
            modelConfig,
            messages,
            temperature ?? modelConfig.defaultTemperature
          );
          if (!result) {
            throw new Error("Unerwartete API-Antwort: Kein Content erhalten");
          }
          return {
            model: modelName,
            result,
            config: modelConfig
          };
        })
      );

      let comparisonText = "# 🏆 Expert Model Vergleich\n\n";
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          const { model, result: response, config } = result.value;
          const thinkingIcon = config.reasoning ? "🧠" : "⚡";
          const strengthIcon = {
            coding: "💻",
            analysis: "🔍",
            multimodal: "🎨",
            research: "📚",
            general: "🌟",
            creative: "✨"
          }[config.strength] || "🤖";
          comparisonText += `## ${thinkingIcon} ${strengthIcon} ${model}\n`;
          comparisonText += `*${config.description}*\n\n`;
          comparisonText += `${response}\n\n`;
          if (config.reasoning) {
            comparisonText += "*🧠 Extended Thinking wurde verwendet*\n\n";
          }
          comparisonText += `---\n\n`;
        } else {
          const modelName = uniqueModels[index];
          comparisonText += `## ❌ ${modelName} (Fehlgeschlagen)\n`;
          comparisonText += `*Fehler: ${result.reason instanceof Error ? result.reason.message : result.reason}*\n\n---\n\n`;
        }
      });

      const successCount = results.filter(r => r.status === "fulfilled").length;
      comparisonText += `*🔧 ${successCount}/${uniqueModels.length} Modelle erfolgreich | ⚡ Powered by Perplexity Pro*`;

      return {
        content: [
          {
            type: "text",
            text: comparisonText
          }
        ]
      };

    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: `# ❌ Model Vergleich Fehlgeschlagen\n\n**Fehler:** ${error.message}`
          }
        ],
        isError: true
      };
    }
  }
);

// Tool 4: Model Info
server.tool(
  "model-info",
  "Zeige Informationen über verfügbare Expert-Modelle",
  {},
  async () => {
    try {
      let infoText = "# 📊 Verfügbare Expert-Modelle\n\n";
      for (const [modelName, config] of Object.entries(EXPERT_MODELS)) {
        const strengthIcon = {
          coding: "💻",
          analysis: "🔍",
          multimodal: "🎨",
          research: "📚",
          general: "🌟",
          creative: "✨"
        }[config.strength] || "🤖";
        const reasoningIcon = config.reasoning ? "🧠" : "⚡";
        infoText += `## ${reasoningIcon} ${strengthIcon} ${modelName}\n`;
        infoText += `- **Beschreibung:** ${config.description}\n`;
        infoText += `- **Stärke:** ${config.strength}\n`;
        infoText += `- **Reasoning:** ${config.reasoning ? "Ja (Extended Thinking)" : "Nein"}\n`;
        infoText += `- **Max Tokens:** ${config.maxTokens}\n`;
        infoText += `- **Default Temperature:** ${config.defaultTemperature}\n\n`;
      }
      infoText += "\n## 🎯 Task Types\n\n";
      for (const [taskType, description] of Object.entries(TASK_TYPES)) {
        infoText += `- **${taskType}:** ${description}\n`;
      }
      infoText += "\n*⚡ Alle Modelle werden über Perplexity Pro API bereitgestellt*";
      return {
        content: [
          {
            type: "text",
            text: infoText
          }
        ]
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: `❌ Fehler beim Abrufen der Modell-Informationen: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }
);

async function main() {
  try {
    const connectionOk = await perplexityService.testConnection();
    if (!connectionOk) {
      console.error("⚠️  Warnung: Verbindung zu Perplexity API konnte nicht getestet werden");
    }
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("🚀 Perplexity Pro Expert Delegation MCP Server läuft");
    console.error("🎯 Verfügbare Modelle:", Object.keys(EXPERT_MODELS).join(", "));
    console.error("⚡ Powered by Perplexity Pro API");
  } catch (error) {
    console.error("❌ Fehler beim Starten des Servers:", error);
    process.exit(1);
  }
}

main().catch(console.error);
