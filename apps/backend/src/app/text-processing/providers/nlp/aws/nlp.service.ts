import {
  ComprehendClient,
  DetectEntitiesCommand,
} from '@aws-sdk/client-comprehend';
import { NlpProvider } from '../../../interfaces/nlp-provider.interface';
import { I18nService } from 'nestjs-i18n';

export class AwsNlpService implements NlpProvider {
  private comprehendClient: ComprehendClient;

  constructor(private readonly i18n: I18nService) {
    this.comprehendClient = new ComprehendClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
      },
    });
  }

  async processText(text: string, lang) {
    const entitiesCommand = new DetectEntitiesCommand({
      Text: text,
      LanguageCode: lang,
    });

    const entitiesResult = await this.comprehendClient.send(entitiesCommand);
    const entities = entitiesResult.Entities;
    const processedEntity = await this.processEntities(entities);

    return {
      entities: {
        skills: processedEntity,
      },
    };
  }

  async processEntities(entities): Promise<Record<string, number>> {
    const skillMap = entities.reduce((map, entity) => {
      if (entity.Type === 'TITLE') {
        const key = entity.Text.toUpperCase();
        map.set(key, (map.get(key) || 0) + 1);
      }
      return map;
    }, new Map<string, number>());

    const sortedEntries = Array.from(skillMap.entries()) as [string, number][];
    sortedEntries.sort((a, b) => b[1] - a[1]);

    return Object.fromEntries(sortedEntries);
  }
}
