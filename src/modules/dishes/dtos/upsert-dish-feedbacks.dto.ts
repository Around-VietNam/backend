import { ApiProperty } from '@dataui/crud/lib/crud';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDishFeedbacksDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  comment: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  image: string;
}

export class CreateDishFeedBacksDto extends UpdateDishFeedbacksDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  username: string;
}
