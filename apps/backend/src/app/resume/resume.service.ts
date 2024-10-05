import { Injectable } from '@nestjs/common';
import { AnalyzeResumeDto } from './dto/analyze-resume.dto';

@Injectable()
export class ResumeService {
  create(analyzeDto: AnalyzeResumeDto) {
    return 'This action adds a new resume';
  }
}
