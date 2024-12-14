import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class DishesResponseDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: Date })
  created_at: Date;

  @ApiResponseProperty({ type: Date })
  updated_at: Date;

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

export class GetManyDishesResponseDto {
  @ApiProperty({ type: DishesResponseDto, isArray: true })
  @Type(() => DishesResponseDto)
  data: DishesResponseDto[];
}

export class FavoriteDishesResponseDto {
  @ApiResponseProperty({ type: Number })
  id: number;

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

export class GetManyFavoriteDishesResponseDto {
  @ApiProperty({ type: FavoriteDishesResponseDto, isArray: true })
  @Type(() => FavoriteDishesResponseDto)
  data: FavoriteDishesResponseDto[];
}
