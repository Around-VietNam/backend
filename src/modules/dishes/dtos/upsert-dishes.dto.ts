import { ApiProperty } from '@dataui/crud/lib/crud';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpsertDishesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  image: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  price: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ type: Boolean })
  special: boolean;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  restaurantId: number;
}
