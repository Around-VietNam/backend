import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './entities/dish.entity';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { User } from '../users/entities/user.entity';
import { DishFeedback } from './entities/feedback.entity';
import { DishFeedbacksService } from './dish-feedbacks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Dish, User, DishFeedback])],
  controllers: [DishesController],
  providers: [DishesService, DishFeedbacksService],
  exports: [DishesService, DishFeedbacksService],
})
export class DishesModule {}
