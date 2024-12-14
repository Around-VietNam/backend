import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { Landmark } from '../landmark/entities/landmark.entity';
import { Dish } from '../dishes/entities/dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Restaurant, Landmark, Dish])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
