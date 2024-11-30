import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GetManyResponse } from 'src/common/dtos';

export class LandmarkFeedbacksResponseDto {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  create_at: Date;

  @ApiResponseProperty()
  update_at: Date;

  @ApiResponseProperty()
  username: string;

  @ApiResponseProperty()
  comment: string;

  @ApiResponseProperty()
  image: string;

  @ApiResponseProperty()
  rating: number;
}

export class GetManyLandmarkFeedbacksResponseDto extends GetManyResponse<LandmarkFeedbacksResponseDto> {
  @ApiProperty({ type: LandmarkFeedbacksResponseDto, isArray: true })
  @Type(() => LandmarkFeedbacksResponseDto)
  data: LandmarkFeedbacksResponseDto[];
}
