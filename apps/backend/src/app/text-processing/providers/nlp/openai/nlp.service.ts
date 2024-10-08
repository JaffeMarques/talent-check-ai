import axios, { AxiosInstance } from 'axios';
import { NlpProvider } from '../../../interfaces/nlp-provider.interface';
import { I18nService } from 'nestjs-i18n';

export class OpenAiNlpProvider implements NlpProvider {
  private httpClient: AxiosInstance;
  private apiKey: string;
  private baseUrl = process.env.OPENAI_URL;
  private model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
  private maxTokens = +process.env.OPENAI_MAX_TOKENS || 100;
  private temperature = +process.env.OPENAI_TEMPERATURE || 0.7;

  constructor(private readonly i18n: I18nService) {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.initializeHttpClient();
  }

  private initializeHttpClient() {
    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  async processText(text: string, lang: string) {
    const resume = this.createPrompt('nlpPrompt', text, lang);
    const resumeResponse = await this.callOpenAI(resume);
    const processedResume = await this.processEntities(resumeResponse);

    const years = this.createPrompt('nlpExperiencePrompt', text, lang);
    const yearsResponse = await this.callOpenAI(years);
    const processedYears = await this.processEntities(yearsResponse);

    const skills = this.createPrompt('nlpSkillsPrompt', text, lang);
    const skillsResponse = await this.callOpenAI(skills);
    const processedSkills = await this.processSkills(skillsResponse);

    return {
      entities: {
        skills: processedSkills,
        resume: processedResume,
        experience: processedYears,
      },
    };
  }

  async callOpenAI(prompt: string) {
    const response = await this.httpClient.post('/chat/completions', {
      model: this.model,
      messages: [
        {
          role: 'system',
          content: this.i18n.translate('translations.nlpContext'),
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: this.maxTokens,
      temperature: this.temperature,
    });

    return response.data.choices[0].message.content;
  }

  private createPrompt(key: string, text: string, lang: string = null) {
    return `${this.i18n.translate(`translations.${key}`, {
      args: { lang },
    })}\n\n${text}`;
  }

  processEntities(responseText: string): Record<string, string> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entities: Record<string, any> = {};

    const lines = responseText.split('\n').map((line) => line.trim());

    let currentKey: string | null = null;
    let currentValues: string[] = [];

    lines.forEach((line) => {
      if (line.endsWith(':')) {
        if (currentKey) {
          entities[currentKey] =
            currentValues.length > 1 ? currentValues : currentValues[0];
        }

        currentKey = line;
        currentValues = [];
      } else if (line.startsWith('-')) {
        currentValues.push(line.replace(/^- /, '').trim());
      } else if (line) {
        currentValues.push(line);
      }
    });

    if (currentKey) {
      entities[currentKey] =
        currentValues.length > 1 ? currentValues : currentValues[0];
    }

    return entities;
  }

  processSkills(responseText: string): string[] {
    return responseText
      .split('- ')
      .map((line) => line.trim().replace('\n', ''))
      .filter((line) => line !== '');
  }
}
