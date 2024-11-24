import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { RestaurantFeedback } from './entities/feedback.entity';
import { RestaurantFeedbacksService } from './restaurant-feedbacks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, RestaurantFeedback])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, RestaurantFeedbacksService],
  exports: [RestaurantsService, RestaurantFeedbacksService],
})
export class RestaurantsModule {}
