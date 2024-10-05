import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AnalyzeResumeDto } from './dto/analyze-resume.dto';
import { FileValidatorContext } from './validators/file-validator-context';
import { I18nService } from 'nestjs-i18n';
import { PdfFileValidator } from './validators/rules/pdf-file-validator';
import { FileSizeValidator } from './validators/rules/file-size-validator';

@Controller('resume')
export class ResumeController {
  private fileValidator: FileValidatorContext;

  constructor(
    private readonly resumeService: ResumeService,
    private readonly i18n: I18nService
  ) {
    this.fileValidator = new FileValidatorContext();
    this.fileValidator.setValidator(new PdfFileValidator(i18n));
    this.fileValidator.setValidator(
      new FileSizeValidator(+process.env.MAX_FILE_SIZE, i18n)
    );
  }

  @Post('analyze')
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file, @Body() analyzeDto: AnalyzeResumeDto) {
    await this.fileValidator.validate(file);
    return this.resumeService.create(analyzeDto, file);
  }
}
