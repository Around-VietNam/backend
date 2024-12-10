import { ApiResponseProperty } from '@nestjs/swagger';

export class DishesResponseDto {
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
  description: string;

  @ApiResponseProperty({ type: String })
  image: string;

  @ApiResponseProperty({ type: Number })
  price: number;

  @ApiResponseProperty({ type: Boolean })
  special: boolean;
}
