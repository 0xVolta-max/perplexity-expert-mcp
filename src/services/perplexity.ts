import axios, { AxiosResponse } from 'axios';
import { ModelConfig } from '../config/models.js';

export interface PerplexityMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface PerplexityResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class PerplexityService {
  private readonly apiKey: string;
  private readonly baseUrl = "https://api.perplexity.ai/chat/completions";

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("PERPLEXITY_API_KEY ist erforderlich");
    }
    this.apiKey = apiKey;
  }

  async callExpert(
    modelConfig: ModelConfig,
    messages: PerplexityMessage[],
    temperature: number = modelConfig.defaultTemperature
  ): Promise<string> {
    try {
      const response: AxiosResponse<PerplexityResponse> = await axios.post(
        this.baseUrl,
        {
          model: modelConfig.model,
          messages,
          temperature: Math.max(0, Math.min(2, temperature)), // Clamp zwischen 0 und 2
          max_tokens: modelConfig.maxTokens,
          stream: false
        },
        {
          headers: {
            "Authorization": `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
            "User-Agent": "perplexity-expert-mcp/1.0.0"
          },
          timeout: modelConfig.reasoning ? 180000 : 60000, // 3 min für Reasoning, 1 min für normale
          validateStatus: (status) => status < 500 // Retry nur bei Server-Fehlern
        }
      );

      if (!response.data.choices?.[0]?.message?.content) {
        throw new Error("Unerwartete API-Antwort: Kein Content erhalten");
      }

      return response.data.choices[0].message.content;

    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.error?.message || error.message;

        switch (status) {
          case 401:
            throw new Error("Ungültiger API-Schlüssel. Überprüfen Sie Ihren PERPLEXITY_API_KEY.");
          case 429:
            throw new Error("Rate Limit erreicht. Versuchen Sie es später erneut.");
          case 402:
            throw new Error("Kontingent erschöpft. Überprüfen Sie Ihr Perplexity Pro Abo.");
          default:
            throw new Error(`Perplexity API Fehler (${status}): ${message}`);
        }
      } else if (error.code === 'ECONNABORTED') {
        throw new Error("Timeout: Die Anfrage dauerte zu lange. Versuchen Sie eine einfachere Anfrage.");
      } else {
        throw new Error(`Netzwerk-Fehler: ${error.message}`);
      }
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.callExpert(
        {
          model: "claude-4-sonnet",
          description: "Test",
          reasoning: false,
          strength: "general",
          maxTokens: 100,
          defaultTemperature: 0.1
        },
        [
          { role: "user", content: "Antworte nur mit 'OK'" }
        ]
      );
      return true;
    } catch {
      return false;
    }
  }
}
