import {
  ComprehendClient,
  DetectEntitiesCommand,
} from '@aws-sdk/client-comprehend';
import { NlpProvider } from '../../interfaces/nlp-provider.interface';

export class AwsNlpService implements NlpProvider {
  private comprehendClient: ComprehendClient;

  constructor() {
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

    return { entities };
  }
}
