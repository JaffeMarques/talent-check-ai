import { IsNotEmpty, IsString } from 'class-validator';
import { Relevance } from '../enums/relevance.enum';

export class TechnologyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  relevance: Relevance;
}
