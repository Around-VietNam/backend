import { ApiProperty } from '@dataui/crud/lib/crud';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRestaurantFeedbacksDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  comment: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  image: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  rating: number;
}

export class CreateRestaurantFeedBacksDto extends UpdateRestaurantFeedbacksDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  username: string;
}
