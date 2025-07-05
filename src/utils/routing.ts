import { EXPERT_MODELS, TaskType } from '../config/models.js';

export interface RoutingResult {
  selectedModel: string;
  taskType: TaskType;
  reasoning: string;
  confidence: number;
}

interface KeywordCounts {
  coding: number;
  complexity: number;
  analysis: number;
  research: number;
  multimodal: number;
  creative: number;
  reasoning: number;
}

export class SmartRouter {
  static analyzeAndRoute(query: string, forceThinking = false): RoutingResult {
    const queryLower = query.toLowerCase();
    const keywords = this.extractKeywords(queryLower);

    if (forceThinking) {
      return {
        selectedModel: "claude-4-sonnet-thinking",
        taskType: "problem-solving",
        reasoning: "Extended Thinking wurde explizit angefordert",
        confidence: 1.0
      };
    }

    const scores = {
      "claude-4-sonnet": 0,
      "claude-4-sonnet-thinking": 0,
      "gemini-2.5-pro": 0,
      "sonar-reasoning-pro": 0,
      "gpt-4-omni": 0,
      "r1-1776": 0
    };

    let primaryTaskType: TaskType = "analysis";
    let maxScore = 0;

    if (keywords.coding > 0) {
      scores["claude-4-sonnet"] += keywords.coding * 3;
      primaryTaskType = "coding";
    }
    if (keywords.complexity > 2 || keywords.analysis > 1) {
      scores["claude-4-sonnet-thinking"] += (keywords.complexity + keywords.analysis) * 2;
      scores["r1-1776"] += keywords.complexity * 2;
      primaryTaskType = "problem-solving";
    }
    if (keywords.research > 0) {
      scores["sonar-reasoning-pro"] += keywords.research * 4;
      primaryTaskType = "research";
    }
    if (keywords.multimodal > 0) {
      scores["gemini-2.5-pro"] += keywords.multimodal * 3;
      primaryTaskType = "analysis";
    }
    if (keywords.creative > 0) {
      scores["gpt-4-omni"] += keywords.creative * 2;
      scores["gemini-2.5-pro"] += keywords.creative * 1.5;
      primaryTaskType = "creative";
    }
    if (keywords.reasoning > 0) {
      scores["claude-4-sonnet-thinking"] += keywords.reasoning * 2;
      scores["r1-1776"] += keywords.reasoning * 2;
      scores["sonar-reasoning-pro"] += keywords.reasoning * 1.5;
    }

    let selectedModel = "claude-4-sonnet";
    for (const [model, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        selectedModel = model;
      }
    }

    const confidence = Math.min(0.95, Math.max(0.6, maxScore / 10));
    const reasoning = this.generateReasoning(selectedModel, keywords, maxScore);

    return {
      selectedModel,
      taskType: primaryTaskType,
      reasoning,
      confidence
    };
  }

  private static extractKeywords(query: string): KeywordCounts {
    const keywordPatterns = {
      coding: [
        'code', 'programmier', 'software', 'debug', 'implementier', 'refactor',
        'algorithm', 'function', 'class', 'method', 'api', 'framework',
        'javascript', 'python', 'typescript', 'react', 'node', 'sql'
      ],
      complexity: [
        'komplex', 'schwierig', 'herausfordernd', 'vielschichtig', 'sophisticated',
        'strategie', 'architektur', 'system', 'skalier', 'enterprise'
      ],
      analysis: [
        'analysiere', 'bewerte', 'vergleiche', 'untersuche', 'prüfe',
        'evaluiere', 'beurteile', 'einschätze'
      ],
      research: [
        'research', 'aktuell', 'neuest', 'news', 'suche', 'informationen',
        'trend', 'markt', 'entwicklung', 'status'
      ],
      multimodal: [
        'bild', 'multimodal', 'visuell', 'grafik', 'chart', 'diagramm',
        'photo', 'video', 'audio'
      ],
      creative: [
        'kreativ', 'schreib', 'story', 'idee', 'brainstorm', 'innovativ',
        'artikel', 'blog', 'content', 'marketing'
      ],
      reasoning: [
        'durchdenke', 'erkläre schritt', 'begründe', 'logic', 'schlussfolger',
        'ableite', 'folgere', 'think through', 'step by step'
      ]
    };

    const counts: KeywordCounts = {
      coding: 0,
      complexity: 0,
      analysis: 0,
      research: 0,
      multimodal: 0,
      creative: 0,
      reasoning: 0
    };

    for (const [category, patterns] of Object.entries(keywordPatterns)) {
      counts[category as keyof KeywordCounts] = patterns.reduce((count, pattern) => {
        const regex = new RegExp(pattern, 'gi');
        const matches = query.match(regex);
        return count + (matches ? matches.length : 0);
      }, 0);
    }

    return counts;
  }

  private static generateReasoning(model: string, keywords: KeywordCounts, score: number): string {
    const modelConfig = EXPERT_MODELS[model];
    const strength = modelConfig?.strength || 'general';

    const reasons = [];
    if (keywords.coding > 0 && strength === 'coding') {
      reasons.push(`Coding-Aufgabe erkannt (${keywords.coding} Indikatoren)`);
    }
    if (keywords.complexity > 1 && modelConfig?.reasoning) {
      reasons.push(`Komplexe Analyse erforderlich (${keywords.complexity} Komplexitäts-Indikatoren)`);
    }
    if (keywords.research > 0 && strength === 'research') {
      reasons.push(`Research-Anfrage mit Web-Zugang (${keywords.research} Research-Indikatoren)`);
    }
    if (keywords.multimodal > 0 && strength === 'multimodal') {
      reasons.push(`Multimodale Fähigkeiten erforderlich (${keywords.multimodal} Indikatoren)`);
    }
    if (reasons.length === 0) {
      reasons.push(`${modelConfig?.description || 'Vielseitiger Allrounder'} - Score: ${score.toFixed(1)}`);
    }
    return reasons.join(', ');
  }
}
