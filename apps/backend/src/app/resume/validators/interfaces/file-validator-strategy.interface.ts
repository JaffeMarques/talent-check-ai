export interface FileValidatorStrategy {
  validate(file): Promise<void>;
}
