import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/response-users.dto';
import { CreateUsersDto, UpdateUserDto } from './dto/upsert-users.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(public service: UsersService) {}

  @ApiResponse({
    status: 201,
    type: UserResponseDto,
    description: 'Create User',
  })
  @Post()
  async createUser(@Body() dto: CreateUsersDto): Promise<User> {
    return this.service.create(dto);
  }

  @ApiResponse({
    status: 200,
    type: UserResponseDto,
    description: 'Get User Details',
  })
  @Get(':username')
  async getUserDetails(@Param('username') username: string): Promise<User> {
    return this.service.findByUserName(username);
  }

  @ApiResponse({
    status: 200,
    type: UserResponseDto,
    description: 'Update User Info',
  })
  @Put(':username')
  async updateUser(
    @Param('username') username: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.service.updateUser(username, dto);
  }
}
