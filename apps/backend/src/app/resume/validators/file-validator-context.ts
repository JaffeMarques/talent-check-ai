import { Injectable } from '@nestjs/common';
import { FileValidatorStrategy } from './interfaces/file-validator-strategy.interface';

@Injectable()
export class FileValidatorContext {
  private validators: FileValidatorStrategy[] = [];

  setValidator(validator: FileValidatorStrategy) {
    this.validators.push(validator);
  }

  async validate(file): Promise<void> {
    for (const validator of this.validators) {
      await validator.validate(file);
    }
  }
}
