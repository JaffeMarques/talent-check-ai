import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { TextProcessingModule } from '../text-processing/text-processing.module';

@Module({
  imports: [TextProcessingModule],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}
