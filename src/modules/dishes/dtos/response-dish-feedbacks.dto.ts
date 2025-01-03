import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GetManyResponse } from 'src/common/dtos';

export class DishFeedbacksResponseDto {
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
}

export class GetManyDishFeedbacksResponseDto extends GetManyResponse<DishFeedbacksResponseDto> {
  @ApiProperty({ type: DishFeedbacksResponseDto, isArray: true })
  @Type(() => DishFeedbacksResponseDto)
  data: DishFeedbacksResponseDto[];
}
