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
import { DishesService } from './dishes.service';
import { DishesResponseDto } from './dtos/response-dishes.dto';
import { UpsertDishesDto } from './dtos/upsert-dishes.dto';
import { Dish } from './entities/dish.entity';
import {
  DishFeedbacksResponseDto,
  GetManyDishFeedbacksResponseDto,
} from './dtos/response-dish-feedbacks.dto';
import { QueryDishFeedbacksDto } from './dtos/query-dish-feedbacks.dto';
import { DishFeedbacksService } from './dish-feedbacks.service';
import {
  CreateDishFeedBacksDto,
  UpdateDishFeedbacksDto,
} from './dtos/upsert-dish-feedbacks.dto';
import { DishFeedback } from './entities/feedback.entity';

@ApiTags('Dishes')
@Controller('dishes')
export class DishesController {
  constructor(
    public dishesService: DishesService,
    public dishFeedbackService: DishFeedbacksService,
  ) {}

  @ApiResponse({
    status: 201,
    type: DishesResponseDto,
    description: 'Create a new dish',
  })
  @Post()
  async createDish(@Body() dto: UpsertDishesDto): Promise<Dish> {
    return this.dishesService.create(dto);
  }

  @ApiResponse({
    status: 200,
    type: DishesResponseDto,
    description: 'Get dish details',
  })
  @Get(':id')
  async getDish(@Param('id') id: number): Promise<Dish> {
    return this.dishesService.getDishById(id);
  }

  @ApiResponse({
    status: 200,
    type: DishesResponseDto,
    description: 'Update dish details',
  })
  @Post(':id')
  async updateDish(
    @Param('id') id: number,
    @Body() dto: UpsertDishesDto,
  ): Promise<Dish> {
    return this.dishesService.updateDish(id, dto);
  }

  @Delete(':id')
  async deleteDish(@Param('id') id: number): Promise<void> {
    return this.dishesService.deleteDish(id);
  }

  @ApiResponse({
    status: 200,
    type: GetManyDishFeedbacksResponseDto,
    description: 'Get dish feedbacks',
  })
  @Get(':id/feedbacks')
  async getFeedbacksByRestaurantId(
    @Param('id') id: number,
    @Query() query: QueryDishFeedbacksDto,
  ): Promise<GetManyDishFeedbacksResponseDto> {
    return this.dishFeedbackService.getFeedbacksByDishId(id, query);
  }

  @ApiResponse({
    status: 201,
    type: DishFeedbacksResponseDto,
    description: 'Create a new feedback for a dish',
  })
  @Post(':id/feedbacks')
  async createFeedback(
    @Param('id') id: number,
    @Body() dto: CreateDishFeedBacksDto,
  ): Promise<DishFeedback> {
    return this.dishFeedbackService.createFeedback(id, dto);
  }

  @ApiResponse({
    status: 200,
    type: DishFeedbacksResponseDto,
    description: 'Update feedback for a dish',
  })
  @Put('feedbacks/:feedbackId')
  async updateFeedback(
    @Param('feedbackId') feedbackId: number,
    @Body() dto: UpdateDishFeedbacksDto,
  ): Promise<DishFeedback> {
    return this.dishFeedbackService.updateFeedback(feedbackId, dto);
  }

  @Delete('feedbacks/:feedbackId')
  async deleteFeedback(@Param('feedbackId') feedbackId: number): Promise<void> {
    return this.dishFeedbackService.deleteFeedback(feedbackId);
  }
}
