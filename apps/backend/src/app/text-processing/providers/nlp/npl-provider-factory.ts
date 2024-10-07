import { I18nService } from 'nestjs-i18n';
import { NlpProvider } from '../../interfaces/nlp-provider.interface';
import { AwsNlpService } from './aws/nlp.service';
import { GoogleNplService } from './google/nlp.service';
import { OpenAiNlpProvider } from './openai/nlp.service';

export class NlpProviderFactory {
  static create(provider: string, i18n: I18nService): NlpProvider {
    switch (provider) {
      case 'google':
        return new GoogleNplService(i18n);
      case 'aws':
        return new AwsNlpService(i18n);
      default:
        return new OpenAiNlpProvider(i18n);
    }
  }
}
