import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  gender: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ type: Date })
  date_of_birth: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  location: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  avt: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  hash_password: string;
}

export class CreateUsersDto extends UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  username: string;
}

export class UserFeedbackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  user_name: string;

  @IsString()
  @ApiProperty({ type: String })
  restaurantFeedback: string;

  @IsString()
  @ApiProperty({ type: String })
  dishFeedback: string;

  @IsString()
  @ApiProperty({ type: String })
  landmarkFeedback: string;
}
