import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { Dish } from './entities/dish.entity';
import { DishFeedback } from './entities/feedback.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Dish, DishFeedback])],
    controllers: [DishesController],
    providers: [DishesService],
})
export class DishesModule { }
