import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { TypeCheck } from '../enums/type-check.enum';
import { Type } from 'class-transformer';
import { TechnologyDto } from './technology.dto';

export class AnalyzeResumeDto {
  @IsNotEmpty()
  type: TypeCheck;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TechnologyDto)
  technologies: TechnologyDto[];
}
