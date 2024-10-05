import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AnalyzeResumeDto } from './dto/analyze-resume.dto';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post('analyze')
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() analyzeDto: AnalyzeResumeDto) {
    return this.resumeService.create(analyzeDto);
  }
}
