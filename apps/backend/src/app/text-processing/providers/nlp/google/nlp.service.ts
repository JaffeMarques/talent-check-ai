import * as language from '@google-cloud/language';
import { NlpProvider } from '../../../interfaces/nlp-provider.interface';
import { I18nService } from 'nestjs-i18n';

export class GoogleNplService implements NlpProvider {
  private client: language.LanguageServiceClient;

  constructor(private readonly i18n: I18nService) {
    this.client = new language.LanguageServiceClient();
  }

  async processText(text: string) {
    const document = {
      content: text,
      type: 'PLAIN_TEXT' as const,
    };

    const [entitiesResult] = await this.client.analyzeEntities({ document });
    const entities = entitiesResult.entities;

    return {
      entities,
    };
  }
}
