import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { FeedbackDto } from './dto/feedback.dto';

@Controller('dishes')
export class DishesController {
    constructor(private readonly dishesService: DishesService) { }

    @Post()
    createDish(@Body() createDishDto: CreateDishDto) {
        return this.dishesService.create(createDishDto);
    }

    @Get(':id')
    getDishById(@Param('id', ParseIntPipe) id: number) {
        return this.dishesService.findById(id);
    }

    @Put(':id')
    updateDish(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDishDto: UpdateDishDto,
    ) {
        return this.dishesService.update(id, updateDishDto);
    }

    @Delete(':id')
    deleteDish(@Param('id', ParseIntPipe) id: number) {
        return this.dishesService.delete(id);
    }

    @Post(':id/feedbacks')
    addFeedback(
        @Param('id', ParseIntPipe) dishId: number,
        @Body() feedbackDto: FeedbackDto,
    ) {
        return this.dishesService.addFeedback(dishId, feedbackDto);
    }

    @Get(':id/feedbacks')
    getFeedbacks(@Param('id', ParseIntPipe) dishId: number) {
        return this.dishesService.getFeedbacks(dishId);
    }

    @Get('includes')
    getRestaurantsWithDish(@Query('dishName') dishName: string) {
        return this.dishesService.getRestaurantsWithDish(dishName);
    }
}
