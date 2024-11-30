import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dtos/response-users.dto';
import { CreateUsersDto, UpdateUserDto } from './dtos/upsert-users.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { GetManyFavoriteRestaurantsResponseDto } from '../restaurants/dtos/response-restaurants.dto';

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

  @ApiResponse({
    status: 200,
    type: GetManyFavoriteRestaurantsResponseDto,
    description: 'Get all favorite restaurants',
  })
  @Get(':username/favorite-restaurants')
  async getFavoriteRestaurants(
    @Param('username') username: string,
  ): Promise<GetManyFavoriteRestaurantsResponseDto> {
    return this.service.getFavoriteRestaurants(username);
  }

  @Post(':username/favorite-restaurants/:restaurantId')
  async addFavoriteRestaurant(
    @Param('username') username: string,
    @Param('restaurantId') restaurantId: number,
  ): Promise<void> {
    return this.service.addFavoriteRestaurant(username, restaurantId);
  }

  @Delete(':username/favorite-restaurants/:restaurantId')
  async removeFavoriteRestaurant(
    @Param('username') username: string,
    @Param('restaurantId') restaurantId: number,
  ): Promise<void> {
    return this.service.removeFavoriteRestaurant(username, restaurantId);
  }
}
