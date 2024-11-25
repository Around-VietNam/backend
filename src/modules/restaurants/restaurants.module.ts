import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { RestaurantFeedback } from './entities/feedback.entity';
import { RestaurantFeedbacksService } from './restaurant-feedbacks.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, RestaurantFeedback, User])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, RestaurantFeedbacksService],
  exports: [RestaurantsService, RestaurantFeedbacksService],
})
export class RestaurantsModule {}
