import axios, { AxiosInstance } from 'axios';
import { LlmProviderBase } from '../llm-provider-base';
import { I18nService } from 'nestjs-i18n';
import { LlmResponse } from '../llm-response.interface';

export class OpenAiLlmProvider extends LlmProviderBase {
  private httpClient: AxiosInstance;
  private apiKey: string;
  private baseUrl = process.env.OPENAI_URL;
  private model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
  private maxTokens = +process.env.OPENAI_MAX_TOKENS || 100;
  private temperature = +process.env.OPENAI_TEMPERATURE || 0.7;

  constructor(protected i18n: I18nService) {
    super();
    this.apiKey = process.env.OPENAI_API_KEY;
    this.initializeHttpClient();
  }

  private initializeHttpClient() {
    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  async generateResponse(prompt: string): Promise<LlmResponse> {
    try {
      const response = await this.httpClient.post('/chat/completions', {
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: this.maxTokens,
        temperature: this.temperature,
      });

      return response.data.choices[0].message.content.trim();
    } catch (error) {
      this.handleApiError(error);
    }
  }
}
