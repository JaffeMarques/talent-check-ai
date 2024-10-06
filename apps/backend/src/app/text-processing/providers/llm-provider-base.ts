import { BadRequestException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { I18nService } from 'nestjs-i18n';

export abstract class LlmProviderBase {
  protected abstract baseUrl: string;
  protected abstract apiKey: string;
  protected abstract i18n: I18nService;
  protected httpClient: AxiosInstance;

  constructor() {
    this.httpClient = null;
  }

  protected initializeHttpClient() {
    if (!this.baseUrl || !this.apiKey) {
      throw new Error('Invalid api data');
    }

    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  protected async makeApiCall(endpoint: string, data) {
    try {
      const response = await this.httpClient.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  protected async generateQuestionsPrompt(
    skill: string
  ): Promise<string | unknown> {
    return await this.i18n.translate('translations.questionPrompt', {
      args: { skill },
    });
  }
}
