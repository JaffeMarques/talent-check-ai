import axios, { AxiosInstance } from 'axios';
import { LlmProviderBase } from '../llm-provider-base';
import { I18nService } from 'nestjs-i18n';
import { LlmResponse } from '../llm-response.interface';

export class CustomLlmProvider extends LlmProviderBase {
  private httpClient: AxiosInstance;
  private apiKey: string;
  private baseUrl = process.env.CUSTOM_URL;

  constructor(protected i18n: I18nService) {
    super();
    this.apiKey = process.env.CUSTOM_API_KEY;
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
      const response = await this.httpClient.post(
        process.env.CUSTOM_SUFIX,
        prompt
      );

      return response.data;
    } catch (error) {
      this.handleApiError(error);
    }
  }
}
