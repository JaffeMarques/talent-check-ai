import { I18nService } from 'nestjs-i18n';
import { FileValidatorStrategy } from '../interfaces/file-validator-strategy.interface';
import { BadRequestException } from '@nestjs/common';

export class PdfFileValidator implements FileValidatorStrategy {
  constructor(private readonly i18n: I18nService) {}

  async validate(file): Promise<void> {
    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException(
        await this.i18n.translate('translations.errors.invalidFileType', {
          args: { type: 'PDF' },
        })
      );
    }
  }
}
