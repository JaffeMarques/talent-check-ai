import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TechnologyDto } from './technology.dto';
import { TypeCheck } from '../enums/type-check.enum';

export class AnalyzeResumeDto {
  @IsNotEmpty()
  type: TypeCheck;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TechnologyDto)
  technologies?: TechnologyDto[];

  @IsOptional()
  @IsString()
  lang?: string;
}
