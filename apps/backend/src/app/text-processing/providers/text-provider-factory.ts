import { NlpProvider } from '../interfaces/nlp-provider.interface';
import { AwsNlpService } from './aws/nlp.service';
import { GoogleNplService } from './google/nlp.service';

export class TextProviderFactory {
  static create(provider: string): NlpProvider {
    switch (provider) {
      case 'google':
        return new GoogleNplService();
      default:
        return new AwsNlpService();
    }
  }
}
