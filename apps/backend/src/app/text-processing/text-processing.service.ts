import { BadRequestException, Injectable } from '@nestjs/common';
import { NlpProvider } from './interfaces/nlp-provider.interface';
import { NlpProviderFactory } from './providers/nlp/npl-provider-factory';
import { I18nService } from 'nestjs-i18n';
import pdfParse from 'pdf-parse';
import { LlmProviderBase } from './providers/llm/llm-provider-base';
import { LlmProviderFactory } from './providers/llm/llm-provider-factory';

@Injectable()
export class TextProcessingService {
  private configNlpProvider = process.env.NLP_PROVIDER;
  private configLlmProvider = process.env.LLM_PROVIDER;

  private llmProvider: LlmProviderBase;
  private nlpProvider: NlpProvider;

  constructor(private readonly i18n: I18nService) {
    this.nlpProvider = NlpProviderFactory.create(this.configNlpProvider, i18n);
    this.llmProvider = LlmProviderFactory.create(this.configLlmProvider, i18n);
  }

  async process(file, lang: string) {
    let questions = [];
    let skills = [];
    const text = await this.extractTextFromPdf(file.buffer);

    const nlpProcess = await this.nlpProvider.processText(text, lang);
    skills = nlpProcess.entities.skills;

    if (skills) {
      questions = await this.llmProvider.generateQuestions(skills);
    }

    return {
      questions: questions,
      skills: skills,
      experience: nlpProcess.entities.experience || [],
      resume: nlpProcess.entities.resume || [],
      improvement: nlpProcess.entities.improvement || [],
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
