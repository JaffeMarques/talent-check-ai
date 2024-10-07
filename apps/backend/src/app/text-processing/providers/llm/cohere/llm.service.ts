import { I18nService } from 'nestjs-i18n';
import { LlmProviderBase } from '../llm-provider-base';
import axios, { AxiosInstance } from 'axios';
import { LlmResponse } from '../llm-response.interface';

export class CohereLlmProvider extends LlmProviderBase {
  private httpClient: AxiosInstance;
  private apiKey: string;
  private baseUrl = process.env.COHERE_URL;
  private maxTokens = +process.env.COHERE_MAX_TOKENS;
  private temperature = +process.env.COHERE_TEMPERATURE;

  constructor(protected i18n: I18nService) {
    super();
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
      const response = await this.httpClient.post('/generate', {
        model: process.env.COHERE_MODEL,
        prompt,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
      });
      return response.data.generations[0].text.trim();
    } catch (error) {
      this.handleApiError(error);
    }
  }
}
