import * as language from '@google-cloud/language';
import { NlpProvider } from '../../../interfaces/nlp-provider.interface';

export class GoogleNplService implements NlpProvider {
  private client: language.LanguageServiceClient;

  constructor() {
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
