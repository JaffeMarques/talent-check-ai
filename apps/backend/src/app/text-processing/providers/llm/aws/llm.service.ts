import { I18nService } from 'nestjs-i18n';
import { LlmProviderBase } from '../llm-provider-base';
import { LlmResponse } from '../llm-response.interface';
import {
  InvokeEndpointCommand,
  SageMakerRuntimeClient,
} from '@aws-sdk/client-sagemaker-runtime';

export class AwsLlmService extends LlmProviderBase {
  private client: SageMakerRuntimeClient;
  private model = process.env.AWS_MODEL_ENDPOINT;

  constructor(readonly i18n: I18nService) {
    super();
    this.i18n = i18n;
    this.client = new SageMakerRuntimeClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
      },
    });
  }

  async generateResponse(prompt: string): Promise<LlmResponse> {
    const command = new InvokeEndpointCommand({
      EndpointName: this.model,
      ContentType: 'application/json',
      Body: JSON.stringify({
        inputs: prompt,
      }),
    });

    const response = await this.client.send(command);
    const responseBody = JSON.parse(await response.Body.transformToString());
    return {
      text: responseBody[0].generated_text,
    };
  }
}
