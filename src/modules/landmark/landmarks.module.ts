import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Landmark } from './entities/landmark.entity';
import { LandmarksController } from './landmarks.controller';
import { LandmarksService } from './landmark.service';

@Module({
  imports: [TypeOrmModule.forFeature([Landmark])],
  controllers: [LandmarksController],
  providers: [LandmarksService],
  exports: [LandmarksService],
})
export class LandmarksModule {}
