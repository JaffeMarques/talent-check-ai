import { I18nService } from 'nestjs-i18n';
import { LlmProviderBase } from '../llm-provider-base';

export class CohereLlmService extends LlmProviderBase {
  protected baseUrl: string;
  protected apiKey: string;
  private maxTokens = +process.env.COHERE_MAX_TOKENS;
  private temperature = +process.env.COHERE_TEMPERATURE;

  constructor(readonly i18n: I18nService) {
    super();
    this.baseUrl = process.env.COHERE_URL;
    this.apiKey = process.env.COHERE_API_KEY;
    this.i18n = i18n;
    this.initializeHttpClient();
  }

  async generateQuestions(skills) {
    return await Promise.all(
      Object.keys(skills)
        .slice(0, 3)
        .map(async (skill) => {
          return await this.generateText(skill);
        })
    );
  }

  async generateText(skill: string): Promise<string> {
    const prompt = await this.generateQuestionsPrompt(skill);
    const response = await this.makeApiCall('/generate', {
      model: process.env.COHERE_MODEL,
      prompt,
      max_tokens: this.maxTokens,
      temperature: this.temperature,
    });
    const text = response.generations[0].text.trim();
    return this.formatText(text, skill);
  }

  formatText(text, splitter): string {
    return text.split(splitter + ' - ')[1];
  }
}
