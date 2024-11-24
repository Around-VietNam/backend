import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsResponseDto } from './dto/response-restaurants.dto';
import { UpsertRestaurantsDto } from './dto/upsert-restaurants.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantFeedbacksService } from './restaurant-feedbacks.service';
import { GetManyRestaurantFeedbacksResponseDto } from './dto/response-restaurant-feedbacks.dto';
import { QueryRestaurantFeedbacksDto } from './dto/query-restaurant-feedbacks.dto';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(
    public restaurantService: RestaurantsService,
    public restaurantFeedbackService: RestaurantFeedbacksService,
  ) {}

  @ApiResponse({
    status: 201,
    type: RestaurantsResponseDto,
    description: 'Create a new restaurant',
  })
  @Post()
  async createRestaurant(
    @Body() dto: UpsertRestaurantsDto,
  ): Promise<Restaurant> {
    return this.restaurantService.create(dto);
  }

  @ApiResponse({
    status: 200,
    type: RestaurantsResponseDto,
    description: 'Get restaurant details',
  })
  @Get(':id')
  async getRestaurant(@Param('id') id: number): Promise<Restaurant> {
    return this.restaurantService.getRestaurantById(id);
  }

  @ApiResponse({
    status: 200,
    type: RestaurantsResponseDto,
    description: 'Update restaurant details',
  })
  @Post(':id')
  async updateRestaurant(
    @Param('id') id: number,
    @Body() dto: UpsertRestaurantsDto,
  ): Promise<Restaurant> {
    return this.restaurantService.updateRestaurant(id, dto);
  }

  @Delete(':id')
  async deleteRestaurant(@Param('id') id: number): Promise<void> {
    return this.restaurantService.deleteRestaurant(id);
  }

  @ApiResponse({
    status: 200,
    type: GetManyRestaurantFeedbacksResponseDto,
    description: 'Get restaurant feedbacks',
  })
  @Get(':id/feedbacks')
  async getFeedbacksByRestaurantId(
    @Query() query: QueryRestaurantFeedbacksDto,
  ): Promise<GetManyRestaurantFeedbacksResponseDto> {
    return this.restaurantFeedbackService.getFeedbacksByRestaurantId(query);
  }
}
