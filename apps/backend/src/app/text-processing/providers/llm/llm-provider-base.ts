import { BadRequestException, Logger } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { LlmResponse } from './llm-response.interface';

export abstract class LlmProviderBase {
  protected abstract i18n: I18nService;
  private readonly logger = new Logger(LlmProviderBase.name);

  abstract generateResponse(prompt: string): Promise<LlmResponse>;

  protected async generateQuestionsPrompt(skill: string): Promise<string> {
    return await this.i18n.translate('translations.questionPrompt', {
      args: { skill },
    });
  }

  protected formatText(text, splitter): string {
    try {
      return text.split(splitter + ' - ')[1];
    } catch (error) {
      this.logger.warn(`Could not format the text: "${error.message}"`);
      return text;
    }
  }

  protected handleApiError(error): never {
    throw new BadRequestException(error.message);
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
    const response = await this.generateResponse(prompt);
    return this.formatText(response, skill);
  }
}
