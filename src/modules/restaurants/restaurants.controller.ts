import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsResponseDto } from './dto/response-restaurants.dto';
import { UpsertRestaurantsDto } from './dto/upsert-restautrants.dto';
import { Restaurant } from './entities/restaurant.entity';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(public service: RestaurantsService) {}

  @ApiResponse({
    status: 201,
    type: RestaurantsResponseDto,
    description: 'Create a new restaurant',
  })
  @Post()
  async createRestaurant(
    @Body() dto: UpsertRestaurantsDto,
  ): Promise<Restaurant> {
    return this.service.create(dto);
  }

  @ApiResponse({
    status: 200,
    type: RestaurantsResponseDto,
    description: 'Get restaurant details',
  })
  @Get(':id')
  async getRestaurant(@Param('id') id: number): Promise<Restaurant> {
    return this.service.getRestaurantById(id);
  }
}
