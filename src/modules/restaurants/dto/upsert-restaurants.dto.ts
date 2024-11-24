import { ApiProperty } from '@dataui/crud/lib/crud';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpsertRestaurantsDto {
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  address: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  longitude: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  phone?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  website?: string;
}
