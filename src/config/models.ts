export interface ModelConfig {
  model: string;
  description: string;
  reasoning: boolean;
  strength: 'coding' | 'analysis' | 'multimodal' | 'research' | 'general' | 'creative';
  maxTokens: number;
  defaultTemperature: number;
}

export const EXPERT_MODELS: Record<string, ModelConfig> = {
  "claude-4-sonnet": {
    model: "claude-sonnet-4",
    description: "Claude 4 Sonnet - Überlegene Intelligenz für Coding und komplexe Aufgaben",
    reasoning: false,
    strength: "coding",
    maxTokens: 4096,
    defaultTemperature: 0.1
  },
  "claude-4-sonnet-thinking": {
    model: "claude-sonnet-4-thinking",
    description: "Claude 4 Sonnet mit Extended Thinking - Tiefere Analyse und Problemlösung",
    reasoning: true,
    strength: "analysis",
    maxTokens: 8192,
    defaultTemperature: 0.1
  },
  "gemini-2.5-pro": {
    model: "gemini-2.5-pro",
    description: "Gemini 2.5 Pro - Multimodale AI für vielseitige Aufgaben",
    reasoning: false,
    strength: "multimodal",
    maxTokens: 4096,
    defaultTemperature: 0.2
  },
  "sonar-reasoning-pro": {
    model: "sonar-reasoning-pro",
    description: "Sonar Reasoning Pro - Web-Suche mit fortgeschrittener Analyse",
    reasoning: true,
    strength: "research",
    maxTokens: 6144,
    defaultTemperature: 0.1
  },
  "gpt-4-omni": {
    model: "gpt-4-omni",
    description: "GPT-4 Omni - Vielseitiges Modell mit starken Reasoning-Fähigkeiten",
    reasoning: false,
    strength: "general",
    maxTokens: 4096,
    defaultTemperature: 0.1
  },
  "r1-1776": {
    model: "r1-1776",
    description: "R1 1776 - Spezialisiert auf tiefes Reasoning und komplexe Problemlösung",
    reasoning: true,
    strength: "analysis",
    maxTokens: 6144,
    defaultTemperature: 0.1
  }
};

export const TASK_TYPES = {
  analysis: "Umfassende Analysen und strukturierte Bewertungen",
  coding: "Software-Entwicklung und Programmierung",
  creative: "Kreative Inhalte und innovative Lösungen",
  research: "Recherche und aktuelle Informationen",
  "problem-solving": "Strategische Problemlösung und Planung"
} as const;

export type TaskType = keyof typeof TASK_TYPES;
