import { Module } from '@nestjs/common';
import { TextProcessingService } from './text-processing.service';

@Module({
  controllers: [],
  providers: [TextProcessingService],
  exports: [TextProcessingService],
})
export class TextProcessingModule {}
