import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource from 'src/libs/typeORM.config'; // Cấu hình TypeORM
import { DishesModule } from './dishes/dishes.module'; // Import DishesModule

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot(dataSource.options), // Kết nối database
    DishesModule, // Đăng ký DishesModule
  ],
})
export class AppModule { }
