import { BadRequestException, Injectable } from '@nestjs/common';
import { NlpProvider } from './interfaces/nlp-provider.interface';
import { TextProviderFactory } from './providers/text-provider-factory';
import { I18nService } from 'nestjs-i18n';
import pdfParse from 'pdf-parse';

@Injectable()
export class TextProcessingService {
  private provider: NlpProvider;

  constructor(private readonly i18n: I18nService) {
    this.provider = TextProviderFactory.create(process.env.PROVIDER);
  }

  async process(file, lang: string) {
    const text = await this.extractTextFromPdf(file.buffer);
    const processedText = await this.provider.processText(text, lang);
    return {
      skills: await this.processEntities(processedText.entities),
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

  async extractTextFromPdf(pdfBuffer: Buffer): Promise<string> {
    try {
      const data = await pdfParse(pdfBuffer);
      return data.text;
    } catch (error) {
      throw new BadRequestException(
        await this.i18n.translate('errors.invalidTextExtraction', {
          args: { error: error.message },
        })
      );
    }
  }
}
