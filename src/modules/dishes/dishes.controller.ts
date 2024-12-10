import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DishesService } from './dishes.service';
import { DishesResponseDto } from './dtos/response-dishes.dto';
import { UpsertDishesDto } from './dtos/upsert-dishes.dto';
import { Dish } from './entities/dish.entity';

@ApiTags('Dishes')
@Controller('dishes')
export class DishesController {
  constructor(public dishesService: DishesService) {}

  @ApiResponse({
    status: 201,
    type: DishesResponseDto,
    description: 'Create a new dish',
  })
  @Post()
  async createDish(@Body() dto: UpsertDishesDto): Promise<Dish> {
    return this.dishesService.create(dto);
  }
}
