export interface NlpProvider {
  processText(
    text: string,
    lang: string
  ): Promise<{
    entities;
  }>;
}
