import { Injectable } from '@nestjs/common';
import { AnalyzeResumeDto } from './dto/analyze-resume.dto';
import { TextProcessingService } from '../text-processing/text-processing.service';

@Injectable()
export class ResumeService {
  constructor(private readonly textProcessingService: TextProcessingService) {}

  async create(analyzeDto: AnalyzeResumeDto, file) {
    const lang = analyzeDto.lang || 'en';
    return await this.textProcessingService.process(file, lang);
  }
}
