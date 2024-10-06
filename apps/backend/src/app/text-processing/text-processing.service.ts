import { BadRequestException, Injectable } from '@nestjs/common';
import { NlpProvider } from './interfaces/nlp-provider.interface';
import { NlpProviderFactory } from './providers/npl-provider-factory';
import { I18nService } from 'nestjs-i18n';
import pdfParse from 'pdf-parse';
import { CohereLlmService } from './providers/cohere/llm.service';

@Injectable()
export class TextProcessingService {
  private provider: NlpProvider;
  private llmProvider: CohereLlmService;

  constructor(private readonly i18n: I18nService) {
    this.provider = NlpProviderFactory.create(process.env.PROVIDER);
    this.llmProvider = new CohereLlmService(i18n);
  }

  async process(file, lang: string) {
    const text = await this.extractTextFromPdf(file.buffer);
    const processedText = await this.provider.processText(text, lang);
    const skills = processedText.entities;

    const questions = await this.llmProvider.generateQuestions(skills);
    return {
      questions: questions,
      skills: skills,
    };
  }

  async extractTextFromPdf(pdfBuffer: Buffer): Promise<string> {
    try {
      const data = await pdfParse(pdfBuffer);
      return data.text;
    } catch (error) {
      throw new BadRequestException(
        await this.i18n.translate('translations.errors.invalidTextExtraction', {
          args: { error: error.message },
        })
      );
    }
  }
}
