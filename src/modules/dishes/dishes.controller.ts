import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
}
