import { I18nService } from 'nestjs-i18n';
import { FileValidatorStrategy } from '../interfaces/file-validator-strategy.interface';
import { BadRequestException } from '@nestjs/common';

export class FileSizeValidator implements FileValidatorStrategy {
  constructor(
    private readonly maxSizeInBytes: number,
    private readonly i18n: I18nService
  ) {}

  async validate(file): Promise<void> {
    if (file.size > this.maxSizeInBytes) {
      throw new BadRequestException(
        await this.i18n.translate('errors.fileTooLarge', {
          args: { maxSize: this.maxSizeInBytes / (1024 * 1024) },
        })
      );
    }
  }
}
