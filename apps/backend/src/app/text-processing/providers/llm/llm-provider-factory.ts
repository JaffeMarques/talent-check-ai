import { I18nService } from 'nestjs-i18n';
import { AwsLlmService } from './aws/llm.service';
import { LlmProviderBase } from './llm-provider-base';
import { CohereLlmProvider } from './cohere/llm.service';

export class LlmProviderFactory {
  static create(provider: string, i18n: I18nService): LlmProviderBase {
    switch (provider) {
      case 'cohere':
        return new CohereLlmProvider(i18n);
      default:
        return new AwsLlmService(i18n);
    }
  }
}
