import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GetManyResponse } from 'src/common/dtos';

export class RestaurantFeedbacksResponseDto {
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

export class GetManyRestaurantFeedbacksResponseDto extends GetManyResponse<RestaurantFeedbacksResponseDto> {
  @ApiProperty({ type: RestaurantFeedbacksResponseDto, isArray: true })
  @Type(() => RestaurantFeedbacksResponseDto)
  data: RestaurantFeedbacksResponseDto[];
}
