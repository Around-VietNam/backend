import { ApiProperty } from '@dataui/crud/lib/crud';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class QueryLandmarkFeedbacksDto {
  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @Type(() => Number)
  offset: number;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @Type(() => Number)
  limit: number;
}
