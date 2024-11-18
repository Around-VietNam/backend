import { ApiResponseProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: Date })
  created_at: Date;

  @ApiResponseProperty({ type: Date })
  updated_at: Date;

  @ApiResponseProperty({ type: Date })
  deleted_at: Date;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  user_name: string;

  @ApiResponseProperty({ type: String })
  email: string;

  @ApiResponseProperty({ type: String })
  gender: string;

  @ApiResponseProperty({ type: Date })
  date_of_birth: Date;

  @ApiResponseProperty({ type: String })
  location: string;

  @ApiResponseProperty({ type: String })
  avt: string;

  @ApiResponseProperty({ type: String })
  favorite_restaurants: string;

  @ApiResponseProperty({ type: String })
  favorite_dishes: string;

  @ApiResponseProperty({ type: String })
  favorite_landmarks: string;
}
