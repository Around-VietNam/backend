import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource from 'src/libs/typeORM.config';
import { UsersModule } from './users/users.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { LandmarksModule } from './landmark/landmarks.module';
import { TrafficModule } from './traffic/traffic.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot(dataSource.options),
    UsersModule,
    RestaurantsModule,
    LandmarksModule,
    TrafficModule,
  ],
})
export class AppModule {}
