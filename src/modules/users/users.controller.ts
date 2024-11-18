import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/response-users.dto';
import { CreateUsersDto } from './dto/upsert-users.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(public service: UsersService) {}
  @ApiResponse({
    status: 201,
    type: UserResponseDto,
    description: 'User Info',
  })
  @Post()
  async createUser(@Body() dto: CreateUsersDto): Promise<User> {
    return this.service.create(dto);
  }
}
