import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsResponseDto } from './dtos/response-restaurants.dto';
import { UpsertRestaurantsDto } from './dtos/upsert-restaurants.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantFeedbacksService } from './restaurant-feedbacks.service';
import {
  GetManyRestaurantFeedbacksResponseDto,
  RestaurantFeedbacksResponseDto,
} from './dtos/response-restaurant-feedbacks.dto';
import { QueryRestaurantFeedbacksDto } from './dtos/query-restaurant-feedbacks.dto';
import {
  CreateRestaurantFeedBacksDto,
  UpdateRestaurantFeedbacksDto,
} from './dtos/upsert-restaurant-feedbacks.dto';
import { RestaurantFeedback } from './entities/feedback.entity';

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
    @Param('id') id: number,
    @Query() query: QueryRestaurantFeedbacksDto,
  ): Promise<GetManyRestaurantFeedbacksResponseDto> {
    return this.restaurantFeedbackService.getFeedbacksByRestaurantId(id, query);
  }

  @ApiResponse({
    status: 201,
    type: RestaurantFeedbacksResponseDto,
    description: 'Create a new feedback for a restaurant',
  })
  @Post(':id/feedbacks')
  async createFeedback(
    @Param('id') id: number,
    @Body() dto: CreateRestaurantFeedBacksDto,
  ): Promise<RestaurantFeedback> {
    return this.restaurantFeedbackService.createFeedback(id, dto);
  }

  @ApiResponse({
    status: 200,
    type: RestaurantFeedbacksResponseDto,
    description: 'Update feedback for a restaurant',
  })
  @Put('feedbacks/:feedbackId')
  async updateFeedback(
    @Param('feedbackId') feedbackId: number,
    @Body() dto: UpdateRestaurantFeedbacksDto,
  ): Promise<RestaurantFeedback> {
    return this.restaurantFeedbackService.updateFeedback(feedbackId, dto);
  }

  @Delete('feedbacks/:feedbackId')
  async deleteFeedback(@Param('feedbackId') feedbackId: number): Promise<void> {
    return this.restaurantFeedbackService.deleteFeedback(feedbackId);
  }
}
